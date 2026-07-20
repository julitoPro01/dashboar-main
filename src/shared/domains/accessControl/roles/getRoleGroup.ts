import { RoleGroup } from "../types/roleGroup.type";
import { UserRole, UserRoleType } from "../types/roleType.type";



export function getRoleGroup(role: UserRole): RoleGroup {
  switch (role) {
    // =====================
    // SYSTEM
    // =====================
    case UserRoleType.SUPER_ADMIN:
    case UserRoleType.SYSTEM_ADMIN:
      return "system";

    // =====================
    // PLATFORM
    // =====================
    case UserRoleType.PLATFORM_ADMIN:
    case UserRoleType.PLATFORM_MANAGER:
      return "platform";

    // =====================
    // SUPPLIER
    // =====================
    case UserRoleType.SUPPLIER_ADMIN:
    case UserRoleType.SUPPLIER_MANAGER:
    case UserRoleType.SUPPLIER_SALES:
    case UserRoleType.SUPPLIER_INVENTORY:
    case UserRoleType.SUPPLIER_SUPPORT:
    case UserRoleType.SUPPLIER_FINANCE:
      return "supplier";

    // =====================
    // STORE
    // =====================
    case UserRoleType.STORE_OWNER:
    case UserRoleType.STORE_MANAGER:
    case UserRoleType.STORE_STAFF:
    case UserRoleType.STORE_CASHIER:
    case UserRoleType.STORE_INVENTORY:
      return "store";

    // =====================
    // INTERNAL DEPARTMENTS
    // =====================
    case UserRoleType.SUPPORT_AGENT:
    case UserRoleType.WAREHOUSE_MANAGER:
    case UserRoleType.WAREHOUSE_STAFF:
    case UserRoleType.MARKETING_MANAGER:
    case UserRoleType.MARKETING_AGENT:
      return "department";

    // =====================
    // CUSTOMERS
    // =====================
    case UserRoleType.CUSTOMER:
    case UserRoleType.VIP_CUSTOMER:
      return "customer";

    // =====================
    // OTHER / EXTERNAL
    // =====================
    case UserRoleType.AFFILIATE:
      return "external";

    case UserRoleType.GUEST:
      return "guest";
  }
}
