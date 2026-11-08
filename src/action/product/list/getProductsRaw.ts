import { Prisma } from "@/src/generated/prisma/client";
import { PaginationStateOld } from "@/src/shared/table/pagination";
import { ProductFilters } from "@/src/features/products/types";
import { createDateRangeSql } from "../../shared/utils";

export const getProductsRaw = (
    pag: PaginationStateOld,
    filters: ProductFilters
) => {
    const whereConditions: Prisma.Sql[] = [
        Prisma.sql`p."deletedAt" IS NULL`,
    ];

    const search = filters.search?.trim();

    if (search) {
        whereConditions.push(Prisma.sql`(
            p."name" ILIKE ${`%${search}%`}
            OR p."parentSku" ILIKE ${`%${search}%`}
        )`);
    }

    // Incluir el producto si al menos una variante activa cumple el rango.
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
    }

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

    const { state, sortBy, order } = pag;

    if (state) {
        whereConditions.push(Prisma.sql`
            EXISTS (
                SELECT 1
                FROM record_status rs_filter
                WHERE rs_filter.id = p."recordStatusId"
                  AND rs_filter.name = ${state}
            )
        `);
    }

    if (filters.verificationStatusId !== undefined) {
        whereConditions.push(
            Prisma.sql`p."verificationStatusId" = ${filters.verificationStatusId}`
        );
    }

    if (filters.categoryId !== undefined) {
        whereConditions.push(
            Prisma.sql`p."categoryId" IN (SELECT id FROM leaf_category)`
        );
    }

    let orderBy: Prisma.Sql;

    if (sortBy === "name") {
        orderBy = order === "desc"
            ? Prisma.sql`p."name" DESC, p.id DESC`
            : Prisma.sql`p."name" ASC, p.id ASC`;
    } else if (sortBy === "created_at") {
        orderBy = order === "desc"
            ? Prisma.sql`p."createdAt" DESC, p.id DESC`
            : Prisma.sql`p."createdAt" ASC, p.id ASC`;
    } else if (sortBy === "stock") {
        orderBy = order === "desc"
            ? Prisma.sql`COALESCE(va.total_stock, 0) DESC, p.id DESC`
            : Prisma.sql`COALESCE(va.total_stock, 0) ASC, p.id ASC`;
    } else if (sortBy === "price") {
        orderBy = order === "desc"
            ? Prisma.sql`va.min_price DESC NULLS LAST, p.id DESC`
            : Prisma.sql`va.min_price ASC NULLS LAST, p.id ASC`;
    } else {
        orderBy = order === "desc"
            ? Prisma.sql`p.id DESC`
            : Prisma.sql`p.id ASC`;
    }

    const categoryCte = filters.categoryId !== undefined
        ? Prisma.sql`,
            category_branch AS (
                SELECT id
                FROM categories
                WHERE id = ${filters.categoryId}

                UNION

                SELECT child.id
                FROM categories child
                INNER JOIN category_branch parent
                    ON parent.id = child."parentId"
            ),
            leaf_category AS (
                SELECT branch.id
                FROM category_branch branch
                WHERE NOT EXISTS (
                    SELECT 1
                    FROM categories child
                    WHERE child."parentId" = branch.id
                )
            )`
        : Prisma.empty;

    const withClause = Prisma.sql`
        WITH RECURSIVE
        variant_agg AS (
            SELECT
                pv."productId" AS product_id,
                COUNT(*)::int AS variants_count,
                MIN(pv.price) AS min_price,
                MAX(pv.price) AS max_price,
                COALESCE(SUM(pv."stockQuantity"), 0)::int AS total_stock,
                COALESCE(MAX(pv.discount), 0) AS max_discount_percent,
                COUNT(DISTINCT pv.discount) = 1 AS is_uniform_discount,
                COALESCE(BOOL_OR(pv.discount > 0), false) AS has_discount,
                COUNT(*) FILTER (
                    WHERE pv."minStock" IS NOT NULL
                      AND pv."stockQuantity" <= pv."minStock"
                )::int AS low_stock_variants_count,
                COALESCE(BOOL_OR(
                    pv."minStock" IS NOT NULL
                    AND pv."stockQuantity" <= pv."minStock"
                ), false) AS has_low_stock
            FROM product_variants pv
            WHERE pv."deletedAt" IS NULL
            GROUP BY pv."productId"
        )
        ${categoryCte}
    `;

    const whereSql = Prisma.join(whereConditions, " AND ");

    const selectFields = Prisma.sql`
        p.id,
        p."publicId",
        p."name",
        p."parentSku",
        p."createdAt",
        p."updatedAt",

        rs.name AS "productStatus",
        vs.name AS "verificationStatus",

        json_build_object(
            'id', ca.id,
            'name', ca."name"
        ) AS category,

        (
            SELECT json_build_object(
                'name', mf."fileName",
                'path', mf."filePath"
            )
            FROM product_images pi
            LEFT JOIN media_files mf ON mf.id = pi."fileId"
            WHERE pi."isPrimary" = true
              AND pi."productId" = p.id
            LIMIT 1
        ) AS image,

        COALESCE(va.variants_count, 0)::int AS "variantsCount",
        COALESCE(va.min_price, 0.00)::text AS "minPrice",
        COALESCE(va.max_price, 0.00)::text AS "maxPrice",
        COALESCE(va.total_stock, 0)::int AS "totalStock",
        COALESCE(va.max_discount_percent, 0)::text AS "maxDiscountPercent",
        COALESCE(va.is_uniform_discount, false) AS "isUniformDiscount",
        COALESCE(va.has_discount, false) AS "hasDiscount",
        COALESCE(va.low_stock_variants_count, 0)::int AS "lowStockVariantsCount",
        COALESCE(va.has_low_stock, false) AS "hasLowStock"
    `;

    const joinClause = Prisma.sql`
        LEFT JOIN variant_agg va ON va.product_id = p.id
        INNER JOIN categories ca ON ca.id = p."categoryId"
        INNER JOIN record_status rs ON rs.id = p."recordStatusId"
        INNER JOIN verification_statuses vs
            ON vs.id = p."verificationStatusId"
    `;

    return {
        withClause,
        selectFields,
        joinClause,
        whereSql,
        orderBy,
    };
};
