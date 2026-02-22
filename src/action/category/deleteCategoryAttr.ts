"use server";
import prisma from "@/lib/prisma"
import { ApiResponse, PromiseReturn } from "@/src/utils"



export const deleteCategoryAttr = async (ids: number[]) => {
    return PromiseReturn(async () => {

        await prisma.$transaction(ids.map(id => prisma.categoryAttribute.delete({
            where: { id }
        })));

        return ApiResponse.success("Atributos de categoría eliminados correctamente.")
    })
}