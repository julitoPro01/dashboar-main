export type ProductFilters = {
    search?: string;          // name, sku
    categoryId?: number;

    priceMin?: number;
    priceMax?: number;

    // TODO: Aplicar logica luego
    discountMin?: number;
    discountMax?: number;

    // statusId?: number;
    // supplierId?: number;

    registeredFrom?: string;
    registeredTo?: string;

    verificationStatusId?: number;
}
