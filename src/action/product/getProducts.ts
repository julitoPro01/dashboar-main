"use server"

import prisma from "@/lib/prisma";

import { ApiResponse, PromiseReturn } from "@/src/utils";
import { Prisma } from "@/src/generated/prisma/client";
import { ProductResponse, ProductsResponse, ProductTableFilters } from "@/src/interfaces/products";
import { PaginationBasic } from "@/src/domains/pagination";


type Pagination = PaginationBasic;

type Filters = ProductTableFilters;

export const getProducts = async (filters: Filters, Pagination: Pagination) => {

    const { page, pageSize, order, sortBy } = Pagination;

    const wh: Prisma.ProductWhereInput[] = [];
    if (filters.search) wh.push({ OR: [{ name: filters.search }] });
    if (filters.categoryId) wh.push({ productCategories: { some: { categoryId: filters.categoryId } } });
    if (filters.statusId) wh.push({ recordStatusId: filters.statusId });
    if (filters.supplierId) wh.push({ supplierId: filters.supplierId });
    if (filters.verificationStatusId) wh.push({ verificationStatusId: filters.verificationStatusId });
    // if(...)

    let orderBy: Prisma.ProductOrderByWithAggregationInput[] = [];
    if (sortBy === "created_at") orderBy = [{ createdAt: order }, { id: order }];
    else if (sortBy === "name") orderBy = [{ name: order }, { id: order }];
    else orderBy = [{ id: order }]

    return PromiseReturn(async () => {

        const resCount = prisma.product.count({
            where: wh.length ? { AND: wh } : {}
        });
        const resProducts = prisma.product.findMany({
            skip: (page - 1) * pageSize, take: pageSize, orderBy,
            where: { ...(wh.length && { AND: wh }) },
            select: {

            }
        });

        const [total, products] = await prisma.$transaction([resCount, resProducts]);

        return ApiResponse.success("")
    })
}


export const getProductsTest = async (filters: Filters, Pagination: Pagination) => {
    
    const { page, pageSize, order, sortBy } = Pagination;
    const limit = pageSize;
    const offset = (page - 1) * pageSize;

    const params: any[] = [];
    let whereSql = `p."deletedAt" IS NULL`;

    if (filters.search) {
        params.push(`%${filters.search}%`);
        whereSql += ` AND p.name ILIKE $${params.length}`;
    }
    if (filters.categoryId) {
        params.push(filters.categoryId);
        whereSql += ` AND p."lastCategoryId" = $${params.length}`;
    }
    if (filters.statusId) {
        params.push(filters.statusId);
        whereSql += ` AND p."recordStatusId" = $${params.length}`;
    }
    if (filters.supplierId) { //TODO: temporal
        params.push(filters.supplierId);
        whereSql += ` AND p."supplierId" = $${params.length}`;
    }
    if (filters.verificationStatusId) {
        params.push(filters.verificationStatusId);
        whereSql += ` AND p."verificationStatusId" = $${params.length}`;
    }

    // Orden dinámico básico (puedes extender a más campos)
    let orderSql = `p."createdAt" DESC`;
    if (sortBy === "name") orderSql = `p.name ${order}`;
    else if (sortBy === "created_at") orderSql = `p."createdAt" ${order}`;

    const sql = `
    SELECT 
	p.id,
	p."publicId",
	p."name",
	p."parentSku",
	p."lastCategoryId",
	p."createdAt",
	p."updatedAt",
	
	c.name AS "category",
    rs.name AS "productStatus",
    vs.name AS "verificationStatus",
      
	(SELECT 
		mf."fileName"
	FROM product_images pi
	LEFT JOIN media_files mf ON mf.id = pi."fileId"
	WHERE pi."isPrimary"=true AND pi."productId" = p.id LIMIT 1 ) AS image,
	
	COUNT(DISTINCT pv.id )::int AS "variantsCount",
	MIN(pv.price) AS "minPrice",
	MAX(pv.price) AS "maxPrice",
	COALESCE(SUM(pv."stockQuantity"),0)::int AS "totalStock",
	MAX(pv.discount) AS "maxDiscountPercent",
	(COUNT(DISTINCT pv.discount) = 1) AS "isUniformDiscount",
	(MAX(pv.discount) > 0) AS "hasDiscount",
	SUM(CASE WHEN pv."minStock" IS NOT NULL AND pv."stockQuantity" <= pv."minStock" THEN 1 ELSE 0 END)::int AS "lowStockVariantsCount",	
    BOOL_OR(pv."minStock" IS NOT NULL AND pv."stockQuantity" <= pv."minStock") AS "hasLowStock"

    from products p 
    LEFT JOIN product_variants pv ON pv."productId" = p.id AND p."deletedAt" = null
    LEFT JOIN categories c ON c.id = p."lastCategoryId"
    LEFT JOIN record_status rs ON rs.id = p."recordStatusId"
    LEFT JOIN verification_statuses vs ON vs.id = p."verificationStatusId"

    WHERE ${whereSql}

    GROUP BY
    p.id, p."publicId", p."name", p."parentSku", p."lastCategoryId", p."createdAt", p."updatedAt",
    c."name", rs."name", vs."name"

    ORDER BY ${orderSql}
    LIMIT ${limit} OFFSET ${offset};

  `;

    const finalParams = [...params];

    return PromiseReturn<ProductsResponse>(async () => {

        // Ejecutar
        const products: ProductResponse[] = await prisma.$queryRawUnsafe(sql, ...finalParams);

        // Count total (para paginación) - simple y separado
        const countSql = `SELECT COUNT(1) FROM products p WHERE ${whereSql};`;
        const countRes = await prisma.$queryRawUnsafe(countSql, ...finalParams) as any[];
        
        const totalItems = Number(countRes[0]?.count ?? 0);
        const totalPages = Math.ceil(totalItems / pageSize);


        return ApiResponse.success("", {
            products,
            meta: {
                totalItems: totalItems,
                itemsPerPage: pageSize,
                totalPages: !!totalPages ? totalPages : 1,
                currentPage: page,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
                nextPage: page < totalPages ? page + 1 : null,
                prevPage: page > 1 ? page - 1 : null
            }
        });

    })
}
