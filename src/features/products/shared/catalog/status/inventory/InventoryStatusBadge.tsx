import { INVENTORY_STATUS } from "./constants";
import { InventoryStatusTypeDb } from "./type";

interface InventoryStatusBadgeProps {
    status: InventoryStatusTypeDb;
}

const INVENTORY_STATUS_CONFIG = {
    [INVENTORY_STATUS.IN_STOCK]: {
        label: "En stock",
        className: "bg-green-50 text-green-700 ring-green-600/20",
    },
    [INVENTORY_STATUS.OUT_OF_STOCK]: {
        label: "Sin stock",
        className: "bg-gray-50 text-gray-600 ring-gray-500/20",
    },
    [INVENTORY_STATUS.PENDING_RESTOCK]: {
        label: "Pendiente de reposición",
        className: "bg-amber-50 text-amber-700 ring-amber-600/20",
    },
    [INVENTORY_STATUS.IN_TRANSIT]: {
        label: "En tránsito",
        className: "bg-blue-50 text-blue-700 ring-blue-600/20",
    },
} satisfies Record<
    InventoryStatusTypeDb,
    { label: string; className: string }
>;

export function InventoryStatusBadge({
    status,
}: InventoryStatusBadgeProps) {
    const config = INVENTORY_STATUS_CONFIG[status];

    return (
        <span
            className={`inline-flex w-fit items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${config.className}`}
        >
            {config.label}
        </span>
    );
}