"use server"

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils"
import { revalidateCategories } from "../category";
import { CategoryAttrDisplayGroupDb } from "@/src/features/attributes/category-attributes/types";

export type EditCategoryAttrs = {
    id: number;
    isRequired: boolean;
    isFilter: boolean;
    isVariant: boolean;
    displayOrder?: number | null;
    displayGroup:CategoryAttrDisplayGroupDb;
}

export const editCategoryAttrs = async (data: EditCategoryAttrs[]) => {

    return PromiseReturn(async () => {
        
        // Invalidamos la ruta de cache, para traer datos frescos
        await revalidateCategories()

        await Promise.all(
            data.map(item =>
                prisma.categoryAttribute.updateMany({
                    where: {
                        attributeDefinitionId: item.id
                    },

                    data: {
                        isRequired: item.isRequired,
                        isFilter: item.isFilter,
                        isVariant: item.isVariant,
                        displayOrder: item.displayOrder,
                        displayGroup:item.displayGroup
                    }
                })
            )
        )
        return ApiResponse.success("Editado correctamente");
    });

}