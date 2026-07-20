"use server";
import prisma from "@/lib/prisma";
import { sortCategoriesByParent } from "@/src/features/category/utils";
import { ProductFormDataResponse } from "@/src/features/products/types";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";

interface Props {
    publicId: string
}

export const getProductForm = async ({ publicId }: Props) => {
    return PromiseReturn<ProductFormDataResponse>(async () => {

        const res = await prisma.product.findUnique({
            where: { publicId },
            select: {
                id: true,
                name: true,
                supplierId: true,
                recordStatusId: true,
                shortDescription: true,
                longDescription: true,
                productCategories: {
                    where: { category: { isProductCategory: true } },
                    select: {
                        category: {

                            select: {
                                id: true,
                                name: true,
                                parentId: true
                            }
                        }
                    }
                },
                images: {
                    select: {
                        id: true,
                        fileId: true,
                        displayOrder: true,
                        isPrimary: true,
                        mediaFile: {
                            select: {
                                filePath: true,
                            }
                        }
                    }
                }
            }
        })

        if (!res)
            return ApiResponse.notFound();

        return ApiResponse.success("Consulta exitosa.", {
            ...res,
            images: res.images.map(v => ({
                id: v.id,
                imageUrl: v.mediaFile.filePath,
                fileId: v.fileId,
                displayOrder: v.displayOrder,
                isPrimary: v.isPrimary
            })),
            selectedCategories: sortCategoriesByParent(res.productCategories.map(v => ({
                id: v.category.id,
                name: v.category.name,
                parentId: v.category.parentId ?? undefined
            })))
        })
    });
}


