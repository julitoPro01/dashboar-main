"use server"

import prisma from "@/lib/prisma"
import { CategoryUpdateSchema } from "./schema/UpsertCategorySchema"
import { ApiResponse, PromiseReturn } from "@/src/shared/utils"
import { RECORD_STATUS_ID } from "@/src/shared/domains/status";


export interface UpdateCategory {
    id: number;

    name?: string;
    slug?: string;
    description?: string | null;
    recordStatusId?: number;
    imageUrl?: string | null;

    updatedBy: string, updatedById: number
}

export const updateCategory = async (data: UpdateCategory,) => {

    return PromiseReturn(async () => {
        const { id, ...parse } = CategoryUpdateSchema.parse(data);

        const res = await prisma.category.update({
            where: { id },
            data: { ...parse },
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
                data: { recordStatusId: parse.recordStatusId, updatedBy: parse.updatedBy, updatedById: parse.updatedById }
            })

        return ApiResponse.success("Categoría actualizado correctamente.", res)
    })
}
