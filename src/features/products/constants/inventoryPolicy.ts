import { InventoryPolicyTypeDb } from "../types";

export const INVENTORY_POLICY: Record<InventoryPolicyTypeDb, InventoryPolicyTypeDb> = {
    AUTO_DECREMENT: "AUTO_DECREMENT",
    UNLIMITED: "UNLIMITED",
    ON_DEMAND: "ON_DEMAND",
} as const;

// const INVENTORY_POLICY_LABEL: Record<InventoryPolicyTypeDb, string> = {
//     AUTO_DECREMENT: "Inventario controlado",
//     UNLIMITED: "Sin límite de stock",
//     ON_DEMAND: "Bajo pedido",
// };

export const INVENTORY_POLICY_OPTIONS: {
    value: InventoryPolicyTypeDb;
    label: string;
}[] = [
        {
            value: "AUTO_DECREMENT",
            label:"Inventario controlado",
        },
        {
            value: "UNLIMITED",
            label: "Sin límite de stock",
        },
        {
            value: "ON_DEMAND",
            label: "Bajo pedido",
        },
    ];