import { InventoryPolicyTypeDb } from "./type";

export const INVENTORY_POLICY: Record<InventoryPolicyTypeDb, InventoryPolicyTypeDb> = {
    AUTO_DECREMENT: "AUTO_DECREMENT",
    UNLIMITED: "UNLIMITED",
    ON_DEMAND: "ON_DEMAND",
} as const;

export const INVENTORY_POLICY_OPTIONS: {
    value: InventoryPolicyTypeDb;
    label: string;
}[] = [
    { value: "AUTO_DECREMENT", label: "Inventario controlado" },
    { value: "UNLIMITED", label: "Sin límite de stock" },
    { value: "ON_DEMAND", label: "Bajo pedido" },
];
