import { InventoryPolicyTypeDb, SaleStatusTypeDb } from "../types";
import { INVENTORY_POLICY } from "./inventoryPolicy";


// -------

export const SALE_STATUS: Record<SaleStatusTypeDb, SaleStatusTypeDb> = {
    AVAILABLE: "AVAILABLE",
    COMING_SOON: "COMING_SOON",
    DISCONTINUED: "DISCONTINUED",
    MADE_TO_ORDER: "MADE_TO_ORDER"
} as const;

// const SALE_STATUS_LABEL: Record<SaleStatusTypeDb, string> = {
//     AVAILABLE: "Disponible",
//     COMING_SOON: "Próximamente",
//     DISCONTINUED: "Descontinuado",
//     MADE_TO_ORDER: "Hecho por encargo",
// };

export const SALE_STATUS_OPTIONS: { value: SaleStatusTypeDb, label: string }[] = [
    { value: "AVAILABLE", label: "Disponible" },
    { value: "COMING_SOON", label: "Próximamente" },
    { value: "DISCONTINUED", label: "Descontinuado" },
    { value: "MADE_TO_ORDER", label: "Hecho por encargo" },
] as const;


export const SALE_STATUS_BY_INVENTORY_POLICY:
    Record<InventoryPolicyTypeDb, SaleStatusTypeDb[]> = {
        AUTO_DECREMENT: [
            "COMING_SOON",
            "AVAILABLE",
            "DISCONTINUED",
        ],
        UNLIMITED: [
            "COMING_SOON",
            "AVAILABLE",
            "DISCONTINUED",
        ],
        ON_DEMAND: [
            "COMING_SOON",
            "MADE_TO_ORDER",
            "DISCONTINUED",
        ],
    } as const;

    
export const getSaleStatusOptionsByInventoryPolicy = (
    inventoryPolicy: InventoryPolicyTypeDb
) => {
    const isOnDemand = inventoryPolicy === INVENTORY_POLICY.ON_DEMAND;

    return SALE_STATUS_OPTIONS.map((option) => {
        if (option.value === SALE_STATUS.AVAILABLE) {
            return { ...option, disabled: isOnDemand };
        }

        if (option.value === SALE_STATUS.MADE_TO_ORDER) {
            return { ...option, disabled: !isOnDemand };
        }

        return option;
    });
};