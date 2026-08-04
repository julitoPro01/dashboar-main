"use server";
import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { revalidateCategories } from "../category";
import { CategoryAttrDisplayGroupDb } from "@/src/features/attributes/category-attributes/types";

export type AddCategoryAttrs = {
    attributeDefinitionId: number;
    isRequired: boolean;
    isFilter: boolean;
    isVariant: boolean;
    displayGroup:CategoryAttrDisplayGroupDb;
}
interface Props {
    categoryId: number;
    data: AddCategoryAttrs[]
}
export const addCategoryAttrs = async ({ categoryId, data }: Props) => {


    return PromiseReturn(async () => {

        const category = await prisma.category.findUnique({ where: { id: categoryId }, select: { parentId: true } });

        if (!category)
            return ApiResponse.notFound("La categoría no existe")

        // Invalidamos la ruta de cache, para traer datos frescos
        await revalidateCategories()

        const order = await prisma.categoryAttribute.count({
            where: { categoryId }
        })

        await prisma.categoryAttribute.createMany({
            data: data.map((v, i) => ({ ...v, categoryId, displayOrder: order + (i+1) }))
        });

        return ApiResponse.created("creado correctamente")
    });
};