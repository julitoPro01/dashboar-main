# Gestión de estados de venta e inventario

Esta documentación define el comportamiento de los estados asociados a una `ProductVariant`.

La variante maneja tres conceptos independientes:

* `inventoryPolicy`: define **cómo se gestiona el inventario**.
* `inventoryStatus`: representa **la situación actual del inventario**.
* `saleStatus`: representa **la situación comercial de la variante**.

---

## 1. Modelo conceptual

```text
ProductVariant
│
├── inventoryPolicy
│   └── ¿Cómo se administra el inventario?
│
├── stockQuantity
│   └── ¿Cuántas unidades están disponibles?
│
├── minStock
│   └── ¿Cuál es el nivel mínimo de stock?
│
├── inventoryStatus
│   └── ¿Cuál es la situación actual del inventario?
│
└── saleStatus
    └── ¿Cuál es la situación comercial de la variante?
```

Estos conceptos no deben utilizarse como sinónimos.

---

# 2. Inventory Policy

`inventoryPolicy` define el régimen mediante el cual se administra el inventario de la variante.

```prisma
enum InventoryPolicy {
  AUTO_DECREMENT
  UNLIMITED
  ON_DEMAND
}
```

### AUTO_DECREMENT

**Descontar automáticamente**

La variante utiliza una cantidad de stock finita.

Cada venta confirmada debe disminuir automáticamente `stockQuantity`.

Ejemplo:

```text
inventoryPolicy = AUTO_DECREMENT
stockQuantity = 25
```

Después de vender 2 unidades:

```text
stockQuantity = 23
```

Cuando esta política está seleccionada, el formulario permite configurar:

* `stockQuantity`
* `minStock`

---

### UNLIMITED

**Stock ilimitado**

La variante no depende de una cantidad finita de unidades disponibles.

```text
inventoryPolicy = UNLIMITED
```

En este régimen, `stockQuantity` no representa una cantidad que deba controlar la disponibilidad comercial.

El valor almacenado puede mantenerse en `0` por consistencia del modelo, pero la aplicación no debe interpretarlo como "sin stock".

Los campos relacionados con stock finito no deben ser relevantes para el usuario.

---

### ON_DEMAND

**Bajo pedido directo**

La variante puede comercializarse sin depender de una cantidad disponible almacenada.

La solicitud de compra puede iniciar posteriormente un proceso de fabricación, adquisición, preparación o abastecimiento.

```text
inventoryPolicy = ON_DEMAND
```

Al igual que `UNLIMITED`, `stockQuantity` puede mantenerse en `0` sin significar necesariamente que la variante no pueda venderse.

---

# 3. Inventory Status

`inventoryStatus` representa la situación operativa actual del inventario.

```prisma
enum InventoryStatusType {
  IN_STOCK
  OUT_OF_STOCK
  PENDING_RESTOCK
  IN_TRANSIT
  RESERVED
}
```

### IN_STOCK

La variante dispone de unidades disponibles para el inventario controlado.

Ejemplo:

```text
stockQuantity = 25
inventoryStatus = IN_STOCK
```

---

### OUT_OF_STOCK

Actualmente no existen unidades disponibles.

```text
stockQuantity = 0
inventoryStatus = OUT_OF_STOCK
```

Este estado es especialmente relevante cuando:

```text
inventoryPolicy = AUTO_DECREMENT
```

---

### PENDING_RESTOCK

La variante no dispone actualmente de unidades suficientes, pero existe un proceso de reposición pendiente.

Ejemplo:

```text
stockQuantity = 0
inventoryStatus = PENDING_RESTOCK
```

La existencia de este estado permite diferenciar:

```text
OUT_OF_STOCK
```

de:

```text
PENDING_RESTOCK
```

---

### IN_TRANSIT

Existe inventario que está siendo trasladado y todavía no se encuentra disponible en el punto de inventario correspondiente.

Por ejemplo:

```text
stockQuantity = 0
inventoryStatus = IN_TRANSIT
```

Puede existir mercancía en tránsito sin que esas unidades estén disponibles para venta.

---

### RESERVED

Una parte o totalidad del inventario se encuentra reservada para operaciones existentes.

La reserva no debe interpretarse automáticamente como inventario disponible.

El comportamiento exacto dependerá posteriormente del sistema de pedidos y reservas.

---

# 4. Sale Status

`SaleStatus` representa la situación comercial de la variante.

```prisma
enum SaleStatusType {
  AVAILABLE
  COMING_SOON
  DISCONTINUED
  MADE_TO_ORDER
}
```

### AVAILABLE

La variante está habilitada comercialmente para la venta, siempre que las demás condiciones necesarias para el canal se cumplan.

---

### COMING_SOON

La variante existe en el catálogo, pero todavía no está disponible para venta normal.

Puede utilizarse para productos que serán comercializados posteriormente.

---

### DISCONTINUED

La variante ha sido descontinuada y no debe continuar comercializándose como una variante activa.

Este estado no debe confundirse con `OUT_OF_STOCK`.

```text
OUT_OF_STOCK
→ actualmente no hay unidades.

DISCONTINUED
→ la variante dejó de comercializarse.
```

---

### MADE_TO_ORDER

La variante se comercializa bajo pedido.

La preparación, fabricación o adquisición se realiza como consecuencia del pedido del cliente.

Este estado tiene relación conceptual con:

```text
inventoryPolicy = ON_DEMAND
```

pero no debe asumirse automáticamente que ambos valores son siempre equivalentes.

---

# 5. Diferencia entre los tres conceptos

| Campo             | Pregunta que responde                           |
| ----------------- | ----------------------------------------------- |
| `inventoryPolicy` | ¿Cómo se administra el inventario?              |
| `inventoryStatus` | ¿Cuál es la situación actual del inventario?    |
| `saleStatus`      | ¿Cuál es la situación comercial de la variante? |

Ejemplo:

```text
inventoryPolicy: AUTO_DECREMENT
inventoryStatus: IN_STOCK
stockQuantity: 25
saleStatus: AVAILABLE
```

Significa:

> La variante controla un stock finito, actualmente dispone de 25 unidades y está disponible para venta.

---

# 6. Ejemplos de combinaciones

## Variante disponible con stock

```text
inventoryPolicy: AUTO_DECREMENT
inventoryStatus: IN_STOCK
stockQuantity: 25
saleStatus: AVAILABLE
```

---

## Variante agotada

```text
inventoryPolicy: AUTO_DECREMENT
inventoryStatus: OUT_OF_STOCK
stockQuantity: 0
saleStatus: AVAILABLE
```

La variante continúa siendo comercialmente válida, pero actualmente no tiene unidades disponibles.

---

## Variante esperando reposición

```text
inventoryPolicy: AUTO_DECREMENT
inventoryStatus: PENDING_RESTOCK
stockQuantity: 0
saleStatus: AVAILABLE
```

---

## Variante próxima a comercializarse

```text
inventoryPolicy: AUTO_DECREMENT
inventoryStatus: IN_STOCK
stockQuantity: 20
saleStatus: COMING_SOON
```

Aunque exista inventario, todavía no está disponible comercialmente.

---

## Variante bajo pedido

```text
inventoryPolicy: ON_DEMAND
inventoryStatus: OUT_OF_STOCK
stockQuantity: 0
saleStatus: MADE_TO_ORDER
```

El `0` almacenado no significa necesariamente que la variante no pueda venderse, porque su política permite trabajar bajo pedido.

---

# 7. Stock obligatorio en el modelo

`stockQuantity` se mantiene como un campo obligatorio.

```prisma
stockQuantity Int @default(0)
```

No se utiliza `NULL` para representar que una variante no controla stock.

La interpretación del valor depende de `inventoryPolicy`.

```text
AUTO_DECREMENT
→ stockQuantity representa el stock controlado.

UNLIMITED
→ stockQuantity no determina la disponibilidad comercial.

ON_DEMAND
→ stockQuantity no determina la posibilidad de solicitar la variante.
```

Esto evita utilizar `NULL` para representar diferentes significados y mantiene un modelo de datos más simple.

---

# 8. Reglas del formulario

Cuando el usuario selecciona:

### Descontar automáticamente

Mostrar:

```text
Cantidad disponible
Stock mínimo
```

y permitir su edición.

### Stock ilimitado

No es necesario solicitar al usuario:

```text
Cantidad disponible
Stock mínimo
```

### Bajo pedido directo

No es necesario solicitar al usuario:

```text
Cantidad disponible
Stock mínimo
```

El valor persistido de `stockQuantity` puede mantenerse en `0`.

---

# 9. Responsabilidades

La aplicación debe evitar que un estado sustituya a otro.

```text
inventoryPolicy
→ configuración del comportamiento del inventario

inventoryStatus
→ estado operativo del inventario

saleStatus
→ estado comercial de la variante
```

Por ejemplo, no se debe utilizar:

```text
inventoryStatus = OUT_OF_STOCK
```

para indicar que una variante fue descontinuada.

Debe utilizarse:

```text
saleStatus = DISCONTINUED
```

De la misma forma, no se debe utilizar:

```text
saleStatus = DISCONTINUED
```

para representar temporalmente que no existe stock.

---

# 10. Relación con los canales de comercialización

Los estados anteriores pertenecen a la variante.

La disponibilidad/publicación específica de cada canal debe manejarse independientemente mediante la configuración del canal.

```text
ProductVariant
│
├── inventoryPolicy
├── inventoryStatus
├── saleStatus
│
└── distributionChannels
    ├── storefront
    ├── marketplace
    ├── physicalStore
    └── wholesale
```

El estado de publicación de un canal no debe reemplazar `saleStatus`.

Por ejemplo, una variante puede tener:

```text
saleStatus = AVAILABLE
```

pero estar:

```text
storefront.publicationStatus = ACTIVE
marketplace.publicationStatus = DRAFT
```

Esto significa que la variante está comercialmente disponible, pero su publicación todavía no está activa en todos los canales.

---

# 11. Principio general

Los estados deben responder preguntas diferentes y no duplicar responsabilidades:

```text
Inventory Policy
    ↓
¿Cómo funciona el inventario?

Inventory Status
    ↓
¿Qué está ocurriendo actualmente con el inventario?

Sale Status
    ↓
¿Qué está ocurriendo comercialmente con la variante?

Publication Status
    ↓
¿Está publicada en este canal?
```

Mantener esta separación permite que cada estado evolucione independientemente y evita crear un único campo con demasiadas responsabilidades.
