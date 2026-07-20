"use server"

import prisma from "@/lib/prisma";
import type { ProductListResponse, ProductTableFilters } from "@/src/features/products";

import { buildMeta, type PaginationBasic } from "@/src/shared/table";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { getProductsRaw } from "./query-raw/getProductsRaw";


type Pagination = PaginationBasic;

type Filters = ProductTableFilters;


export const getProducts = async (Pagination: Pagination, filters: Filters) => {

    const { page, pageSize } = Pagination;
    const limit = pageSize;
    const offset = (page - 1) * pageSize;

    const { selectfinalSheets, selectFields, joinClause, whereSql, groupBy, orderBy, countJoin } = getProductsRaw(Pagination, filters)

    const data = prisma.$queryRaw<any[]>`
    ${selectfinalSheets}
    SELECT 
    ${selectFields}
    from products p 
    ${joinClause}
    WHERE ${whereSql}

    GROUP BY ${groupBy}

    ORDER BY ${orderBy}
    LIMIT ${limit} OFFSET ${offset};
  `;


    const count = prisma.$queryRaw<[{ count: bigint }]>`
        ${selectfinalSheets} 
        SELECT COUNT(p.id)::int as count
        FROM products p ${countJoin}
        WHERE ${whereSql}`;


    return PromiseReturn<ProductListResponse>(async () => {


        const [resData, resCount] = await prisma.$transaction([data, count]);

        const totalItems = Number(resCount[0].count);

        return ApiResponse.success("", {
            products: resData,
            meta: buildMeta({
                totalItems,
                pageSize,
                totalPages: Math.ceil(totalItems / pageSize),
                page
            })
        });

    })
}
