"use server"

import prisma from "@/lib/prisma"
import { categoryCreateSchema } from "./schema/UpsertCategorySchema"
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";

export interface CreateCategoryPayload {
    name: string;
    description?: string | null;
    recordStatusId: number;
    slug: string;
    imageUrl?: string | null;

    parentId?: number | null;
    parentPath?: string;
    parentLevel?: number;

    createdBy: string;
    createdById: number;
}

export const createCategory = async (data: CreateCategoryPayload) => {

    return PromiseReturn(async () => {

        const parse = categoryCreateSchema.parse(data);

        const exist = await prisma.category.findFirst({
            where: { name: { contains: parse.name, mode: "insensitive" }, parentId: parse.parentId }
        })

        if (exist)
            return ApiResponse.conflict("La categoría ya existe")

        const level = typeof parse.parentLevel === "number" ? parse.parentLevel + 1 : 0;


        const create = await prisma.category.create({
            data: {
                name: parse.name,
                description: parse.description ?? null,
                recordStatusId: parse.recordStatusId,
                slug: parse.slug,
                imageUrl: parse.imageUrl ?? null,
                parentId: parse.parentId ?? null,
                path: "",
                level,
                createdBy: parse.createdBy,
                createdById: parse.createdById
            },
            select: { id: true }
        });


        const res = await prisma.category.update({
            where: { id: create.id },
            data: { path: !parse.parentPath ? `/${create.id}/` : `${parse.parentPath}${create.id}/` },
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