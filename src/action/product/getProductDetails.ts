"use server";

import prisma from "@/lib/prisma";
import { sortCategoriesByParent } from "@/src/features/category/utils";
import { ProductDetailsResponse } from "@/src/interfaces/products";
import { ApiResponse, PromiseReturn } from "@/src/utils";

interface Props {
    publicId: string;
}

export const getProductDetails = async ({ publicId }: Props) => {
    return PromiseReturn<ProductDetailsResponse>(async () => {

        const res = await prisma.product.findUnique({
            where: { publicId },
            select: {
                id: true,
                publicId: true,
                supplier: { select: { name: true } },
                recordStatus: { select: { name: true } },
                verificationStatus: { select: { name: true } },
                mainCategory: { select: { name: true } },
                name: true,
                shortDescription: true,
                longDescription: true,
                createdAt: true,
                updatedAt: true,
                productCategories: {
                    select: {
                        category:
                        {
                            select: {
                                id: true,
                                name: true,
                                parentId: true
                            },
                        }
                    }
                },
                attributeValues: {
                    select: {
                        id: true,
                        value: true,
                        attributeDefinition: {
                            select: { id: true }
                        },
                    }
                },
                images: {
                    select: {
                        id: true,
                        mediaFile: { select: { filePath: true } },
                        isPrimary: true,
                        displayOrder: true,
                        isFeatured: true,
                        featuredOrder: true
                    }
                },
                productVariants: {
                    select: {
                        id: true,
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
                        varianAttributesValue: {
                            select: {
                                id: true,
                                value: true,
                                attributeDefinition: {
                                    select: { id: true }
                                },
                            }
                        },
                        images: {
                            select: {
                                id: true,
                                mediaFile: { select: { filePath: true } },
                                isPrimary: true,
                                displayOrder: true,
                                isFeatured: true,
                                featuredOrder: true
                            }
                        }
                    }
                }
            }
        });

        if (!res)
            return ApiResponse.notFound();

        const categories = sortCategoriesByParent(res.productCategories.map(v => ({
            id: v.category.id,
            name: v.category.name,
            parentId: v.category.parentId ?? undefined
        })));

        const catgAttrs = await prisma.categoryAttribute.findMany({
            where: { categoryId: categories.at(-1)!.id },
            select: {
                id: true,
                isFilter: true,
                isRequired: true,
                displayOrder: true,
                attributeDefinition: {
                    select: {
                        toProduct: true,
                        id: true,
                        name: true,
                        dataType: true
                    }
                }
            }
        })

        // De producto
        const ProductCategoryAttributes = catgAttrs!.filter(v => v.attributeDefinition.toProduct).map(ct => ({
            categoryAttributeId: ct.id,
            isFilter: ct.isFilter,
            isRequired: ct.isRequired,
            displayOrder: ct.displayOrder,
            dataType: ct.attributeDefinition.dataType,
            ...(() => {
                const find = res.attributeValues.find(v => v.attributeDefinition.id === ct.attributeDefinition.id)
                return {
                    key: ct.attributeDefinition.name,
                    keyId: ct.attributeDefinition.id,
                    value: find?.value ?? undefined,
                    valueId: find?.id ?? undefined,
                }
            })()
        }))

        return ApiResponse.success("Consulta exitosa.", {
            productDetails: {
                id: res.id,
                publicId: res.publicId,
                supplier: res.supplier!.name,
                recordStatus: res.recordStatus.name,
                verificationStatus: res.verificationStatus.name,
                mainCategory: res.mainCategory.name,
                name: res.name,
                shortDescription: res.shortDescription,
                longDescription: res.longDescription,
                createdAt: res.createdAt!,
                updatedAt: res.updatedAt,
            },

            categoriesDetails: categories,

            attributesDetails: ProductCategoryAttributes,

            imagesDetails: res.images.map(v => ({
                id: v.id,
                url: v.mediaFile.filePath,
                isPrimary: v.isPrimary,
                displayOrder: v.displayOrder,
                isFeatured: v.isFeatured,
                featuredOrder: v.featuredOrder
            })).sort((a, b) => a.displayOrder - b.displayOrder),

            variantsDetails: res.productVariants.map(v => ({
                id: v.id,
                recordStatus: v.recordStatus.name,
                sku: v.sku,
                stockQuantity: v.stockQuantity,
                minStock: v.minStock,
                price: v.price as any,
                discount: v.discount as any,
                isMainVariant: v.isMainVariant,
                displayOrder: v.displayOrder,
                isUnique: v.isUnique,
                tags: v.tags,

                attributesDetails: catgAttrs!.filter(v=>!v.attributeDefinition.toProduct).map(ct => ({
                    categoryAttributeId: ct.id,
                    isFilter: ct.isFilter,
                    isRequired: ct.isRequired,
                    displayOrder: ct.displayOrder,
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
                    url: v.mediaFile.filePath,
                    isPrimary: v.isPrimary,
                    displayOrder: v.displayOrder,
                    isFeatured: v.isFeatured,
                    featuredOrder: v.featuredOrder
                })).sort((a, b) => a.displayOrder - b.displayOrder)

            })).sort((a, b) => a.displayOrder - b.displayOrder)
        });
    });
}


const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};