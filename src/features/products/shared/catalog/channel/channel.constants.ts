import type { IconType } from "react-icons";
import {
    MdOutlineLocalGroceryStore,
    MdOutlineShoppingCart,
    MdOutlineStorefront,
    MdOutlineWarehouse,
} from "react-icons/md";

import { DistributionChannelDb } from "./type";

export const CHANNEL_LABEL: Record<DistributionChannelDb, string> = {
    STOREFRONT: "Tienda en línea",
    MARKETPLACE: "Marketplace",
    PHYSICAL_STORE: "Tienda física",
    WHOLESALE: "Venta mayorista",
};

export const channelIcons: Record<
    DistributionChannelDb,
    { color: string; icon: IconType }
> = {
    STOREFRONT: {
        color: "text-sky-600 dark:text-sky-400",
        icon: MdOutlineStorefront,
    },
    MARKETPLACE: {
        color: "text-violet-600 dark:text-violet-400",
        icon: MdOutlineShoppingCart,
    },
    PHYSICAL_STORE: {
        color: "text-emerald-600 dark:text-emerald-400",
        icon: MdOutlineLocalGroceryStore,
    },
    WHOLESALE: {
        color: "text-amber-600 dark:text-amber-400",
        icon: MdOutlineWarehouse,
    },
};
