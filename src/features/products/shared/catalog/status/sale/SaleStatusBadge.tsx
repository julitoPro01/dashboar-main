import { SALE_STATUS, SALE_STATUS_LABEL } from "./constants";
import { SaleStatusTypeDb } from "./type";

interface SaleStatusBadgeProps {
    status: SaleStatusTypeDb;
}

const SALE_STATUS_CONFIG = {
    [SALE_STATUS.AVAILABLE]: {
        className: "bg-green-50 text-green-700 ring-green-600/20",
    },
    [SALE_STATUS.COMING_SOON]: {
        className: "bg-blue-50 text-blue-700 ring-blue-600/20",
    },
    [SALE_STATUS.DISCONTINUED]: {
        className: "bg-gray-50 text-gray-600 ring-gray-500/20",
    },
    [SALE_STATUS.MADE_TO_ORDER]: {
        className: "bg-violet-50 text-violet-700 ring-violet-600/20",
    },
    
} satisfies Record< SaleStatusTypeDb, { className: string }>;

export function SaleStatusBadge({ status }: SaleStatusBadgeProps) {
    const config = SALE_STATUS_CONFIG[status];

    return (
        <span
            className={`inline-flex w-fit items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${config.className}`}
        >
            {SALE_STATUS_LABEL[status]}
        </span>
    );
}
