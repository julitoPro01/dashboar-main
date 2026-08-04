"use server";

import { Prisma } from "@/src/generated/prisma/client";
import prisma from "@/lib/prisma";
import { createDateRangeFilter } from "../utils/dateRanger.filter";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { PaginationState } from "@/src/shared/table/pagination";
import { SuppliersResponse, SupplierFilters } from "@/src/features/suppliers/types";

type QueryProps = PaginationState;
type FilterProps = SupplierFilters;

export async function getSuppliers(query: QueryProps, filter: FilterProps) {

    const { page, pageSize, order, state, sortBy } = query;
    const { search, capabilities, relationMode, registeredFrom, registeredTo } = filter;

    const filters: Prisma.SupplierWhereInput[] = [];

    if (search) {
        filters.push({
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                // { publicId: { contains: search, mode: 'insensitive' } }
            ]
        });
    }

    if (state) filters.push({ recordStatus: { name: state } });
    if (capabilities) filters.push({ capabilities: { hasSome: [...capabilities] } });
    if (relationMode) filters.push({ relationMode });
    const dateFilter = createDateRangeFilter(registeredFrom, registeredTo);
    if (dateFilter) filters.push({ createdAt: dateFilter });

    let orderBy: Prisma.SupplierOrderByWithAggregationInput[] = [];
    if (sortBy === "created_at") orderBy = [{ createdAt: order }, { id: order }];
    else if (sortBy === "name") orderBy = [{ name: order }, { id: order }];
    else orderBy = [{ id: order }]

    return PromiseReturn(async () => {

        const supplierCount = prisma.supplier.count({
            where: filters.length ? { AND: filters } : {}
        })

        const supplierData = prisma.supplier.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy,
            where: filters.length ? { AND: filters } : {},
            select:
            {
                id: true,
                publicId: true,
                name: true,
                address: true,
                logoUrl: true,
                relationMode: true,
                capabilities: true,
                createdAt: true,
                recordStatus: { select: { name: true } },
            }
        })

        const [totalSuppliers, suppliers] = await prisma.$transaction([supplierCount, supplierData])


        // 2. Calcular el total de páginas
        const totalPages = Math.ceil(totalSuppliers / pageSize);


        return ApiResponse.success<SuppliersResponse>("OK", {
            suppliers: suppliers,
            meta: {
                totalItems: totalSuppliers,
                itemsPerPage: pageSize,
                totalPages: !!totalPages ? totalPages : 1,
                currentPage: page,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
                nextPage: page < totalPages ? page + 1 : null,
                prevPage: page > 1 ? page - 1 : null
            }
        });
    });
}
