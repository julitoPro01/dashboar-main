import { ProductTableFilters } from "@/src/features/products";
import { Prisma } from "@/src/generated/prisma/client";
import { PaginationBasic } from "@/src/shared/table";

export const getProductsRaw = (pag: PaginationBasic, filters: ProductTableFilters) => {

    const { order, sortBy } = pag;
    // 1. Inicializar condiciones con la base de soft-delete
    const whereConditions: Prisma.Sql[] = [Prisma.sql`p."deletedAt" IS NULL`];

    let orderBy = Prisma.sql``;
    let selectfinalSheets = Prisma.sql``;
    let countJoin = Prisma.sql``; // Empezamos vacío ya que FROM products p va fijo

    // 2. Construcción dinámica de filtros seguros
    const search = filters.search?.trim()
    if (search) {
        whereConditions.push(Prisma.sql`(
            p."name" ILIKE ${`%${search}%`}
            OR p."parentSku" ILIKE ${`%${search}%`}
        )`);
    }
    // if (filters.statusId) {
    //     whereConditions.push(Prisma.sql`p."recordStatusId" = ${filters.statusId}`);
    // }
    // if (filters.supplierId) {
    // whereConditions.push(Prisma.sql`p."supplierId" = ${filters.supplierId}`);
    // }
    if (filters.verificationStatusId) {
        whereConditions.push(Prisma.sql`p."verificationStatusId" = ${filters.verificationStatusId}`);
    }

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
    else {
        orderBy = (order === "desc")
            ? Prisma.sql` p.id DESC`
            : Prisma.sql` p.id ASC`;
    }

    // 3. Manejo del CTE de categorías recursivas
    if (filters.categoryId) {
        selectfinalSheets = Prisma.sql`
            WITH RECURSIVE rama AS (
                SELECT id FROM categories WHERE id = ${filters.categoryId} UNION ALL
                SELECT c.id FROM categories c JOIN rama r ON r.id = c."parentId"
            ), 
            final_sheets AS (
                SELECT id FROM rama r WHERE NOT EXISTS (
                    SELECT 1 FROM categories WHERE "parentId" = r.id
                )
            )
        `;

        whereConditions.push(Prisma.sql`ca.id IN (SELECT id FROM final_sheets)`);

        // Asignamos los joins del conteo únicamente si entra al filtro
        countJoin = Prisma.sql`
            LEFT JOIN product_categories pc ON pc."productId" = p.id
            LEFT JOIN categories ca ON ca.id = pc."categoryId"
        `;
    }

    // Unimos todas las condiciones con AND de forma segura para Prisma
    const whereSql = Prisma.join(whereConditions, ' AND ');

    // Campos fijos y Joins limpios utilizando fragmentos Raw controlados
    const selectFields = Prisma.raw(`
        p.id, p."publicId", p."name", p."parentSku", p."createdAt", p."updatedAt",
        rs.name AS "productStatus", vs.name AS "verificationStatus",
        json_agg(json_build_object('id', ca.id, 'name', ca.name)) AS categories,
        (SELECT mf."fileName" FROM product_images pi
         LEFT JOIN media_files mf ON mf.id = pi."fileId"
         WHERE pi."isPrimary" = true AND pi."productId" = p.id LIMIT 1) AS image,
        COUNT(DISTINCT pv.id)::int AS "variantsCount",
        MIN(pv.price) AS "minPrice", MAX(pv.price) AS "maxPrice",
        COALESCE(SUM(pv."stockQuantity"), 0)::int AS "totalStock",
        MAX(pv.discount) AS "maxDiscountPercent",
        (COUNT(DISTINCT pv.discount) = 1) AS "isUniformDiscount",
        (MAX(pv.discount) > 0) AS "hasDiscount",
        SUM(CASE WHEN pv."minStock" IS NOT NULL AND pv."stockQuantity" <= pv."minStock" THEN 1 ELSE 0 END)::int AS "lowStockVariantsCount",	
        BOOL_OR(pv."minStock" IS NOT NULL AND pv."stockQuantity" <= pv."minStock") AS "hasLowStock"
    `);

    // Corregido el p."deletedAt" = null por IS NULL
    const joinClause = Prisma.raw(`
        LEFT JOIN product_variants pv ON pv."productId" = p.id AND pv."deletedAt" IS NULL
        LEFT JOIN product_categories pc ON pc."productId" = p.id
        LEFT JOIN categories ca ON ca.id = pc."categoryId"
        LEFT JOIN record_status rs ON rs.id = p."recordStatusId"
        LEFT JOIN verification_statuses vs ON vs.id = p."verificationStatusId"
    `);

    const groupBy = Prisma.raw(`p.id, p."publicId", p."name", p."parentSku", p."createdAt", p."updatedAt", rs."name", vs."name", pv."stockQuantity"`);

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