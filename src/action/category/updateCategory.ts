"use server"

import prisma from "@/lib/prisma"
import { CategoryUpdateSchema } from "./schema/UpsertCategorySchema"
import { ApiResponse, PromiseReturn } from "@/src/shared/utils"
import { RECORD_STATUS_ID } from "@/src/shared/domains/status";


export interface UpdateCategory {
    name?: string;
    slug?: string;
    description?: string;
    recordStatusId?: number;
    imageUrl?: string;
}

export const updateCategory = async (id: number, data: UpdateCategory, audi: { updateBy: string, updateById: number }) => {

    return PromiseReturn(async () => {
        const parse = CategoryUpdateSchema.parse(data);

        const res = await prisma.category.update({
            where: { id },
            data: { ...parse, updatedBy: audi.updateBy, updatedById: audi.updateById },
            select: {
                id: true,
                name: true,
                description: true,
                recordStatus: { select: { name: true } },
                slug: true,
                imageUrl: true,
                parentId: true,
                path: true
            }
        });

        if (RECORD_STATUS_ID.DELETED === parse.recordStatusId || RECORD_STATUS_ID.ARCHIVED === parse.recordStatusId)
            await prisma.category.updateMany({
                where: { path: { startsWith: res.path } },
                data: { recordStatusId: parse.recordStatusId, updatedBy: audi.updateBy, updatedById: audi.updateById }
            })

        return ApiResponse.success("Categoría actualizado correctamente.", res)
    })
}
