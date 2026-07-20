import { RoleGroup } from "../types/roleGroup.type";
import { UserRole, UserRoleType } from "../types/roleType.type";

export interface RoleOption {
  KEY: UserRole;
  label: string;
}

 const roleLabels: Record<UserRole, string> = {
  SUPER_ADMIN: "Super Administrador",
  SYSTEM_ADMIN: "Administrador del Sistema",

  PLATFORM_ADMIN: "Administrador de Plataforma",
  PLATFORM_MANAGER: "Gerente de Plataforma",

  SUPPLIER_ADMIN: "Administrador",
  SUPPLIER_MANAGER: "Gerente",
  SUPPLIER_SALES: "Ventas",
  SUPPLIER_INVENTORY: "Inventario",
  SUPPLIER_SUPPORT: "Soporte",
  SUPPLIER_FINANCE: "Finanzas",

  STORE_OWNER: "Dueño de Tienda",
  STORE_MANAGER: "Gerente de Tienda",
  STORE_STAFF: "Personal de Tienda",
  STORE_CASHIER: "Cajero",
  STORE_INVENTORY: "Inventario",

  SUPPORT_AGENT: "Agente de Soporte",
  WAREHOUSE_MANAGER: "Gerente de Almacén",
  WAREHOUSE_STAFF: "Personal de Almacén",
  MARKETING_MANAGER: "Gerente de Marketing",
  MARKETING_AGENT: "Agente de Marketing",

  CUSTOMER: "Cliente",
  VIP_CUSTOMER: "Cliente VIP",

  AFFILIATE: "Afiliado",
  GUEST: "Invitado",
};

//TODO: No se esta usando
export function getRoleOptionsByGroup(roleGroup: RoleGroup): RoleOption[] {
  // Mapeo de RoleType a etiquetas legibles

  switch (roleGroup) {
    // =====================
    // SYSTEM
    // =====================
    case "system":
      return [UserRoleType.SUPER_ADMIN, UserRoleType.SYSTEM_ADMIN].map(role => ({
        KEY: role,
        label: roleLabels[role]
      }));
      
    // =====================
    // PLATFORM
    // =====================
    case "platform":
      return [UserRoleType.PLATFORM_ADMIN, UserRoleType.PLATFORM_MANAGER].map(role => ({
        KEY: role,
        label: roleLabels[role]
      }));
      
    // =====================
    // SUPPLIER
    // =====================
    case "supplier":
      return [
        UserRoleType.SUPPLIER_ADMIN,
        UserRoleType.SUPPLIER_MANAGER,
        UserRoleType.SUPPLIER_SALES,
        UserRoleType.SUPPLIER_INVENTORY,
        UserRoleType.SUPPLIER_SUPPORT,
        UserRoleType.SUPPLIER_FINANCE
      ].map(role => ({
        KEY: role,
        label: roleLabels[role]
      }));
      
    // =====================
    // STORE
    // =====================
    case "store":
      return [
        UserRoleType.STORE_OWNER,
        UserRoleType.STORE_MANAGER,
        UserRoleType.STORE_STAFF,
        UserRoleType.STORE_CASHIER,
        UserRoleType.STORE_INVENTORY
      ].map(role => ({
        KEY: role,
        label: roleLabels[role]
      }));
      
    // =====================
    // INTERNAL DEPARTMENTS
    // =====================
    case "department":
      return [
        UserRoleType.SUPPORT_AGENT,
        UserRoleType.WAREHOUSE_MANAGER,
        UserRoleType.WAREHOUSE_STAFF,
        UserRoleType.MARKETING_MANAGER,
      ].map(role => ({
        KEY: role,
        label: roleLabels[role]
      }));
      
    // =====================
    // CUSTOMERS
    // =====================
    case "customer":
      return [
        UserRoleType.CUSTOMER,
        UserRoleType.VIP_CUSTOMER
      ].map(role => ({
        KEY: role,
        label: roleLabels[role]
      }));
      
    // =====================
    // OTHER / EXTERNAL
    // =====================
    case "external":
      return [UserRoleType.AFFILIATE].map(role => ({
        KEY: role,
        label: roleLabels[role]
      }));
      
    case "guest":
      return [UserRoleType.GUEST].map(role => ({
        KEY: role,
        label: roleLabels[role]
      }));
  }
}

// También puedes crear funciones específicas para cada grupo si las necesitas:
export const systemRoles: RoleOption[] = getRoleOptionsByGroup("system");
export const platformRoles: RoleOption[] = getRoleOptionsByGroup("platform");
export const supplierRoles: RoleOption[] = getRoleOptionsByGroup("supplier");
export const storeRoles: RoleOption[] = getRoleOptionsByGroup("store");
export const departmentRoles: RoleOption[] = getRoleOptionsByGroup("department");
export const customerRoles: RoleOption[] = getRoleOptionsByGroup("customer");
export const externalRoles: RoleOption[] = getRoleOptionsByGroup("external");
export const guestRoles: RoleOption[] = getRoleOptionsByGroup("guest");


// Función para obtener todas las opciones de roles
export function getAllRoleOptions(): RoleOption[] {
  const allGroups: RoleGroup[] = [
    "system", "platform", "supplier", "store", 
    "department", "customer", "external", "guest"
  ];
  
  return allGroups.flatMap(group => getRoleOptionsByGroup(group));
}

// Función para buscar una opción de rol por su KEY
export function getRoleOptionByKey(key: UserRole): RoleOption | undefined {
  const allRoles = getAllRoleOptions();
  return allRoles.find(role => role.KEY === key);
}
