"use server";

import prisma from "@/lib/prisma";
import { CategoryAttrsResponse, CategoryAttrFilters } from "@/src/features/attributes/category-attributes/types";
import { Prisma } from "@/src/generated/prisma/client";
import { buildMeta, PaginationState } from "@/src/shared/table/pagination";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils"
import { Sql } from "@prisma/client/runtime/client";

export const getCategoryAttrs = async (pag: PaginationState, fls: CategoryAttrFilters) => {

    const limit = pag.pageSize;
    const offset = (pag.page - 1) * pag.pageSize;

    const { searchView, searchAssign, searchEdit, actionType } = fls;

    const whereConditions: Prisma.Sql[] = [];

    if (actionType === "view" && searchView)
        whereConditions.push(Prisma.sql`ad."name" ILIKE ${`%${searchView}%`}`)
    else if (actionType === "assign" && searchAssign)
        whereConditions.push(Prisma.sql`ad."name" ILIKE ${`%${searchAssign}%`}`)
    else if (actionType === "edit" && searchEdit)
        whereConditions.push(Prisma.sql`ad."name" ILIKE ${`%${searchEdit}%`}`)

    const { where, select, orderBy, join } = actionType !== "assign" ? viewDataClause(whereConditions, fls) : allDataClause(whereConditions, fls);

    const data = prisma.$queryRaw<any[]>`
        SELECT 
            ad.id,
            ad."name",
            ad."isActive",
            ad."dataType",
            ${select}
        FROM "attribute_definitions" ad
        ${join}
        ${where}
        ${orderBy}
        LIMIT ${limit} OFFSET ${offset}
    `;

    const count = prisma.$queryRaw<[{ count: bigint }]>`
        SELECT COUNT(*)::int as count
        FROM "attribute_definitions" ad
        ${join}
        ${where}
    `;

    return PromiseReturn(async () => {
        const [resData, resTotal] = await prisma.$transaction([data, count]);

        const totalItems = Number(resTotal[0].count);

        return ApiResponse.success<CategoryAttrsResponse>("Ok", {
            categoryAttrs: resData,
            meta: buildMeta({
                totalItems,
                page: pag.page,
                pageSize: pag.pageSize,
                totalPages: Math.ceil(totalItems / pag.pageSize)
            })
        })
    })

}

const allDataClause = (whereConditions: Sql[], fls: CategoryAttrFilters) => {

    const { selection, categoryId } = fls;

    const selectionType = selection?.type ?? "all";
    const targetIds = selection?.ids ?? [];
    const hasIds = targetIds.length > 0;

    whereConditions.push(
        Prisma.sql`
    NOT EXISTS (
      SELECT 1
      FROM "category_attributes" ca
      WHERE ca."attributeDefinitionId" = ad.id
      AND ca."categoryId" = ${categoryId}
    )
  `
    );

    if (selectionType === "selected-only") {
        if (hasIds)
            whereConditions.push(Prisma.sql`ad.id IN (${Prisma.join(targetIds)})`);
        else whereConditions.push(Prisma.sql`1 = 0`);
    }

    if (selectionType === "unselected" && hasIds)
        whereConditions.push(Prisma.sql`ad.id NOT IN (${Prisma.join(targetIds)})`);

    let orderByClause = Prisma.sql`ORDER BY ad.id ASC`; // Orden por defecto
    if (selectionType === "selected-first" && hasIds)
        orderByClause = Prisma.sql`ORDER BY (ad.id IN (${Prisma.join(targetIds)})) DESC, ad.id ASC`;

    const selectFields = Prisma.raw(`
        false AS "isRequired",
        false AS "isFilter",
        false AS "isVariant",
        NULL AS "displayOrder",
        NULL AS "displayGroup"
    `);

    const joinClause = Prisma.raw(``);

    return {
        where: whereConditions.length ? Prisma.sql`WHERE ${Prisma.join(whereConditions, " AND ")}` : Prisma.empty,
        select: selectFields,
        orderBy: orderByClause,
        join: joinClause
    }

}

const viewDataClause = (whereConditions: Sql[], fls: CategoryAttrFilters) => {

    const { categoryId } = fls;

    whereConditions.push(Prisma.sql`ca."categoryId" = ${categoryId}`);

    const orderByClause = Prisma.sql`ORDER BY ca."displayOrder" ASC`;

    const selectFields = Prisma.raw(`
        ca."isRequired",
        ca."isFilter",
        ca."isVariant",
        ca."displayOrder",
        ca."displayGroup"
    `);

    const joinClause = Prisma.raw(`
        INNER JOIN "category_attributes" ca ON ca."attributeDefinitionId" = ad.id
    `);

    return {
        where: whereConditions.length ? Prisma.sql`WHERE ${Prisma.join(whereConditions, " AND ")}` : Prisma.empty,
        select: selectFields,
        orderBy: orderByClause,
        join: joinClause
    }
}
