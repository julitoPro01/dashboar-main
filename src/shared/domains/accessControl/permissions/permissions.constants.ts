import { Permission } from "../types/rolePermissions.type";
import { UserRole } from "../types/roleType.type";

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  // 🔥 SISTEMA
  SUPER_ADMIN: ["*"],
  SYSTEM_ADMIN: [
    "system:settings",
    "system:logs",
    "system:backup",
    "system:api",
    "users:view",
    "users:edit",
  ],

  // 🏢 PLATAFORMA
  PLATFORM_ADMIN: [
    "dashboard:view",
    "products:*",
    "inventory:*",
    "orders:*",
    "customers:*",
    "suppliers:*",
    "users:*",
    "reports:*",
    "marketing:*",
    "system:settings",
  ],

  PLATFORM_MANAGER: [
    "dashboard:view",
    "products:view",
    "products:edit",
    "inventory:view",
    "inventory:manage",
    "orders:view",
    "orders:process",
    "customers:view",
    "customers:edit",
    "suppliers:view",
    "users:view",
    "reports:view",
    "reports:export",
    "marketing:campaigns",
    "marketing:promotions",
  ],

  // 🛒 PROVEEDORES (Supplier)
  SUPPLIER_ADMIN: [
    "dashboard:view",
    "products:view",
    "products:create",
    "products:edit",
    "inventory:view",
    "inventory:manage",
    "orders:view",
    "orders:process",
    "orders:fulfill",
    "reports:view",
    "reports:sales",
    "reports:inventory",
  ],

  SUPPLIER_MANAGER: [
    "dashboard:view",
    "products:view",
    "products:edit",
    "inventory:view",
    "inventory:manage",
    "orders:view",
    "orders:process",
    "reports:view",
  ],

  SUPPLIER_SALES: [
    "dashboard:view",
    "products:view",
    "orders:view",
    "orders:process",
    "reports:view",
    "reports:sales",
  ],

  SUPPLIER_INVENTORY: [
    "dashboard:view",
    "products:view",
    "inventory:view",
    "inventory:manage",
    "inventory:adjust",
    "orders:view",
  ],

  SUPPLIER_SUPPORT: ["dashboard:view", "orders:view", "customers:view"],

  SUPPLIER_FINANCE: [
    "dashboard:view",
    "orders:view",
    "reports:view",
    "reports:sales",
    "reports:export",
  ],

  // 🏬 STORE (tiendas / sucursales)
  STORE_OWNER: [
    "dashboard:view",
    "store:orders",
    "store:inventory",
    "store:pos",
    "orders:view",
    "orders:process",
    "inventory:view",
    "inventory:manage",
    "products:view",
    "reports:view",
  ],

  STORE_MANAGER: [
    "dashboard:view",
    "store:orders",
    "store:inventory",
    "orders:view",
    "orders:process",
    "inventory:view",
    "products:view",
  ],

  STORE_STAFF: [
    "dashboard:view",
    "store:orders",
    "orders:view",
    "products:view",
  ],

  STORE_CASHIER: [
    "dashboard:view",
    "store:pos",
    "orders:view",
    "orders:create",
  ],

  STORE_INVENTORY: [
    "dashboard:view",
    "store:inventory",
    "inventory:view",
    "inventory:manage",
  ],

  // 👥 CLIENTES
  CUSTOMER: ["dashboard:view", "products:view", "orders:view", "orders:create"],

  VIP_CUSTOMER: [
    "dashboard:view",
    "products:view",
    "orders:view",
    "orders:create",
    "marketing:promotions",
  ],

  // 🧑‍💼 STAFF INTERNO
  SUPPORT_AGENT: [
    "dashboard:view",
    "orders:view",
    "orders:edit",
    "customers:view",
    "customers:edit",
  ],

  WAREHOUSE_MANAGER: [
    "dashboard:view",
    "inventory:view",
    "inventory:manage",
    "inventory:transfers",
    "orders:view",
    "orders:process",
    "products:view",
  ],

  WAREHOUSE_STAFF: [
    "dashboard:view",
    "inventory:view",
    "orders:view",
    "orders:process",
  ],

  MARKETING_MANAGER: [
    "dashboard:view",
    "marketing:*",
    "reports:view",
    "customers:view",
  ],

  MARKETING_AGENT: [
    "dashboard:view",
    "marketing:campaigns",
    "marketing:promotions",
    "customers:view",
  ],

  // 🎯 OTROS
  AFFILIATE: ["dashboard:view", "reports:sales"],
  GUEST: ["products:view"],
};
