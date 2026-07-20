
// ============================
// Obtener permisos por rol

import { Permission } from "../types/rolePermissions.type";
import { UserRole, UserRoleType } from "../types/roleType.type";
import { ROLE_PERMISSIONS } from "../permissions/permissions.constants";

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