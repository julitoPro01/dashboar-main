"use server"

import prisma from "@/lib/prisma"
import { CategoryCreateSchema } from "./schema/UpsertCategorySchema"
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { RECORD_STATUS_ID } from "@/src/shared/domains/status";

interface Data {
    name: string;
    description?: string | null;
    recordStatusId?: number;
    slug: string;
    imageUrl?: string | null;
    parentId?: number | null;
    path?: string;
    level: number;
    createdBy: string;
    createdById: number;
}

export const addCategory = async (data: Data) => {

    return PromiseReturn(async () => {

        const parse = CategoryCreateSchema.parse(data);

        const exist = await prisma.category.findFirst({
            where: { name: { contains: parse.name, mode: "insensitive" } }
        })

        if(exist)
            return ApiResponse.badRequest("La categoría ya existe")

        const create = await prisma.category.create({
            data: {
                name: parse.name,
                description: parse.description ?? null,
                recordStatusId: parse.recordStatudId ?? RECORD_STATUS_ID.DRAFT,
                slug: parse.slug,
                imageUrl: parse.imageUrl ?? null,
                parentId: parse.parentId ?? null,
                path: "",
                level: parse.level,
                createdBy: parse.createdBy,
                createdById: parse.createdById
            },
            select: { id: true }
        });


        const res = await prisma.category.update({
            where: { id: create.id },
            data: { path: !parse.path ? `/${create.id}/` : `${parse.path}${create.id}/` },
            select: {
                id: true,
                publicId: true,
                recordStatus: { select: { name: true } },
                name: true,
                parentId: true,
                level: true,
                path: true
            }
        })

        return ApiResponse.success("Categoría creado correctamente.", res);

    })
}