# Estados y transiciones de `ProductVariant`

Este documento define las reglas de negocio para el ciclo de vida, comercialización, inventario, reservas y publicación por canales de una variante de producto.

La arquitectura separa estos conceptos:

* `recordStatus`: ciclo de vida administrativo del registro.
* `saleStatus`: estado comercial de la variante.
* `inventoryPolicy`: política mediante la cual se administra el inventario.
* `inventoryStatus`: situación operativa/disponibilidad del inventario.
* `ReservationStatus`: ciclo de vida de una reserva.
* `publicationStatus`: publicación de la variante en cada canal.

---

# 1. Estado del registro — `recordStatus`

Controla el ciclo de vida administrativo de la variante.
text
DRAFT
  │
  ├──→ ACTIVE
  │      │
  │      └──→ INACTIVE
  │               │
  │               └──→ ACTIVE
  │
  └──→ ARCHIVED

ACTIVE ───→ ARCHIVED
INACTIVE ─→ ARCHIVED

ARCHIVED ──→ DELETED

DELETED
  └──→ X

## 1.1. Transiciones

| Estado actual | Estados permitidos     |
| ------------- | ---------------------- |
| `DRAFT`       | `ACTIVE`, `ARCHIVED`   |
| `ACTIVE`      | `INACTIVE`, `ARCHIVED` |
| `INACTIVE`    | `ACTIVE`, `ARCHIVED`   |
| `ARCHIVED`    | `DELETED`              |
| `DELETED`     | Ninguno                |

`DELETED` es un estado terminal cuando se utiliza eliminación lógica.

Una eventual restauración debe realizarse mediante una operación administrativa explícita y no como una transición normal.

---

# 2. Estado comercial — `saleStatus`

`SaleStatus` representa la situación comercial de la variante y permite al frontend determinar cómo debe presentarse comercialmente al cliente.

Estados:

COMING_SOON
AVAILABLE
MADE_TO_ORDER
DISCONTINUED

Flujo:

COMING_SOON
     │
     ▼
 AVAILABLE
     │
     ├──→ DISCONTINUED
     │
     └──→ MADE_TO_ORDER
              │
              └──→ AVAILABLE

## 2.1. Significado

### `COMING_SOON`

La variante está registrada y puede estar publicada, pero todavía no se encuentra disponible para comercialización normal.

### `AVAILABLE`

La variante se encuentra comercialmente disponible.

Puede coexistir con:

inventoryStatus = OUT_OF_STOCK

cuando la política es `AUTO_DECREMENT`.

Esto significa que la variante continúa siendo comercialmente válida, pero actualmente no tiene unidades disponibles para una compra inmediata.

### `MADE_TO_ORDER`

La variante se comercializa bajo pedido.

Debe utilizarse conjuntamente con:

inventoryPolicy = ON_DEMAND

### `DISCONTINUED`

La variante ha sido descontinuada comercialmente.

No representa falta de stock. Es una decisión comercial.

`DISCONTINUED` debe considerarse terminal dentro del flujo comercial normal.

---

# 3. Política de inventario — `inventoryPolicy`

`InventoryPolicy` no representa un estado. Representa la configuración mediante la cual se administra el inventario.

AUTO_DECREMENT
UNLIMITED
ON_DEMAND

## 3.1. `AUTO_DECREMENT`

La variante utiliza una cantidad finita de inventario.

stockQuantity > 0
        ↓
IN_STOCK

Cuando la cantidad disponible llega a cero:

stockQuantity = 0
        ↓
OUT_OF_STOCK

Las ventas confirmadas reducen automáticamente la cantidad disponible.

Los campos `stockQuantity` y `minStock` son aplicables.

El `inventoryStatus` cambia automáticamente según la situación del inventario.

---

## 3.2. `UNLIMITED`

La variante no utiliza una cantidad finita de stock para determinar su disponibilidad.

La política establece que el inventario no se agota como consecuencia de las ventas.

Por esta razón:

inventoryPolicy = UNLIMITED
inventoryStatus = IN_STOCK

El estado `IN_STOCK` se mantiene de forma fija mientras la política sea `UNLIMITED`.

En este contexto, `IN_STOCK` no significa que exista una cantidad física determinada de unidades.

Significa:

> La disponibilidad de la variante no está limitada por un inventario finito.

Por tanto, `stockQuantity` puede mantenerse en `0` como valor técnico sin que esto implique `OUT_OF_STOCK`.

No se deben realizar transiciones automáticas de:

IN_STOCK → OUT_OF_STOCK

mientras `inventoryPolicy = UNLIMITED`.

---

## 3.3. `ON_DEMAND`

La variante se atiende bajo pedido.

inventoryPolicy = ON_DEMAND
inventoryStatus = IN_STOCK

El estado `IN_STOCK` se mantiene de forma fija mientras la política sea `ON_DEMAND`.

En este contexto, `IN_STOCK` significa:

> La disponibilidad de la variante no depende de una cantidad física inmediata de inventario.

No significa que existan unidades almacenadas.

La venta se realiza bajo pedido y puede requerir fabricación, adquisición, preparación o gestión específica después de recibir la orden.

Regla principal:

inventoryPolicy = ON_DEMAND
        ⇅
saleStatus = MADE_TO_ORDER

---

# 4. Estado de inventario — `inventoryStatus`

`InventoryStatus` representa la situación de disponibilidad del inventario.

Estados:

IN_STOCK
OUT_OF_STOCK
PENDING_RESTOCK
IN_TRANSIT

No se utiliza `RESERVED` como estado global de la variante.

Las reservas se administran mediante `InventoryReservation`.

---

## 4.1. Cuando `inventoryPolicy = AUTO_DECREMENT`

El estado puede cambiar automáticamente:

IN_STOCK
   │
   ├──→ OUT_OF_STOCK
   ├──→ PENDING_RESTOCK
   └──→ IN_TRANSIT

OUT_OF_STOCK
   │
   ├──→ IN_STOCK
   ├──→ PENDING_RESTOCK
   └──→ IN_TRANSIT

PENDING_RESTOCK
   │
   ├──→ IN_TRANSIT
   ├──→ IN_STOCK
   └──→ OUT_OF_STOCK

IN_TRANSIT
   │
   ├──→ IN_STOCK
   └──→ OUT_OF_STOCK

Ejemplo:

stockQuantity > 0
        ↓
IN_STOCK

stockQuantity = 0
        ↓
OUT_OF_STOCK

---

## 4.2. Cuando `inventoryPolicy = UNLIMITED`

El estado es fijo:

inventoryPolicy = UNLIMITED
inventoryStatus = IN_STOCK

No se realizan transiciones por disminución de stock.

---

## 4.3. Cuando `inventoryPolicy = ON_DEMAND`

El estado es fijo:

inventoryPolicy = ON_DEMAND
inventoryStatus = IN_STOCK

No se realizan transiciones por cantidad física de stock.

---

# 5. Regla de coherencia entre `inventoryPolicy` e `inventoryStatus`

La combinación válida es:

| `inventoryPolicy` | `inventoryStatus`                                           |
| ----------------- | ----------------------------------------------------------- |
| `AUTO_DECREMENT`  | `IN_STOCK`, `OUT_OF_STOCK`, `PENDING_RESTOCK`, `IN_TRANSIT` |
| `UNLIMITED`       | **`IN_STOCK` fijo**                                         |
| `ON_DEMAND`       | **`IN_STOCK` fijo**                                         |

Por lo tanto:

UNLIMITED + OUT_OF_STOCK

no es una combinación válida.

Tampoco:

ON_DEMAND + OUT_OF_STOCK

si `IN_STOCK` se ha definido como el estado fijo para la política `ON_DEMAND`.

La interpretación de `IN_STOCK` depende de la política:

AUTO_DECREMENT + IN_STOCK
    ↓
Hay inventario físico disponible.

UNLIMITED + IN_STOCK
    ↓
La disponibilidad no está limitada por stock finito.

ON_DEMAND + IN_STOCK
    ↓
La disponibilidad se gestiona bajo pedido.

---

# 6. Reservas — `ReservationStatus`

Las reservas representan cantidades temporalmente apartadas para una operación determinada.

Una variante puede tener múltiples reservas:

ProductVariant 1 ─── N InventoryReservation

Estados:

ACTIVE
  │
  ├──→ CONSUMED
  ├──→ RELEASED
  └──→ EXPIRED

## 6.1. `ACTIVE`

La cantidad permanece reservada y no puede utilizarse libremente para otra operación.

## 6.2. `CONSUMED`

La operación asociada a la reserva se confirma y la cantidad reservada se consume.

ACTIVE
   ↓
orden/pago confirmado
   ↓
CONSUMED

## 6.3. `RELEASED`

La reserva se libera antes de ser consumida.

Ejemplos:

* cancelación de la orden;
* cancelación de la operación;
* liberación administrativa.

## 6.4. `EXPIRED`

La reserva alcanza `expiresAt` sin ser consumida.

ACTIVE
   ↓
expiresAt alcanzado
   ↓
EXPIRED

`CONSUMED`, `RELEASED` y `EXPIRED` son estados terminales.

---

# 7. Relación entre stock y reservas

Las reservas no deben convertirse en:

inventoryStatus = RESERVED

Una variante puede tener:

stockQuantity = 10

y simultáneamente:

Reserva A = 2
Reserva B = 3
Reserva C = 1

Por lo tanto:

reservedQuantity = 6
availableQuantity = 10 - 6 = 4

Conceptualmente:

availableQuantity =
    stockQuantity
    -
    cantidad de reservas ACTIVE

El detalle de cada reserva pertenece a `InventoryReservation`.

No es necesario almacenar `availableQuantity` como dato independiente si puede calcularse de forma segura.

Las reservas afectan a la disponibilidad efectiva de una variante con:

inventoryPolicy = AUTO_DECREMENT

No se utilizan para limitar una variante:

UNLIMITED

ni:

ON_DEMAND

---

# 8. Estado de publicación por canal — `publicationStatus`

La publicación pertenece a la variante y se administra independientemente para cada canal.

Ejemplo:

Variant
   │
   ├── STOREFRONT      → ACTIVE
   ├── MARKETPLACE     → DRAFT
   ├── WHOLESALE       → INACTIVE
   └── PHYSICAL_STORE  → ACTIVE

Estados:

DRAFT
ACTIVE
INACTIVE

## 8.1. Transiciones

DRAFT
  │
  ▼
ACTIVE
  │
  ▼
INACTIVE
  │
  └──→ ACTIVE

También puede permitirse:

DRAFT → INACTIVE

si la configuración de un canal se desactiva antes de publicarse.

---

# 9. Creación de una variante

## 9.1. `AUTO_DECREMENT`

inventoryPolicy = AUTO_DECREMENT

saleStatus =
    COMING_SOON
    AVAILABLE
    DISCONTINUED

El sistema determina automáticamente:

stockQuantity > 0 → IN_STOCK
stockQuantity = 0 → OUT_OF_STOCK

`inventoryStatus` = IN_STOCK | OUT_OF_STOCK

El usuario no selecciona manualmente `inventoryStatus`.

---

## 9.2. `UNLIMITED`

inventoryPolicy = UNLIMITED

saleStatus =
    COMING_SOON
    AVAILABLE
    DISCONTINUED

inventoryStatus = IN_STOCK

`inventoryStatus` permanece fijo en `IN_STOCK`.

---

## 9.3. `ON_DEMAND`

inventoryPolicy = ON_DEMAND

saleStatus =
    COMING_SOON
    MADE_TO_ORDER
    DISCONTINUED

inventoryStatus = IN_STOCK

---

# 10. Actualización de una variante

El cambio de `inventoryPolicy` puede requerir la actualización o validación de otros campos.

## 10.1. `AUTO_DECREMENT → UNLIMITED`

inventoryPolicy = UNLIMITED
inventoryStatus = IN_STOCK

Se deja de utilizar el stock finito como mecanismo de disponibilidad.

---

## 10.2. `AUTO_DECREMENT → ON_DEMAND`

inventoryPolicy = ON_DEMAND
inventoryStatus = IN_STOCK
saleStatus = MADE_TO_ORDER

---

## 10.3. `UNLIMITED → AUTO_DECREMENT`

Debe establecerse una cantidad finita de stock:

inventoryPolicy = AUTO_DECREMENT
stockQuantity = N

El sistema determina:

N > 0 → IN_STOCK
N = 0 → OUT_OF_STOCK

---

## 10.4. `ON_DEMAND → AUTO_DECREMENT`

Debe establecerse una cantidad finita de stock:

inventoryPolicy = AUTO_DECREMENT
stockQuantity = N

Y el estado comercial debe cambiar a uno compatible, normalmente:

saleStatus = AVAILABLE

---

## 10.5. `ON_DEMAND → UNLIMITED`

La variante deja de gestionarse bajo pedido y pasa a disponibilidad ilimitada:

inventoryPolicy = UNLIMITED
inventoryStatus = IN_STOCK
saleStatus = AVAILABLE

---

# 11. Condiciones para la publicación

Para que una variante esté publicada en un canal:

recordStatus = ACTIVE

AND

VariantChannel.publicationStatus = ACTIVE

Esto determina que la variante está publicada.

No significa por sí solo que pueda realizarse una compra.

---

# 12. Condiciones para la compra

La posibilidad de compra depende de la política de inventario y del estado comercial.

## 12.1. `AUTO_DECREMENT`

recordStatus = ACTIVE
AND
saleStatus = AVAILABLE
AND
inventoryPolicy = AUTO_DECREMENT
AND
inventoryStatus = IN_STOCK

La variante puede comprarse mientras exista disponibilidad efectiva.

Si:

inventoryStatus = OUT_OF_STOCK

la variante puede permanecer publicada, pero no puede comprarse inmediatamente.

---

## 12.2. `UNLIMITED`

recordStatus = ACTIVE
AND
saleStatus = AVAILABLE
AND
inventoryPolicy = UNLIMITED
AND
inventoryStatus = IN_STOCK

La variante puede comprarse porque su disponibilidad no depende de una cantidad finita.

---

## 12.3. `ON_DEMAND`

recordStatus = ACTIVE
AND
saleStatus = MADE_TO_ORDER
AND
inventoryPolicy = ON_DEMAND
AND
inventoryStatus = IN_STOCK

La variante puede comprarse bajo pedido.

No requiere una cantidad física disponible.

---

# 13. Ejemplos de configuraciones válidas

## 13.1. Producto normal con stock

recordStatus      = ACTIVE
saleStatus        = AVAILABLE
inventoryPolicy   = AUTO_DECREMENT
inventoryStatus   = IN_STOCK

Resultado:

Publicado
Disponible
Puede comprarse

---

## 13.2. Producto normal sin stock

recordStatus      = ACTIVE
saleStatus        = AVAILABLE
inventoryPolicy   = AUTO_DECREMENT
inventoryStatus   = OUT_OF_STOCK

Resultado:

Publicado
Sin stock
No puede comprarse inmediatamente

---

## 13.3. Producto con stock ilimitado

recordStatus      = ACTIVE
saleStatus        = AVAILABLE
inventoryPolicy   = UNLIMITED
inventoryStatus   = IN_STOCK

Resultado:

Publicado
Disponible
No depende de una cantidad finita de stock

---

## 13.4. Producto bajo pedido

recordStatus      = ACTIVE
saleStatus        = MADE_TO_ORDER
inventoryPolicy   = ON_DEMAND
inventoryStatus   = IN_STOCK

Resultado:

Publicado
Disponible bajo pedido
No depende de stock físico inmediato

---

## 13.5. Producto próximamente

recordStatus      = ACTIVE
saleStatus        = COMING_SOON

Resultado:

Publicado
Próximamente
No disponible para compra normal

---

## 13.6. Producto descontinuado

recordStatus      = ACTIVE
saleStatus        = DISCONTINUED

Resultado:

Registro activo
Producto descontinuado
No disponible para nuevas ventas

---

# 14. Principio general

Cada campo responde una pregunta diferente:

recordStatus
    ↓
¿El registro está activo administrativamente?

saleStatus
    ↓
¿En qué situación comercial se encuentra?

inventoryPolicy
    ↓
¿Cómo se administra su inventario?

inventoryStatus
    ↓
¿Cuál es su situación de disponibilidad de inventario?

InventoryReservation
    ↓
¿Qué cantidades están temporalmente reservadas?

publicationStatus
    ↓
¿Está publicada esta variante en este canal?

No se debe utilizar un estado para representar la responsabilidad de otro.

Por ejemplo:

OUT_OF_STOCK

no significa:

DISCONTINUED

y:

RESERVED

no debe utilizarse como estado global de una variante.

Asimismo, `IN_STOCK` no siempre significa que existan unidades físicas almacenadas:

AUTO_DECREMENT + IN_STOCK
    ↓
Existe inventario físico disponible.

UNLIMITED + IN_STOCK
    ↓
La disponibilidad no está limitada por stock finito.

ON_DEMAND + IN_STOCK
    ↓
La disponibilidad se gestiona bajo pedido.

La interpretación de `inventoryStatus` depende de `inventoryPolicy`, pero la combinación válida para `UNLIMITED` y `ON_DEMAND` permanece siempre:

inventoryStatus = IN_STOCK
