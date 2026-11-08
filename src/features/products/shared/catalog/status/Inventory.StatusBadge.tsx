import { INVENTORY_STATUS } from "./inventory.constants";
import { InventoryStatusTypeDb } from "./inventory.type";

interface InventoryStatusBadgeProps {
    status: InventoryStatusTypeDb;
}

const INVENTORY_STATUS_CONFIG = {
    [INVENTORY_STATUS.IN_STOCK]: {
        label: "En stock",
        className: "bg-green-100 text-green-700 ring-green-600/20 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-500/30",
    },
    [INVENTORY_STATUS.OUT_OF_STOCK]: {
        label: "Sin stock",
        className: "bg-gray-50 text-gray-600 ring-gray-500/20 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-500/30",
    },
    [INVENTORY_STATUS.PENDING_RESTOCK]: {
        label: "Pendiente de reposición",
        className: "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-500/30",
    },
    [INVENTORY_STATUS.IN_TRANSIT]: {
        label: "En tránsito",
        className: "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-500/30",
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
