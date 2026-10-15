import { InventoryPolicyTypeDb, InventoryStatusTypeDb } from "../types";
import { INVENTORY_POLICY } from "./inventoryPolicy";

/**
 *  POR DEFECTO Y EN DB
 */
export const INVENTORY_STATUS: Record<InventoryStatusTypeDb, InventoryStatusTypeDb> = {
    IN_STOCK: "IN_STOCK",
    OUT_OF_STOCK: "OUT_OF_STOCK",
    PENDING_RESTOCK: "PENDING_RESTOCK",
    IN_TRANSIT: "IN_TRANSIT",
} as const;

// -----------------------

type SetInventoryStatusParams = {
        inventoryPolicy: InventoryPolicyTypeDb;
        stockQuantity: number;
    }

export const setInventoryStatusByInventoryPolicy = (params: SetInventoryStatusParams) => {

    if ("stockQuantity" in params) {
        const { stockQuantity } = params;

        return stockQuantity > 0
            ? INVENTORY_STATUS.IN_STOCK
            : INVENTORY_STATUS.OUT_OF_STOCK;
    }

    return INVENTORY_STATUS.IN_STOCK;
};