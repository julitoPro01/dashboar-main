import { InventoryPolicyTypeDb } from "../../inventory-policy/type";
import { InventoryStatusTypeDb } from "./type";

export const INVENTORY_STATUS = {
    IN_STOCK: "IN_STOCK",
    OUT_OF_STOCK: "OUT_OF_STOCK",
    PENDING_RESTOCK: "PENDING_RESTOCK",
    IN_TRANSIT: "IN_TRANSIT",
} as const satisfies Record<InventoryStatusTypeDb, InventoryStatusTypeDb>;



type SetInventoryStatusParams = {
    inventoryPolicy: InventoryPolicyTypeDb;
    stockQuantity: number;
};

export const setInventoryStatusByInventoryPolicy = ({ stockQuantity }: SetInventoryStatusParams) =>
    stockQuantity > 0 ? INVENTORY_STATUS.IN_STOCK : INVENTORY_STATUS.OUT_OF_STOCK;
