"use server";
import prisma from "@/lib/prisma";
import { AttributeDefinitionsResponse } from "@/src/features/attributes";
import { Prisma } from "@/src/generated/prisma/client";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { createDateRangeFilter } from "../utils/dateRanger.filter";
import { buildMeta, buildOrderBy, type PaginationBasic } from "@/src/shared/table";
import { AttributeTableFilter } from "@/src/features/attributes/attribute-definition/types";

type Pag = PaginationBasic;
type Filters = AttributeTableFilter;

export const getAttrDefinitions = async (pag: Pag, fil: Filters) => {

    const { search, dataType, registeredFrom, registeredTo, updatedFrom, updatedTo } = fil;

    const filters: Prisma.AttributeDefinitionWhereInput[] = [];
    if (search)
        filters.push({ OR: [{ name: { contains: search, mode: "insensitive" } }] });

    const cratedDate = createDateRangeFilter(registeredFrom, registeredTo);
    if (cratedDate) filters.push({ createdAt: cratedDate });

    const updatedDate = createDateRangeFilter(updatedFrom, updatedTo);
    if (updatedDate) filters.push({ updatedAt: updatedDate });

    if (dataType) filters.push({ dataType });
    //-----------------

    const { page, pageSize, sortBy, order, state } = pag;

    if (state === "ACTIVE") filters.push({ isActive: true });
    if (state === "INACTIVE") filters.push({ isActive: false });

    const orderBy = buildOrderBy<Prisma.AttributeDefinitionOrderByWithAggregationInput>(sortBy, order, {
        created_at: "createdAt",
        name: "name",
        data_type: "dataType",
    });

    return PromiseReturn<AttributeDefinitionsResponse>(async () => {

        const attrs = prisma.attributeDefinition.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy,
            where: filters.length ? { AND: filters } : {},
            select: {
                id: true,
                name: true,
                description: true,
                AttributeValueOptions: {
                    select: { id: true, value: true, displayOrder: true }
                },
                isActive: true,
                dataType: true,
                createdAt: true,
                updatedAt: true
            }
        });

        const totalAttrs = prisma.attributeDefinition.count({ where: filters.length ? { AND: filters } : {} });

        const [res, totalItems] = await prisma.$transaction([attrs, totalAttrs]);

        return ApiResponse.success("Lista de atributos consultados correctamente.", {
            attributes: res.map(v => ({ ...v, values: v.AttributeValueOptions.sort((a, b) => a.displayOrder! - b.displayOrder!) })),
            meta: buildMeta({
                totalItems,
                pageSize,
                page,
                totalPages: Math.ceil(totalItems / pageSize)
            })
        })
    });
}