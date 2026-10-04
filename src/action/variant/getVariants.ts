"use server";

import prisma from "@/lib/prisma";
import { sortCategoriesByParent } from "@/src/features/category/shared/utils";
import { VariantListResponse } from "@/src/features/products/types";
import { Prisma } from "@/src/generated/prisma/client";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";

type Props =
    | { productId: number; publicId?: never }
    | { publicId: string; productId?: never };

export const getVariants = async (props: Props) => {

    const where: Prisma.ProductWhereUniqueInput =
        "productId" in props
            ? { id: props.productId }
            : { publicId: props.publicId };

    return PromiseReturn(async () => {

        const res = await prisma.product.findUnique({
            where,
            select: {
                id: true,
                publicId: true,

                category: {
                    select: {
                        id: true,
                        name: true,
                        path: true,
                    }
                },

                productVariants: {
                    select: {
                        id: true,
                        sku: true,
                        stockQuantity: true,
                        minStock: true,
                        price: true,
                        discount: true,
                        isMainVariant: true,
                        displayOrder: true,

                        recordStatus: { select: { id: true, name: true } },

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
                                            select: {
                                                id: true,
                                                value: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        if (!res)
            return ApiResponse.notFound();

        const ids = res.category.path
            .split("/")
            .filter(Boolean)
            .map(Number);

        const resTree = await prisma.category.findMany({
            where: { id: { in: ids } },
            select: {
                id: true,
                name: true,
                parentId: true
            }
        });

        const buildTreePaths = sortCategoriesByParent(resTree);

        return ApiResponse.success<VariantListResponse>("Lista de variantes obtenidas correctamente.", {
            product: {
                id: res.id,
                publicId: res.publicId,
                category: {
                    ...res.category,
                    paths: buildTreePaths
                }
            },
            variants: res.productVariants
        })
    })
}