
# Reglas del ciclo de vida y estados de productos y variantes

## 1. Objetivo

Definir las reglas de transición de estado para productos base y variantes, garantizando la coherencia entre sus estados administrativos y evitando que un producto se comercialice sin variantes activas.

## 2. Principios generales

1. El estado administrativo (`recordStatus`) es independiente del estado de inventario (`inventoryStatus`), del estado comercial (`saleStatus`) y del estado de publicación por canal (`publicationStatus`).
2. El producto base controla si el producto puede participar en las operaciones comerciales.
3. Cada variante administra su propio estado administrativo.
4. Una variante puede estar `ACTIVE` aunque su producto base esté en `DRAFT` o `INACTIVE`.
5. Una variante activa no activa automáticamente el producto base.
6. El producto base solo puede pasar a `ACTIVE` si cumple los requisitos de activación y tiene al menos una variante `ACTIVE`.
7. Si un producto base activo pierde su última variante activa, debe pasar automáticamente a `INACTIVE`.
8. Los estados `ARCHIVED` y `DELETED` impiden la activación y la operación comercial del registro correspondiente.

## 3. Estados administrativos

| Estado | Descripción |
|--------|-------------|
| `DRAFT` | Registro en preparación. Puede configurarse antes de habilitarlo para operar. |
| `ACTIVE` | Registro habilitado administrativamente. Su operación comercial depende también del estado de su producto base y de las reglas comerciales. |
| `INACTIVE` | Registro desactivado. Puede reactivarse si cumple los requisitos correspondientes. |
| `ARCHIVED` | Registro retirado de la operación habitual, conservado para consulta e historial. |
| `DELETED` | Registro eliminado lógicamente o físicamente, según la política de persistencia. |

## 4. Transiciones permitidas

### 4.1. Producto base

| Estado actual | Estado destino | Permitido | Condición |
|---------------|----------------|-----------|-----------|
| `DRAFT`       | `ACTIVE`       | Sí        | Información obligatoria válida y al menos una variante `ACTIVE`. |
| `DRAFT`       | `DELETED`      | Sí        | Según la política de eliminación. |
| `ACTIVE`      | `INACTIVE`     | Sí        | Desactivación manual o pérdida de la última variante activa. |
| `ACTIVE`      | `ARCHIVED`     | Sí        | Según las reglas de archivado. |
| `ACTIVE`      | `DELETED`      | Sí        | Según la política de eliminación. |
| `INACTIVE`    | `ACTIVE`       | Sí        | Información obligatoria válida y al menos una variante `ACTIVE`. |
| `INACTIVE`    | `ARCHIVED`     | Sí        | Según las reglas de archivado. |
| `INACTIVE`    | `DELETED`      | Sí        | Según la política de eliminación. |
| `ARCHIVED`    | `INACTIVE`     | Sí        | Restauración administrativa. No se activa automáticamente. |
| `ARCHIVED`    | `DELETED`      | Sí        | Según la política de eliminación. |
| `DELETED`     | `DRAFT`        | Condicional | Solo si se admite la restauración de registros eliminados. |

La transición a `ACTIVE` siempre es una acción explícita del usuario. El sistema no debe activar automáticamente el producto base cuando se activa una variante.

### 4.2. Variante

| Estado actual | Estado destino | Permitido | Condición |
|---------------|----------------|-----------|-----------|
| `DRAFT`       | `ACTIVE`       | Sí         | Variante válida y producto base no archivado ni eliminado. |
| `DRAFT`       | `DELETED`      | Sí         | Según la política de eliminación. |
| `ACTIVE`      | `INACTIVE`     | Sí         | Desactivación manual o regla de negocio. |
| `ACTIVE`      | `ARCHIVED`     | Sí         | Según las reglas de archivado. |
| `ACTIVE`      | `DELETED`      | Sí         | Según la política de eliminación. |
| `INACTIVE`    | `ACTIVE`       | Sí         | Variante válida y producto base no archivado ni eliminado. |
| `INACTIVE`    | `ARCHIVED`     | Sí         | Según las reglas de archivado. |
| `INACTIVE`    | `DELETED`      | Sí         | Según la política de eliminación. |
| `ARCHIVED`    | `INACTIVE`     | Sí         | Restauración administrativa; no se activa automáticamente. |
| `ARCHIVED`    | `DELETED`      | Sí         | Según la política de eliminación. |
| `DELETED`     | `DRAFT`        | Condicional | Solo si se admite la restauración. |

**Importante:** la activación de una variante no exige que el producto base esté `ACTIVE`. Sí exige que el producto base no esté `ARCHIVED` ni `DELETED`.

Si el producto base está `DRAFT` o `INACTIVE`, la variante puede quedar `ACTIVE`, pero no podrá comercializarse mientras el producto base permanezca en uno de esos estados.

## 5. Reglas del producto base

### 5.1. Creación

Al crear un producto base:

- `recordStatus = DRAFT`.
- `inactiveReason = null`.
- Se permite crear y editar sus variantes.
- Las variantes nuevas comienzan en `DRAFT`.
- No se permite la comercialización mientras el producto base no esté `ACTIVE`.

### 5.2. Activación manual

El usuario puede activar el producto base cuando:

- Se hayan completado los campos obligatorios.
- Exista al menos una variante con `recordStatus = ACTIVE`.
- Se cumplan las demás validaciones de negocio necesarias para la activación.

Si no existe ninguna variante activa, la operación debe rechazarse e indicar al usuario que primero active una variante.

La activación del producto base debe ser explícita. Activar una variante no debe cambiar automáticamente el estado del producto base.

Al activar correctamente el producto base:

- `recordStatus = ACTIVE`.
- `inactiveReason = null`.

### 5.3. Desactivación manual

Cuando el usuario desactiva manualmente un producto base:

- `recordStatus = INACTIVE`.
- `inactiveReason = MANUAL`.

Las variantes pueden conservar su estado administrativo, incluso si alguna permanece `ACTIVE`. Sin embargo, ninguna de ellas puede comercializarse mientras el producto base esté inactivo.

La activación o desactivación posterior de variantes no debe sustituir el motivo `MANUAL` mientras el producto base continúe inactivo por decisión del usuario.

### 5.4. Pérdida de la última variante activa

Si el producto base está `ACTIVE` y su última variante `ACTIVE` pasa a `INACTIVE`, `ARCHIVED` o `DELETED`, el sistema debe:

1. Actualizar el estado de la variante.
2. Cambiar el producto base a `INACTIVE`.
3. Establecer `inactiveReason = NO_ACTIVE_VARIANTS`.

Las modificaciones deben ejecutarse en una única transacción de base de datos.

Esta regla también aplica cuando se elimina lógicamente la última variante activa.

### 5.5. Producto base inactivo sin variantes activas

Cuando el producto base está `INACTIVE` por `NO_ACTIVE_VARIANTS`, el usuario puede activar una variante sin activar automáticamente el producto base.

Una vez que exista al menos una variante activa, el usuario podrá activar manualmente el producto base, siempre que cumpla las demás validaciones.

Activar una variante no cambia automáticamente `inactiveReason` ni el estado del producto base.

### 5.6. Archivado y restauración

Un producto base `ARCHIVED` no puede comercializarse ni activar sus variantes.

Al restaurarlo:

- Cambiar `recordStatus` a `INACTIVE`.
- No reactivar automáticamente el producto base.
- Revisar las variantes y los requisitos antes de permitir una nueva activación.

Si la restauración se realiza dejando el producto base inactivo por decisión administrativa, establecer `inactiveReason = MANUAL`. Si la política del sistema permite identificar otra causa válida, se debe aplicar esa política de forma coherente.

### 5.7. Eliminación

Un producto base `DELETED` no puede comercializarse ni habilitar sus variantes.

El motivo `inactiveReason` debe ser `null` cuando el producto base se encuentra en `DRAFT`, `ACTIVE`, `ARCHIVED` o `DELETED`.

## 6. Reglas de las variantes

### 6.0. Crear / Actualizar

#### 6.0.1 Crear

Al crear una variante:

- Estados permitidos:`recordStatus = DRAFT | ACTIVE`

#### 6.0.2 Actualizar

Al actualizar una variante en base a su estado:

## Dentro de la acción "Editar variante"

- `DRAFT`: permitira editar todas las secciones, similar a una acción de crear.
- `ACTIVE` o `INACTIVE`: Secciones permitidas.
  1. Propiedades de la variante
  2. Información comercial y precios
  3. Galería de imagenes
- `ARCHIVED` o `DELETED`: No permite editar singuna sección.

## Secciones independientes permítidas para actualizar
-`ACTIVE, INACTIVE`: 
  1. Inventario
  2. Gestionar canales


### 6.1. Activación de una variante

Para activar una variante:

- La variante debe cumplir sus requisitos de información.
- El producto base no puede estar `ARCHIVED` ni `DELETED`.
- El producto base puede estar `DRAFT`, `ACTIVE` o `INACTIVE`.
- La operación no debe modificar automáticamente el estado del producto base.

El estado `ACTIVE` indica que la variante está habilitada administrativamente. No garantiza por sí mismo que pueda venderse.

### 6.2. Comercialización efectiva

Una variante solo puede participar en la comercialización cuando:

- La variante está `ACTIVE`.
- El producto base está `ACTIVE`.
- Se cumplen los requisitos comerciales y de publicación del canal correspondiente.

Por tanto, una variante `ACTIVE` cuyo producto base esté en `DRAFT` o `INACTIVE` no debe aparecer como producto comercializable en la tienda.

### 6.3. Desactivación, archivado o eliminación

Si una variante deja de estar activa:

- Si el producto base está `ACTIVE` y era su última variante activa, se aplica la regla de pérdida de la última variante activa.
- Si el producto base está `DRAFT` o `INACTIVE`, su estado no cambia automáticamente por esta operación.
- Si el producto base está inactivo por `MANUAL`, se conserva ese motivo.

### 6.4. Restauración

Una variante archivada debe restaurarse a `INACTIVE`, no a `ACTIVE` automáticamente.

Una variante eliminada solo puede restaurarse si la política de persistencia lo permite. En tal caso, debe volver a un estado no activo y cumplir las validaciones correspondientes antes de activarse.

## 7. Motivos de inactividad del producto base

El campo `inactiveReason` explica por qué un producto base está `INACTIVE`. No sustituye a `recordStatus`.

Valores propuestos:

```ts
export const PRODUCT_INACTIVE_REASON = {
  MANUAL: "MANUAL",
  NO_ACTIVE_VARIANTS: "NO_ACTIVE_VARIANTS",
} as const;

export type ProductInactiveReason =
  (typeof PRODUCT_INACTIVE_REASON)[keyof typeof PRODUCT_INACTIVE_REASON];
```

| Código | Etiqueta | Descripción |
|---|---|---|
| `MANUAL` | Desactivado manualmente | El usuario decidió desactivar el producto base. |
| `NO_ACTIVE_VARIANTS` | Sin variantes activas | El producto base perdió su última variante activa. |

### Reglas de `inactiveReason`

- Solo puede tener un valor cuando `recordStatus = INACTIVE`.
- Al crear un producto en `DRAFT`, debe ser `null`.
- Al activar el producto base, debe ser `null`.
- Al desactivar manualmente el producto base, debe ser `MANUAL`.
- Al perder la última variante activa, debe ser `NO_ACTIVE_VARIANTS`.
- Activar una variante mientras el producto base está `DRAFT` o `INACTIVE` no activa el producto base ni modifica automáticamente el motivo de inactividad.
- Si el producto base está inactivo por `MANUAL`, las operaciones con variantes no deben cambiar ese motivo.
- Al archivar o eliminar el producto base, debe ser `null`.

## 8. Coherencia entre estados

Se deben cumplir las siguientes invariantes:

1. Un producto base `ACTIVE` debe tener al menos una variante `ACTIVE`.
2. Un producto base `DRAFT` o `INACTIVE` puede tener variantes `ACTIVE`, pero estas no pueden comercializarse.
3. Un producto base `ARCHIVED` o `DELETED` bloquea la activación y la comercialización de sus variantes.
4. Activar una variante nunca activa automáticamente el producto base.
5. Activar un producto base exige al menos una variante activa y el cumplimiento de los requisitos de negocio.
6. Si un producto base activo pierde su última variante activa, pasa a `INACTIVE` con `NO_ACTIVE_VARIANTS`.
7. La desactivación manual debe conservar su motivo `MANUAL` aunque posteriormente se modifiquen las variantes.
8. El estado de inventario, el estado comercial y la publicación por canal no deben confundirse con el estado administrativo.

## 9. Validaciones del backend y transacciones

Las reglas deben validarse en el backend. Deshabilitar acciones en la interfaz sirve como ayuda visual, pero no sustituye las validaciones del servidor.

### Activar un producto base

Antes de cambiar el producto base a `ACTIVE`, el backend debe comprobar en la base de datos que:

- El producto existe y no está archivado ni eliminado.
- Los campos obligatorios están completos.
- Existe al menos una variante `ACTIVE`.
- Se cumplen las demás reglas de activación.

### Modificar el estado de una variante

Antes de activar una variante, el backend debe comprobar que:

- La variante existe y puede activarse.
- El producto base no está archivado ni eliminado.
- La variante cumple los requisitos de activación.

No se debe exigir que el producto base esté `ACTIVE`.

### Desactivar, archivar o eliminar una variante

Si la operación afecta a la última variante activa de un producto base `ACTIVE`, la actualización de la variante y la desactivación automática del producto base deben ejecutarse dentro de una transacción.

También se debe contemplar la concurrencia: dos solicitudes simultáneas que desactiven variantes diferentes no deben dejar un producto base `ACTIVE` sin variantes activas. Se debe utilizar una estrategia transaccional apropiada para garantizar esta invariante.

## 10. Presentación en el dashboard

El motivo de inactividad debe mostrarse únicamente cuando el producto base está `INACTIVE`.

### Sin variantes activas

- **Etiqueta:** Sin variantes activas.
- **Mensaje:** Ninguna variante está habilitada actualmente. Activa una variante para poder reactivar este producto.
- **Acción:** Gestionar variantes.

### Desactivado manualmente

- **Etiqueta:** Desactivado manualmente.
- **Mensaje:** Este producto fue desactivado por un usuario. Puedes reactivarlo cuando esté listo.
- **Acción:** Activar producto.

Si el usuario intenta activar un producto base sin variantes activas, el sistema debe explicar el requisito y ofrecer acceso a la gestión de variantes.

No se debe mostrar `inactiveReason` como un segundo estado independiente. Debe presentarse como explicación del estado `INACTIVE`.

## 11. Resumen del flujo

1. Crear el producto base en `DRAFT`.
2. Crear y configurar una o más variantes en `DRAFT`.
3. Activar una o más variantes, incluso mientras el producto base permanece en `DRAFT`.
4. Activar manualmente el producto base cuando tenga al menos una variante activa y cumpla los requisitos.
5. Permitir la comercialización únicamente cuando tanto el producto base como la variante estén `ACTIVE` y se cumplan las reglas del canal.
6. Si el producto base activo pierde su última variante activa, desactivarlo automáticamente con `NO_ACTIVE_VARIANTS`.
7. Si el producto base se desactiva manualmente, conservar `MANUAL` y no sustituirlo por cambios posteriores en las variantes.

**Regla fundamental:** las variantes pueden activarse de forma independiente, pero la comercialización requiere que tanto la variante como el producto base estén activos. La activación del producto base siempre es manual y exige al menos una variante activa.