import { UserRole } from "./roleType.type";

export type Permission =
  // Dashboard
  | "dashboard:view"

  // Productos
  | "products:view"
  | "products:create"
  | "products:edit"
  | "products:delete"
  | "products:export"
  | "products:import"

  // Inventario
  | "inventory:view"
  | "inventory:manage"
  | "inventory:adjust"
  | "inventory:transfers"

  // Órdenes
  | "orders:view"
  | "orders:create"
  | "orders:edit"
  | "orders:cancel"
  | "orders:process"
  | "orders:fulfill"
  | "orders:refund"

  // Clientes
  | "customers:view"
  | "customers:edit"
  | "customers:delete"
  | "customers:export"

  // Proveedores
  | "suppliers:view"
  | "suppliers:manage"
  | "suppliers:approve"
  | "suppliers:suspend"

  // Usuarios
  | "users:view"
  | "users:create"
  | "users:edit"
  | "users:delete"
  | "users:roles"

  // Reportes
  | "reports:view"
  | "reports:sales"
  | "reports:inventory"
  | "reports:customers"
  | "reports:export"

  // Marketing
  | "marketing:campaigns"
  | "marketing:promotions"
  | "marketing:coupons"
  | "marketing:analytics"

  // Sistema
  | "system:settings"
  | "system:logs"
  | "system:backup"
  | "system:api"

  // Tienda
  | "store:inventory"
  | "store:orders"
  | "store:pos"

  // ===================
  // Permisos wildcard
  // ===================
  | "*"
  | "products:*"
  | "inventory:*"
  | "orders:*"
  | "customers:*"
  | "suppliers:*"
  | "users:*"
  | "reports:*"
  | "marketing:*";

