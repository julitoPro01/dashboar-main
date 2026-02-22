import { Permission } from "../interfaces/rolePermissions.interfaces";

//TODO: No se esta usando
export function hasAllPermissions(
  user: { permissions: Permission[] },
  required: Permission[]
): boolean {
  const perms = new Set(user.permissions);

  if (perms.has("*")) return true;

  return required.every(perm => {
    if (perms.has(perm)) return true;
    const [scope] = perm.split(":");
    return perms.has(`${scope}:*` as Permission);
  });
}
