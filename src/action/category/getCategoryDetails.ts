"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { type CategoryDetailsResponse } from "@/src/features/category/types";


export const getCategoryDetails = async (publicId: string) => {

    return PromiseReturn<CategoryDetailsResponse>(async () => {

        const parse = schema.safeParse({ publicId })
        if (!parse.success)
            return ApiResponse.notFound();

        const res = await prisma.category.findFirst({
            where: { publicId: parse.data?.publicId },
            select: {
                id: true,
                name: true,
                description: true,
                slug: true,
                imageUrl: true,
                level: true,
                recordStatus: { select: { name: true } },
                path: true,
                createdAt: true,
                updatedAt: true,

                categoryAttributes: {
                    select: {
                        id: true,
                        isRequired: true,
                        isFilter: true,
                        displayOrder: true,
                        isVariant: true,
                        attributeDefinition: { select: { name: true } }
                    }
                },

                _count: {
                    select: {
                        children: true,
                        productCategories: true,
                        categoryAttributes: true,

                    },
                }
            }
        });

        if (!res)
            return ApiResponse.notFound();
        // /123/324/323/
        const match = res.path.match(/^\/[^\/]+\//);
        const path = match ? match[0] : "";

        const paths = await prisma.category.findMany({
            where: { path: { startsWith: path } },
            select: { name: true, id: true, level: true }
        });

        const mapped: CategoryDetailsResponse = {
            ...res,
            paths: paths.sort((a, b) => a.level - b.level).map(v => ({ name: v.name, id: v.id })),
            recordStatus: res.recordStatus.name,
            attributes: res.categoryAttributes.map(v => ({ ...v, name: v.attributeDefinition.name })).sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)),
            productsCount: res._count.productCategories,
            childCategoriesCount: res._count.children,
            attributeCount: res.categoryAttributes.length,
            // requiredAttributesCount: res.categoryAttributes.filter(v => v.isRequired).length,
            // filterAttributesCount: res.categoryAttributes.filter(v => v.isFilter).length,
            // variantAttributesCount: res.categoryAttributes.filter(v => v.isVariant).length,
            // productAttributesCount:res.categoryAttributes.filter(v=>!v.isVariant).length
        }

        return ApiResponse.success("Categoría obtenida correctamente.", mapped);

    })
};


const schema = z.object({
    publicId: z.uuid()
})