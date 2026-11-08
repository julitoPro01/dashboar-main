
import { InventoryStatusTypeDb } from "./inventory.type";

export const INVENTORY_STATUS = {
    IN_STOCK: "IN_STOCK",
    OUT_OF_STOCK: "OUT_OF_STOCK",
    PENDING_RESTOCK: "PENDING_RESTOCK",
    IN_TRANSIT: "IN_TRANSIT",
} as const satisfies Record<InventoryStatusTypeDb, InventoryStatusTypeDb>;

