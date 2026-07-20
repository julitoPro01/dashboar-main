"use server"
import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { revalidateCategories } from "../category";


export const delCategoryAttrs = async ({ ids, updateIds }: { ids: number[], updateIds: number[] }) => {
    return PromiseReturn(async () => {

        // Invalidamos la ruta de cache, para traer datos frescos
        await revalidateCategories()

        await prisma.categoryAttribute.deleteMany({
            where: { attributeDefinitionId: { in: ids } }
        });

        if (ids.length) {

            await Promise.all(updateIds.map((id, i) =>
                prisma.categoryAttribute.updateMany({
                    where: {
                        attributeDefinitionId: id
                    },
                    data: {
                        displayOrder: i
                    }
                })
            ))
        }

        return ApiResponse.success("Se eliminó con éxito.")
    })
};