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
                name: true,
                parentSku: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                        path: true,
                    }
                },

                productVariants: {
                    orderBy:{displayOrder:"asc"},
                    select: {
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
                        
                        recordStatus: { select: { id: true, name: true } },
                        saleStatus:true,
                        inventoryStatus:true,
                        inventoryPolicy: true,
                        

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
                        },

                        images: {
                            where: { isPrimary: true },
                            select: {
                                id: true,
                                mediaFile: {
                                    select: {
                                        fileName: true,
                                        filePath: true
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

        const mapVariants = res.productVariants.map(({ images, price, stockMovements, ...variant }) => ({
            ...variant,
            stockAdjustments: stockMovements,
            properties:variant.varianAttributesValue,
            // Prisma Decimal no es serializable al pasar props a un Client Component.
            price: price.toString(),
            image: {
                id: images[0].id,
                name: images[0].mediaFile.fileName,
                path: images[0].mediaFile.filePath
            }
        }));

        return ApiResponse.success<VariantListResponse>("Lista de variantes obtenidas correctamente.", {
            product: {
                id: res.id,
                publicId: res.publicId,
                name: res.name,
                sku: res.parentSku,
                category: {
                    ...res.category,
                    paths: buildTreePaths
                }
            },
            variants: mapVariants
        })
    })
}
