"use server";

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/utils";

import { CategoryAttributeWhereInput } from "@/src/generated/prisma/models";
import { CategoryAttributesResponse } from "@/src/interfaces/category";


interface Props {

    categoryId?: number;
    from?: "product" | "variant"
}

export const getCategoryAttrs = async (filter: Props) => {

    const where: CategoryAttributeWhereInput = filter ? {
        ...(filter.categoryId ? { categoryId: filter.categoryId } : {}),
        ...(filter.from ? { attributeDefinition: { toProduct: filter.from === "product" ? true : false } } : {})
    } : {}

    return PromiseReturn<CategoryAttributesResponse>(async () => {

        const res = await prisma.categoryAttribute.findMany({
            where: where,
            select: {
                attributeDefinition: {
                    select: { name: true, toProduct: true }
                },
                id: true,
                categoryId: true,
                attributeDefinitionId: true,
                isFilter: true,
                isRequired: true,
                displayOrder: true
            }
        })

        return ApiResponse.success("Listado de atributos de categoría obtenidos correctamente.",
            res)
    })
}