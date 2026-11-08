import { InventoryPolicyType, InventoryStatusType } from "@/src/generated/prisma/enums";

export const deriveInventoryStatus = (stockQuantity:number,inventoryPolicy:InventoryPolicyType): InventoryStatusType => {

    if (inventoryPolicy === "AUTO_DECREMENT")
        return stockQuantity > 0 ? "IN_STOCK" : "OUT_OF_STOCK";

    else return "IN_STOCK";
}

