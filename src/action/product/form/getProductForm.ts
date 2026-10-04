"use server";
import prisma from "@/lib/prisma";
import { sortCategoriesByParent } from "@/src/features/category/shared/utils";
import { ProductFormDataResponse } from "@/src/features/products/types";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { longDescriptionSchema } from "./schema/upsertProduct";

interface Props {
    publicId: string
}

export const getProductForm = async ({ publicId }: Props) => {
    return PromiseReturn(async () => {

        const res = await prisma.product.findUnique({
            where: { publicId },
            select: {

                id: true,
                name: true,
                slug: true,
                shortDescription: true,
                longDescription: true,
                recordStatusId: true,

                supplier: {
                    select: { id: true, name: true, capabilities: true, relationMode: true }
                },

                category: {
                    select: {
                        id: true,
                        name: true,
                        path: true,
                    }
                },

                images: {
                    select: {
                        id: true,
                        displayOrder: true,
                        isPrimary: true,

                        mediaFile: {
                            select: {
                                id: true,
                                fileName: true,
                                filePath: true,
                                fileSize: true,
                                mimeType: true,
                                isPublic: true,
                                bucket: true
                            }
                        }
                    }
                },

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

        const longDescription = res.longDescription
            ? longDescriptionSchema.parse(res.longDescription)
            : null;

            return ApiResponse.success<ProductFormDataResponse>("Consulta exitosa.", {
            id: res.id,
            basicInfo: {
                name: res.name,
                shortDescription: res.shortDescription,
                slug: res.slug
            },
            longDescription,
            images: res.images.sort((a, b) => a.displayOrder - b.displayOrder),
            categorization: {
                category: {
                    ...res.category,
                    paths: buildTreePaths.map(v => ({
                        id: v.id,
                        name: v.name
                    }))
                },
            },
            supplier: res.supplier
        })
    });
}


