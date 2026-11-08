# 0. Estado del registro — `recordStatus`

Controla el ciclo de vida administrativo del registro, independientemente de su inventario, estado comercial o publicación por canal.

## 0.1. Transiciones

```text
DRAFT
  ├──→ ACTIVE
  └──→ DELETED (eliminación física)

ACTIVE
  ├──→ INACTIVE
  ├──→ ARCHIVED
  └──→ DELETED

INACTIVE
  ├──→ ACTIVE
  ├──→ ARCHIVED
  └──→ DELETED

ARCHIVED
  ├──→ INACTIVE (restauración administrativa)
  └──→ DELETED

DELETED
  └──→ DRAFT (restauración administrativa, si se conserva)
```

| Estado actual | Transiciones permitidas                               |
| ------------- | ----------------------------------------------------- |
| `DRAFT`       | `ACTIVE`, `DELETED` (eliminación física)              |
| `ACTIVE`      | `INACTIVE`, `ARCHIVED`, `DELETED`                     |
| `INACTIVE`    | `ACTIVE`, `ARCHIVED`, `DELETED`                       |
| `ARCHIVED`    | `INACTIVE` (restauración administrativa), `DELETED`   |
| `DELETED`     | `DRAFT`, si se permite la restauración administrativa |

### Reglas generales

- `DRAFT`: el registro está en preparación y todavía no participa en la operación normal del catálogo.
- `ACTIVE`: el registro está habilitado administrativamente para operar, sujeto a las condiciones del producto y de la comercialización.
- `INACTIVE`: el registro está deshabilitado, pero puede reactivarse.
- `ARCHIVED`: el registro se retira de la operación normal y se conserva para consulta histórica.
- `DELETED`: el registro se considera eliminado. Si se utiliza borrado lógico, no se elimina físicamente de la base de datos.
- La restauración de un registro archivado o eliminado debe realizarse mediante una operación administrativa explícita, con validación de sus relaciones y requisitos.
- Un registro restaurado desde `ARCHIVED` debe pasar a `INACTIVE`, nunca directamente a `ACTIVE`.
- Las transiciones deben validarse en el backend.

**Nota:** la eliminación física y el estado `DELETED` no son equivalentes. Si un registro se elimina físicamente, deja de existir como registro y no puede recuperarse mediante una transición de estado.


