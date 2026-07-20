"use server";

import prisma from "@/lib/prisma";
import { ProductVariantsDetailsResponse } from "@/src/features/products/types";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";

interface Prosp {
    productPublicId: string;
}

export const getVariants = async ({ productPublicId }: Prosp) => {
    return PromiseReturn<ProductVariantsDetailsResponse>(async () => {

        const res = await prisma.$transaction(async () => {

            const res = await prisma.product.findUnique({
                where: { publicId: productPublicId },
                select: {
                    id: true,
                    lastCategoryId: true,
                    productVariants: {
                        select: {
                            id: true,
                            productId: true,
                            recordStatus: { select: { name: true } },
                            sku: true,
                            stockQuantity: true,
                            minStock: true,
                            price: true,
                            discount: true,
                            isMainVariant: true,
                            displayOrder: true,
                            isUnique: true,
                            tags: true,

                            createdAt: true,
                            updatedAt: true,

                            varianAttributesValue: {
                                select: {
                                    id: true,
                                    attributeDefinition: { select: { name: true, id: true } },
                                    value: true
                                }
                            },

                            images: {
                                select: {
                                    id: true,
                                    fileId: true,
                                    isPrimary: true,
                                    displayOrder: true,
                                    mediaFile: { select: { filePath: true } },
                                    isFeatured: true,
                                    featuredOrder: true,
                                }
                            }
                        }
                    }
                }
            })
            if (!res) return null;

            const catgAttrs = await prisma.categoryAttribute.findMany({
                where: { categoryId: res.lastCategoryId, attributeDefinition: { toProduct: false } },
                select: {
                    id: true,
                    isFilter: true,
                    isRequired: true,
                    displayOrder: true,
                    attributeDefinition: {

                        select: {
                            id: true,
                            name: true,
                            dataType: true
                        }
                    }
                }
            });


            return {
                productId: res.id,
                attributesDetails: catgAttrs.map(v => ({
                    categoryAttributeId: v.id,
                    isFilter: v.isFilter,
                    isRequired: v.isRequired,
                    displayOrder: v.displayOrder ?? undefined,
                    dataType: v.attributeDefinition.dataType,
                    key: v.attributeDefinition.name,
                    keyId: v.attributeDefinition.id,
                    value: undefined,
                    valueId: undefined,
                })),
                variantsDetails:
                    res.productVariants.map(v => ({
                        id: v.id,
                        productId: v.productId,
                        status: v.recordStatus.name,
                        sku: v.sku,
                        stockQuantity: v.stockQuantity,
                        minStock: v.minStock,
                        price: Number(v.price),
                        discount: Number(v.discount),
                        isMainVariant: v.isMainVariant,
                        displayOrder: v.displayOrder,
                        isUnique: v.isUnique,
                        tags: v.tags,
                        createdAt: v.createdAt,
                        updatedAt: v.updatedAt,

                        attributesDetails: catgAttrs!.map(ct => ({
                            categoryAttributeId: ct.id,
                            isFilter: ct.isFilter,
                            isRequired: ct.isRequired,
                            displayOrder: ct.displayOrder ?? undefined,
                            dataType: ct.attributeDefinition.dataType,
                            ...(() => {
                                const find = v.varianAttributesValue.find(v => v.attributeDefinition.id === ct.attributeDefinition.id)
                                return {
                                    key: ct.attributeDefinition.name,
                                    keyId: ct.attributeDefinition.id,
                                    value: find?.value ?? undefined,
                                    valueId: find?.id ?? undefined,
                                }
                            })()
                        })),
                        imagesDetails: v.images.map(v => ({
                            id: v.id,
                            fileId: v.fileId,
                            url: v.mediaFile.filePath,
                            isPrimary: v.isPrimary,
                            displayOrder: v.displayOrder,
                            isFeatured: v.isFeatured,
                            featuredOrder: v.featuredOrder
                        })).sort((a, b) => a.displayOrder - b.displayOrder)

                    })).sort((a, b) => a.displayOrder - b.displayOrder)
            }


        });

        if (!res)
            return ApiResponse.notFound();

        return ApiResponse.success("Lista de variantes obtenidas correctamente.", res)
    })
}