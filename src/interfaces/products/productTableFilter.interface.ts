export interface ProductTableFilters {
    search?: string;          // name, sku
    categoryId?: number;

    priceMin?: number;
    priceMax?: number;

    discountMin?: number;
    discountMax?: number;

    statusId?: number;
    supplierId?: number;

    registeredFrom?: string;
    registeredTo?: string;

    verificationStatusId?: number;
}
