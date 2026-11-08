"use server";

import prisma from "@/lib/prisma";
import { sortCategoriesByParent } from "@/src/features/category/shared/utils";
import { VariantFilterCounts, VariantFilters, VariantListResponse } from "@/src/features/products/types";
import { Prisma } from "@/src/generated/prisma/client";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { RECORD_STATUS_ID } from "@/src/shared/domains/recordStatus";
import { buildMeta, PaginationState, SORT_BY_PARAMS } from "@/src/shared/table/pagination";

const getDiscountStatus = (
    discount: number,
    startsAt: Date | null,
    endsAt: Date | null,
    now: Date,
) => {
    if (discount <= 0) return "NONE" as const;
    if (endsAt && endsAt.getTime() <= now.getTime()) return "EXPIRED" as const;
    if (startsAt && startsAt.getTime() > now.getTime()) return "SCHEDULED" as const;
    return "ACTIVE" as const;
};

type Props = (
    | { productId: number; publicId?: never }
    | { publicId: string; productId?: never }
) & { filters?: VariantFilters; pagination: PaginationState };

const variantSelect = {
    id: true,
    sku: true,
    stockQuantity: true,
    minStock: true,
    stockMovements: {
        where: { type: "ADJUSTMENT" },
        orderBy: { date: "desc" },
        take: 5,
        select: {
            id: true,
            quantity: true,
            reason: true,
            date: true,
            createdBy: true,
        },
    },
    price: true,
    discount: true,
    isMainVariant: true,
    displayOrder: true,
    discountStartsAt: true,
    discountEndsAt: true,
    recordStatus: { select: { id: true, name: true } },
    saleStatus: true,
    inventoryStatus: true,
    inventoryPolicy: true,
    variantChannel: {
        select: { id: true, channel: true, publicationStatus: true },
    },
    tags: true,
    varianAttributesValue: {
        select: {
            id: true,
            valueText: true,
            valueNumber: true,
            valueBoolean: true,
            valueDate: true,
            valueOptionIds: true,
            attributeDefinition: {
                select: {
                    id: true,
                    name: true,
                    systemAttributeValue: {
                        select: { id: true, value: true },
                    },
                },
            },
        },
    },
    images: {
        where: { isPrimary: true },
        select: {
            id: true,
            mediaFile: {
                select: { fileName: true, filePath: true },
            },
        },
    },
} satisfies Prisma.ProductVariantSelect;

const getVariantWhere = async (
    productId: number,
    status: VariantFilters["status"],
): Promise<Prisma.ProductVariantWhereInput> => {
    const baseWhere: Prisma.ProductVariantWhereInput = { productId };

    switch (status) {
        case "ALL":
            return {
                ...baseWhere,
                deletedAt: null,
                recordStatusId: {
                    in: [RECORD_STATUS_ID.DRAFT, RECORD_STATUS_ID.ACTIVE, RECORD_STATUS_ID.INACTIVE],
                },
            };
        case "DRAFT":
            return { ...baseWhere, deletedAt: null, recordStatusId: RECORD_STATUS_ID.DRAFT };
        case "ACTIVE":
            return { ...baseWhere, deletedAt: null, recordStatusId: RECORD_STATUS_ID.ACTIVE };
        case "INACTIVE":
            return { ...baseWhere, deletedAt: null, recordStatusId: RECORD_STATUS_ID.INACTIVE };
        case "ARCHIVED":
            return { ...baseWhere, deletedAt: null, recordStatusId: RECORD_STATUS_ID.ARCHIVED };
        case "DELETED":
            return { ...baseWhere, recordStatusId: RECORD_STATUS_ID.DELETED };
        case "LOW_STOCK": {
            // Prisma no permite comparar dos columnas en `where`; se obtienen los IDs usando la regla de stock mínimo.
            const lowStockVariants = await prisma.$queryRaw<{ id: number }[]>`
                SELECT id
                FROM product_variants
                WHERE "productId" = ${productId}
                  AND "deletedAt" IS NULL
                  AND "inventoryPolicy" = 'AUTO_DECREMENT'
                  AND "minStock" IS NOT NULL
                  AND "stockQuantity" <= "minStock"
            `;

            return {
                ...baseWhere,
                deletedAt: null,
                id: { in: lowStockVariants.map(({ id }) => id) },
            };
        }
    }
};

const getVariantOrderBy = (
    sortBy: PaginationState["sortBy"],
    order: PaginationState["order"],
): Prisma.ProductVariantOrderByWithRelationInput[] => {
    const sortField: Prisma.ProductVariantOrderByWithRelationInput["displayOrder"] = order;
    switch (sortBy) {
        case SORT_BY_PARAMS.displayorder:
            return [{ displayOrder: sortField }, { id: order }];
        case SORT_BY_PARAMS.order:
        default:
            return [{ id: order }];
    }
};


export const getVariants = async ({ filters, pagination, ...props }: Props) => {
    const { order, page, pageSize, sortBy } = pagination;

    const productWhere: Prisma.ProductWhereUniqueInput =
        "productId" in props
            ? { id: props.productId }
            : { publicId: props.publicId };

    const orderBy = getVariantOrderBy(sortBy,order);

    return PromiseReturn(async () => {
        const product = await prisma.product.findUnique({
            where: productWhere,
            select: {
                id: true,
                publicId: true,
                name: true,
                parentSku: true,
                category: {
                    select: { id: true, name: true, path: true },
                },
            },
        });

        if (!product) return ApiResponse.notFound();

        const status = filters?.status ?? "ALL";
        const variantWhere = await getVariantWhere(product.id, status);
        const offset = (page - 1) * pageSize;

        const [variants, totalItems, statusCounts, lowStockCount] = await Promise.all([
            prisma.productVariant.findMany({
                where: variantWhere,
                orderBy,
                skip: offset,
                take: pageSize,
                select: variantSelect,
            }),
            prisma.productVariant.count({ where: variantWhere }),
            prisma.productVariant.groupBy({
                by: ["recordStatusId"],
                where: { productId: product.id },
                _count: { _all: true },
            }),
            prisma.$queryRaw<{ count: number }[]>`
                SELECT COUNT(*)::int AS count
                FROM product_variants
                WHERE "productId" = ${product.id}
                  AND "deletedAt" IS NULL
                  AND "inventoryPolicy" = 'AUTO_DECREMENT'
                  AND "minStock" IS NOT NULL
                  AND "stockQuantity" <= "minStock"
            `,
        ]);

        const counts: VariantFilterCounts = {
            draft: 0,
            active: 0,
            inactive: 0,
            lowStock: lowStockCount[0]?.count ?? 0,
            archived: 0,
            deleted: 0,
        };

        for (const item of statusCounts) {
            const count = item._count._all;
            if (item.recordStatusId === RECORD_STATUS_ID.DRAFT) counts.draft = count;
            if (item.recordStatusId === RECORD_STATUS_ID.ACTIVE) counts.active = count;
            if (item.recordStatusId === RECORD_STATUS_ID.INACTIVE) counts.inactive = count;
            if (item.recordStatusId === RECORD_STATUS_ID.ARCHIVED) counts.archived = count;
            if (item.recordStatusId === RECORD_STATUS_ID.DELETED) counts.deleted = count;
        }

        const categoryIds = product.category.path
            .split("/")
            .filter(Boolean)
            .map(Number);

        const categoryTree = await prisma.category.findMany({
            where: { id: { in: categoryIds } },
            select: { id: true, name: true, parentId: true },
        });
        const categoryPaths = sortCategoriesByParent(categoryTree);

        const now = new Date();
        const mapVariants = variants.map(({ images, price, stockMovements, discount, discountStartsAt, discountEndsAt, ...variant }) => ({
            ...variant,
            discount: Number(discount),
            discountStartsAt,
            discountEndsAt,
            discountStatus: getDiscountStatus(Number(discount), discountStartsAt, discountEndsAt, now),
            stockAdjustments: stockMovements,
            attributes: variant.varianAttributesValue,
            // Prisma Decimal no es serializable al pasar props a un Client Component.
            price: price.toString(),
            image: images[0]
                ? {
                    id: images[0].id,
                    name: images[0].mediaFile.fileName,
                    path: images[0].mediaFile.filePath,
                }
                : { id: 0, name: "", path: "" },
        }));

        return ApiResponse.success<VariantListResponse>("Lista de variantes obtenida correctamente.", {
            product: {
                id: product.id,
                publicId: product.publicId,
                name: product.name,
                sku: product.parentSku,
                category: {
                    ...product.category,
                    paths: categoryPaths,
                },
            },
            variants: mapVariants,
            counts,
            meta: buildMeta({
                totalItems,
                pageSize: pagination.pageSize,
                totalPages: Math.ceil(totalItems / pagination.pageSize),
                page: pagination.page,
            }),
        });
    });
};
