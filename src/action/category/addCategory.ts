"use server"

import prisma from "@/lib/prisma"
import { CategoryBase, UpsertCategory } from "@/src/interfaces/category"
import { ApiResponse, PromiseReturn } from "@/src/utils"
import { CategoryCreateSchema } from "./schema/UpsertCategorySchema"

interface Audi {
    createdBy:string;
    createdById:number;
}

export const addCategory = async (data: UpsertCategory,{createdBy,createdById}:Audi) => {

    return PromiseReturn<CategoryBase>(async () => {

        const parse = CategoryCreateSchema.parse(data);

        const res = await prisma.category.create({
            data: {
                name: parse.name,
                description: parse.description ?? null,
                recordStatudId: parse.recordStatudId,
                slug: parse.slug,
                imageUrl: parse.imageUrl ?? null,
                parentId: parse.parentId ?? null,
                isProductCategory: parse.isProductCategory,
                createdBy:createdBy,
                createdById:createdById
            },
            select: {
                id: true,
                name: true,
                description: true,
                recordStatudId: true,
                slug: true,
                imageUrl: true,
                parentId: true,
                isProductCategory: true,
            }
        })

        return ApiResponse.success("Categoría creado correctamente.", res)
    })
}