import { Permission } from "../interfaces/rolePermissions.interfaces";
import { RoleGroup } from "../interfaces/roleGroup.interface";
import { UserRole, UserRoleType } from "../interfaces/roleType.interface";
import { ROLE_PERMISSIONS } from "../permissions/permissions.constants";
// ==========================
//  JERARQUÍA DE ROLES
// ==========================
const ROLE_LEVELS: Record<UserRole, number> = {
  // SISTEMA 0-9
  SUPER_ADMIN: 0,
  SYSTEM_ADMIN: 1,

  // PLATAFORMA 10-19
  PLATFORM_ADMIN: 10,
  PLATFORM_MANAGER: 11,

  // PROVEEDORES 20-29
  SUPPLIER_ADMIN: 20,
  SUPPLIER_MANAGER: 21,
  SUPPLIER_SALES: 22,
  SUPPLIER_INVENTORY: 23,
  SUPPLIER_SUPPORT: 24,
  SUPPLIER_FINANCE: 25,

  // STORES (tiendas/sucursales) 30-39
  STORE_OWNER: 30,
  STORE_MANAGER: 31,
  STORE_STAFF: 32,
  STORE_CASHIER: 33,
  STORE_INVENTORY: 34,

  // STAFF INTERNO 40-49
  SUPPORT_AGENT: 40,
  WAREHOUSE_MANAGER: 41,
  WAREHOUSE_STAFF: 42,
  MARKETING_MANAGER: 43,
  MARKETING_AGENT: 44,

  // CLIENTES 50-59
  VIP_CUSTOMER: 50,
  CUSTOMER: 51,

  // OTROS 60-69
  AFFILIATE: 60,
  // 90-99
  GUEST: 99,
};

export const ROLE_GROUP_RANGES:Record<RoleGroup, {min:number, max:number}> = {
  system: { min: 0, max: 9 },
  platform: { min: 10, max: 19 },
  supplier: { min: 20, max: 29 },
  store: { min: 30, max: 39 },
  department: { min: 40, max: 49 },
  customer: { min: 50, max: 59 },
  external: { min: 60, max: 69 },
  guest: { min: 90, max: 99 },
} as const;


// Obtener grupo de roles por nivel
export function getAvailableSecondaryRoles(
  primaryRole: UserRole,
  group: RoleGroup
): { role: UserRole; level: number }[] {
  const roleLevel = ROLE_LEVELS[primaryRole];
  const range = ROLE_GROUP_RANGES[group];

  if (!range) {
    throw new Error(`Invalid role group: ${group}`);
  }

  if (roleLevel < range.min || roleLevel > range.max) {
    throw new Error("Primary role does not belong to this group");
  }

  return (Object.entries(ROLE_LEVELS) as [UserRole, number][])
    .filter(([_key, level]) => level >= range.min && level <= range.max)
    .filter(([_key, level]) => level > roleLevel)
    .map(([role, level]) => ({ role, level }));
}


// ===============
// Helper: Nivel
// ===============
//TODO: No se esta usando
export function getRoleLevel(role: UserRole): number {
  return ROLE_LEVELS[role] ?? 99;
}

// ================================================
// Comparar si un rol es >= o superior jerárquico
// ================================================
//TODO: No se esta usando
export function hasHigherOrEqualRole(
  userRole: UserRole,
  requiredRole: UserRole
): boolean {
  return getRoleLevel(userRole) <= getRoleLevel(requiredRole);
}

// ============================
// Obtener permisos por rol
// ============================
export function getPermissionsForRole(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

// ============================
// Validar permiso individual
// ============================
//TODO: No esta usando
export function hasRolePermission(
  role: UserRole,
  permission: Permission
): boolean {
  const permissions = getPermissionsForRole(role);

  // SUPER ADMIN: acceso total
  if (role === UserRoleType.SUPER_ADMIN) return true;

  // Permiso directo
  if (permissions.includes(permission)) return true;

  // Permiso wildcard global
  if (permissions.includes("*" as Permission)) return true;

  // Verificar wildcard por categoría, ej: "products:*"
  return checkWildcardPermission(permissions, permission);
}

// ===================================
// Chequear wildcard (products:*)
// ===================================
function checkWildcardPermission(
  permissions: Permission[],
  permission: Permission
): boolean {
  const [category] = permission.split(":");
  const wildcard = `${category}:*` as Permission;
  return permissions.includes(wildcard);
}
