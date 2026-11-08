"use server";

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { getProductsRaw } from "./getProductsRaw";
import { buildMeta, PaginationStateOld } from "@/src/shared/table/pagination";
import {
    ProductFilters,
    ProductListItemResponse,
    ProductListResponse,
} from "@/src/features/products/types";

export const getProducts = async (
    pagination: PaginationStateOld,
    filters: ProductFilters
) => {
    const { page, pageSize } = pagination;
    const offset = (page - 1) * pageSize;

    const {
        withClause,
        selectFields,
        joinClause,
        whereSql,
        orderBy,
    } = getProductsRaw(pagination, filters);

    const data = prisma.$queryRaw<ProductListItemResponse[]>`
        ${withClause}
        SELECT ${selectFields}
        FROM products p
        ${joinClause}
        WHERE ${whereSql}
        ORDER BY ${orderBy}
        LIMIT ${pageSize}
        OFFSET ${offset}
    `;

    // No hay joins con variantes aquí: una fila contada equivale a un producto.
    const count = prisma.$queryRaw<{ count: number }[]>`
        ${withClause}
        SELECT COUNT(*)::int AS count
        FROM products p
        WHERE ${whereSql}
    `;

    return PromiseReturn(async () => {
        const [products, countRows] = await prisma.$transaction([
            data,
            count,
        ]);

        const totalItems = countRows[0]?.count ?? 0;

        return ApiResponse.success<ProductListResponse>("", {
            products,
            meta: buildMeta({
                totalItems,
                pageSize,
                totalPages: Math.ceil(totalItems / pageSize),
                page,
            }),
        });
    });
};
