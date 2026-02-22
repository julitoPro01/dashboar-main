"use server";

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/utils";

interface Props {
    categoryId: number;
    attributeDefinitionId: number;
    isRequired: boolean;
    isFilter: boolean;
    displayOrder?: number;
}

export const addCategoryAttr = async (data: Props[]) => {

    return PromiseReturn(async () => {

        const res = await prisma.$transaction(
            data.map(item =>
                prisma.categoryAttribute.create({
                    data: item
                })
            )
        );

        return ApiResponse.success("Atributos de categoría agregados correctamente.", res)
    })
}