# Proceso de publicación de productos y variantes

## Objetivo

Definir el flujo mediante el cual un producto pasa desde su creación inicial hasta estar disponible para publicación y comercialización.

El producto base y sus variantes tienen responsabilidades diferentes:

* El **producto base** representa la entidad comercial general.
* La **variante** representa una configuración concreta y comercializable del producto.
* Un producto no puede habilitar sus opciones de publicación hasta contar con **al menos una variante activa**.

---

# 1. Flujo general

```text
Crear producto
      │
      ▼
Producto DRAFT
      │
      ▼
Crear al menos una variante
      │
      ▼
Activar una variante
      │
      ▼
Existe ≥ 1 variante ACTIVE
      │
      ▼
Habilitar configuración del producto
      │
      ├── Estado del producto
      ├── Estado de venta
      ├── Canales de venta
      └── Fecha de disponibilidad
      │
      ▼
Publicar producto
      │
      ▼
Producto ACTIVE / publicado
```

---

# 2. Etapa 1 — Crear producto

Al crear un producto, este debe comenzar siempre como:

```text
recordStatus = DRAFT
```

Valores iniciales recomendados:

```ts
{
  recordStatus: "DRAFT",
  saleStatus: "COMING_SOON",
  inventoryStatus: "OUT_OF_STOCK"
}
```

En esta etapa el producto existe únicamente en el back-office.

### El producto en DRAFT puede:

* Completar información básica.
* Seleccionar categoría.
* Agregar imágenes.
* Configurar propiedades.
* Seleccionar proveedor.
* Crear variantes.

### El producto en DRAFT no puede:

* Publicarse.
* Considerarse comercialmente activo.
* Habilitar completamente la configuración de publicación.
* Aparecer como producto disponible para clientes.

---

# 3. Etapa 2 — Crear variantes

El producto debe tener al menos una variante para poder avanzar hacia la publicación.

Ejemplo:

```text
Producto
└── Camiseta básica

    Variantes
    ├── Rojo / S
    ├── Rojo / M
    └── Azul / M
```

Inicialmente las variantes también pueden encontrarse en estado:

```text
DRAFT
```

Por ejemplo:

```text
Producto: DRAFT

Variantes:
├── Rojo / S → DRAFT
├── Rojo / M → DRAFT
└── Azul / M → DRAFT
```

Mientras ninguna variante esté activa, el producto no está listo para publicación.

---

# 4. Etapa 3 — Activar una variante

Para que el producto pueda avanzar, debe existir como mínimo una variante con:

```text
recordStatus = ACTIVE
```

La condición es:

```ts
const hasActiveVariant = product.variants.some(
  variant => variant.recordStatus === "ACTIVE"
);
```

Ejemplo:

```text
Producto: DRAFT

Variantes:
├── Rojo / S → ACTIVE  ✓
├── Rojo / M → DRAFT
└── Azul / M → DRAFT
```

Ahora:

```text
hasActiveVariant = true
```

El producto puede habilitar las opciones de configuración de publicación.

---

# 5. Regla principal de activación

Un producto no puede pasar a un estado operativo si no tiene al menos una variante activa.

```ts
canActivateProduct =
  hasActiveVariant;
```

Por lo tanto:

```text
0 variantes activas
        ↓
No puede activarse
```

y:

```text
1 o más variantes activas
        ↓
Puede configurarse y activarse
```

---

# 6. Configuración del producto

Una vez que existe al menos una variante activa, se habilita la administración del producto base.

Esta configuración incluye:

### Estado del registro

Controla el ciclo de vida administrativo:

```text
DRAFT
ACTIVE
INACTIVE
ARCHIVED
DELETED
```

### Estado de venta

Controla la situación comercial:

```text
AVAILABLE
COMING_SOON
DISCONTINUED
MADE_TO_ORDER
```

### Estado de inventario

Controla la situación del inventario:

```text
IN_STOCK
OUT_OF_STOCK
PENDING_RESTOCK
IN_TRANSIT
RESERVED
```

### Canales de venta

Determinan dónde puede comercializarse el producto.

Ejemplo:

```text
☑ Tienda web
☑ Aplicación móvil
☐ Punto de venta
```

### Fecha de disponibilidad

Permite establecer cuándo el producto estará disponible para publicación/comercialización.

---

# 7. Estados independientes

Los estados no deben combinarse en un único campo `productStatus`.

El producto tiene diferentes dimensiones:

```text
Producto
│
├── RecordStatus
│     └── ciclo de vida administrativo
│
├── SaleStatus
│     └── situación comercial
│
├── InventoryStatus
│     └── situación del inventario
│
└── ProductTag[]
      └── etiquetas comerciales
```

Por ejemplo, es válido tener:

```text
RecordStatus:    ACTIVE
SaleStatus:      AVAILABLE
InventoryStatus: OUT_OF_STOCK
```

Esto significa:

> El producto está activo en el sistema, está configurado para venderse, pero actualmente no tiene inventario disponible.

---

# 8. Producto activo y variantes

Activar el producto no significa activar todas sus variantes.

Ejemplo válido:

```text
Producto: ACTIVE

Variantes:
├── Rojo / S → ACTIVE
├── Rojo / M → ACTIVE
├── Azul / S → DRAFT
└── Azul / M → INACTIVE
```

El producto puede permanecer activo mientras existan variantes en diferentes estados.

La regla mínima es:

```text
Producto ACTIVE
        │
        └── al menos una variante ACTIVE
```

---

# 9. Publicación

La publicación debe considerarse una acción posterior a la configuración del producto.

Condición mínima recomendada:

```ts
const canPublishProduct =
  product.recordStatus === "ACTIVE" &&
  product.variants.some(
    variant => variant.recordStatus === "ACTIVE"
  );
```

Dependiendo de las reglas comerciales, también pueden agregarse validaciones adicionales:

```text
✓ Producto activo
✓ Al menos una variante activa
✓ Categoría válida
✓ Información obligatoria completa
✓ Propiedades obligatorias válidas
✓ Imágenes requeridas
✓ Precio válido
✓ Proveedor válido
✓ Canal de venta configurado
```

---

# 10. Flujo de interfaz

## Crear producto

El formulario debe estar enfocado en crear la entidad.

```text
Crear producto

1. Información básica
2. Galería
3. Categorización
4. Propiedades
5. Proveedor

[ Crear producto ]
```

Al finalizar:

```text
Producto creado correctamente.

Estado:
DRAFT

Siguiente paso:
Agregar al menos una variante.
```

---

## Agregar variantes

```text
Producto DRAFT

Variantes
────────────────────────────

No existen variantes.

[ Agregar variante ]
```

Después:

```text
Variantes

┌───────────────────────────────┐
│ Rojo / M       DRAFT          │
│ Azul / M       DRAFT          │
└───────────────────────────────┘

[ Agregar variante ]
```

---

## Activar una variante

Cuando una variante cumple sus propias validaciones:

```text
Variante
────────────────

Estado
[ ACTIVE ]

[ Guardar ]
```

Después de activarla:

```text
✓ Existe una variante activa.

La configuración de publicación del producto
está disponible.
```

---

# 11. Configuración de publicación

Antes de tener una variante activa:

```text
Configuración de publicación
────────────────────────────

🔒 Esta configuración estará disponible cuando
exista al menos una variante activa.
```

Después:

```text
Configuración de publicación
────────────────────────────

Estado del registro
[ ACTIVE ]

Estado de venta
[ AVAILABLE ]

Canales de venta

☑ Tienda web
☑ Aplicación móvil
☐ Punto de venta

Fecha de disponibilidad
[ 14/09/2026 09:00 ]

[ Publicar ]
```

---

# 12. ProductTag

`ProductTag` no representa un estado del producto.

Las etiquetas son características comerciales que pueden coexistir:

```text
ON_SALE
NEW
POPULAR
LOW_STOCK
IN_STORE_ONLY
```

Ejemplo:

```text
Producto

Tags:
[ NEW ] [ ON_SALE ] [ LOW_STOCK ]
```

Siempre que sea posible, las etiquetas deberían derivarse automáticamente de los datos.

Ejemplo:

```text
Precio anterior > precio actual
        ↓
ON_SALE
```

```text
Stock <= umbral configurado
        ↓
LOW_STOCK
```

Esto evita inconsistencias entre el estado real del producto y sus etiquetas.

---

# 13. Reglas de negocio principales

| Regla                              | Resultado                                          |
| ---------------------------------- | -------------------------------------------------- |
| Crear producto                     | `recordStatus = DRAFT`                             |
| Producto sin variantes             | No puede publicarse                                |
| Producto con variantes DRAFT       | No puede publicarse                                |
| Existe ≥ 1 variante ACTIVE         | Se habilita configuración de publicación           |
| Producto ACTIVE                    | Debe existir al menos una variante ACTIVE          |
| Una variante INACTIVE              | No obliga a desactivar el producto                 |
| Una variante DRAFT                 | Puede coexistir con variantes ACTIVE               |
| Todas las variantes INACTIVE/DRAFT | El producto no debería poder publicarse            |
| Producto DELETED                   | No puede publicarse                                |
| Producto ARCHIVED                  | No puede publicarse sin una acción de restauración |

---

# 14. Principio de diseño

El flujo debe separar claramente tres acciones:

```text
CREAR
  ↓
ACTIVAR
  ↓
PUBLICAR
```

### Crear

Hace que el producto exista.

```text
DRAFT
```

### Activar

Indica que el producto y al menos una de sus variantes están preparados para operar.

```text
ACTIVE
```

### Publicar

Determina que el producto puede exponerse en los canales comerciales configurados.

```text
ACTIVE + configuración de publicación válida
```

Estas acciones no deben confundirse en la interfaz.

---

# 15. Resumen

El flujo recomendado es:

```text
┌─────────────────────┐
│   CREAR PRODUCTO    │
│       DRAFT         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ CREAR VARIANTE(S)   │
│       DRAFT         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ ACTIVAR VARIANTE    │
│       ACTIVE        │
└──────────┬──────────┘
           │
           │ ≥ 1 variante ACTIVE
           ▼
┌─────────────────────┐
│ CONFIGURAR PRODUCTO │
│ Estado / Venta /    │
│ Canales / Fecha     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     PUBLICAR        │
└─────────────────────┘
```

La idea fundamental es que **el producto base no se considera listo para publicación únicamente porque sus datos estén completos**. Debe existir al menos una variante activa que represente una configuración comercializable del producto.
