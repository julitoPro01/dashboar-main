import { Permission } from "../types/rolePermissions.type";

//TODO: No se esta usando
export function hasPermission(
   permissions: Permission[], // Permisos del usuario authenticado
  required: Permission | Permission[]
): boolean {
  const perms = new Set(permissions);

  if (perms.has("*")) return true;

  const requiredPerms = Array.isArray(required)
    ? required
    : [required];

  for (const perm of requiredPerms) {
    if (perms.has(perm)) return true;

    const [scope] = perm.split(":");
    if (perms.has(`${scope}:*` as Permission)) return true;
  }

  return false;
}