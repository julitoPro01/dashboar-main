import { ProductTag } from "@/src/generated/prisma/enums";

export const productTagsUi: { label: string; value: ProductTag }[] = [
    { label: "En oferta", value: "ON_SALE" },
    { label: "Nuevo", value: "NEW" },
    { label: "Popular", value: "POPULAR" },
    { label: "Pocas unidades", value: "LOW_STOCK" },
    { label: "Solo en tienda física", value: "IN_STORE_ONLY" },
];