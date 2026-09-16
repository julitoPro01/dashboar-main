import { Prisma } from "@/src/generated/prisma/client";
import { PaginationState } from "@/src/shared/table/pagination";
import { ProductFilters } from "@/src/features/products/types";
import { createDateRangeSql } from "../../utils/dateRanger.filter";

export const getProductsRaw = (pag: PaginationState, filters: ProductFilters) => {

    const { order, sortBy, state } = pag;
    // 1. Inicializar condiciones con la base de soft-delete
    const whereConditions: Prisma.Sql[] = [Prisma.sql`p."deletedAt" IS NULL`];

    let orderBy = Prisma.empty;
    let selectfinalSheets = Prisma.empty;
    let countJoin = Prisma.empty;

    // -------------
    const search = filters.search?.trim()
    if (search) {
        whereConditions.push(Prisma.sql`(
            p."name" ILIKE ${`%${search}%`}
            OR p."parentSku" ILIKE ${`%${search}%`}
        )`);
    }

    // PRICE
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
        whereConditions.push(Prisma.sql`
        EXISTS (
            SELECT 1
            FROM product_variants pv_filter
            WHERE pv_filter."productId" = p.id
              AND pv_filter."deletedAt" IS NULL
              ${filters.priceMin !== undefined
                ? Prisma.sql`AND pv_filter.price >= ${filters.priceMin}`
                : Prisma.empty}
              ${filters.priceMax !== undefined
                ? Prisma.sql`AND pv_filter.price <= ${filters.priceMax}`
                : Prisma.empty}
        )
    `);
        countJoin = Prisma.sql` ${countJoin} LEFT JOIN product_variants pv ON pv."productId" = p.id AND pv."deletedAt" IS NULL`;
    }

    // DATE
    const dateRange = createDateRangeSql(
        filters.registeredFrom,
        filters.registeredTo
    );

    if (dateRange.from) {
        whereConditions.push(
            Prisma.sql`p."createdAt" >= ${dateRange.from}`
        );
    }

    if (dateRange.to) {
        whereConditions.push(
            Prisma.sql`p."createdAt" < ${dateRange.to}`
        );
    }
    // -----------------
    if (state) {
        whereConditions.push(Prisma.sql`rs."name" =${state}`)
        countJoin = Prisma.sql` ${countJoin} LEFT JOIN record_status rs ON rs.id = p."recordStatusId"`;
    }
    // --------------
    if (filters.verificationStatusId) {
        whereConditions.push(Prisma.sql`p."verificationStatusId" = ${filters.verificationStatusId}`);
        countJoin = Prisma.sql` ${countJoin} LEFT JOIN verification_statuses vs ON vs.id = p."verificationStatusId"`;
    }
    // ---------------
    if (sortBy === "name") {
        orderBy = (order === "desc")
            ? Prisma.sql`p."name" DESC, p.id DESC`
            : Prisma.sql`p."name" ASC, p.id ASC`;
    } else if (sortBy === "created_at") {
        orderBy = (order === "desc")
            ? Prisma.sql`p."createdAt" DESC, p.id DESC`
            : Prisma.sql`p."createdAt" ASC, p.id ASC`;
    }
    else if (sortBy === "stock") {
        orderBy = (order === "desc")
            ? Prisma.sql`pv."stockQuantity" DESC, p.id DESC`
            : Prisma.sql`pv."stockQuantity" ASC, p.id ASC`;
    }
    else if (sortBy === "price") {
        orderBy = (order === "desc")
            ? Prisma.sql`pv."price" DESC, p.id DESC`
            : Prisma.sql`pv."price" ASC, p.id ASC`;
    }
    else {
        orderBy = (order === "desc")
            ? Prisma.sql` p.id DESC`
            : Prisma.sql` p.id ASC`;
    }
    // ----------
    // 3. Manejo del CTE de categorías recursivas
    if (filters.categoryId) {
        selectfinalSheets = Prisma.sql`
            WITH RECURSIVE rama AS (
                SELECT id FROM categories WHERE id = ${filters.categoryId} UNION ALL
                SELECT c.id FROM categories c JOIN rama r ON r.id = c."parentId"
            ), 
            leaf_category AS (
                SELECT id FROM rama r WHERE NOT EXISTS (
                    SELECT 1 FROM categories WHERE "parentId" = r.id
                )
            )
        `;

        whereConditions.push(Prisma.sql`ca.id IN (SELECT id FROM leaf_category)`);

        // Asignamos los joins del conteo únicamente si entra al filtro
        countJoin = Prisma.sql`
            ${countJoin}
            LEFT JOIN categories ca ON ca.id = p."categoryId" 
        `;

    }
    // Unimos todas las condiciones con AND de forma segura para Prisma
    const whereSql = Prisma.join(whereConditions, ' AND ');

    // Campos fijos y Joins limpios utilizando fragmentos Raw controlados
    const selectFields = Prisma.raw(`
        p.id, p."publicId", p."name", p."parentSku", p."createdAt", p."updatedAt",
        rs.name AS "productStatus", vs.name AS "verificationStatus",

        json_build_object('id', ca.id, 'name', ca."name") AS category,

        (SELECT json_build_object(
        'name', mf."fileName", 
        'path', mf."filePath"
        ) FROM product_images pi
         LEFT JOIN media_files mf ON mf.id = pi."fileId"
         WHERE pi."isPrimary" = true AND pi."productId" = p.id LIMIT 1) AS image,

        COUNT(DISTINCT pv.id)::int AS "variantsCount",

        COALESCE(MIN(pv.price), 0.00)::text AS "minPrice",
        COALESCE(MAX(pv.price), 0.00)::text AS "maxPrice",
         
        COALESCE(SUM(pv."stockQuantity"), 0)::int AS "totalStock",
        COALESCE(MAX(pv.discount),0)::text AS "maxDiscountPercent",
        (COUNT(DISTINCT pv.discount) = 1) AS "isUniformDiscount",
        COALESCE((MAX(pv.discount) > 0), false) AS "hasDiscount",

        SUM(CASE WHEN pv."minStock" IS NOT NULL AND pv."stockQuantity" <= pv."minStock" THEN 1 ELSE 0 END)::int AS "lowStockVariantsCount",	
        BOOL_OR(pv."minStock" IS NOT NULL AND pv."stockQuantity" <= pv."minStock") AS "hasLowStock"
    `);

    const joinClause = Prisma.raw(`
        LEFT JOIN product_variants pv ON pv."productId" = p.id AND pv."deletedAt" IS NULL
        LEFT JOIN categories ca ON ca.id = p."categoryId"
        LEFT JOIN record_status rs ON rs.id = p."recordStatusId"
        LEFT JOIN verification_statuses vs ON vs.id = p."verificationStatusId"
    `);

    const groupBy = Prisma.raw(`p.id, ca.id, pv."price", p."publicId", p."name", p."parentSku", p."createdAt", p."updatedAt", rs."name", vs."name", pv."stockQuantity"`);

    return {
        selectfinalSheets,
        selectFields,
        whereSql,
        joinClause,
        groupBy,
        orderBy,
        countJoin
    }

}