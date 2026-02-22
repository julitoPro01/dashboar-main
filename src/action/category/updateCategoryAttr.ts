"use server";

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/utils";

interface Props {
    id:number;
    categoryId: number;
    attributeDefinitionId: number;
    isRequired: boolean;
    isFilter: boolean;
    displayOrder?: number;
}

export const updateCategoryAttr = async (data: Props[]) => {

    return PromiseReturn(async () => {

        const res = await prisma.$transaction(data.map(({id,...rest})=>prisma.categoryAttribute.update({
            where:{id},
            data:rest
        })));


        return ApiResponse.success("Atributos de categoría actualizados correctamente.", res)
    })
}