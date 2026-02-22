"use server"
import prisma from "@/lib/prisma";
import { categoryTreeBuilder } from "@/src/features/category";
import {  CategoryResponse, CategoryTreeResponse } from "@/src/interfaces/category";
import { ApiResponse, PromiseReturn } from "@/src/utils"

type Find = {
    typeProductCategory?: true
}

interface Props extends Find {
    q?: { withChildren: true };
    categoryId: number;
}

export const getCategory = async ({ q, categoryId, typeProductCategory }: Props) => {

    return PromiseReturn<CategoryTreeResponse>(async () => {

        const res = await prisma.category.findUnique({
            where: {
                id: categoryId,
                ...(typeProductCategory && { isProductCategory: true })
            },
            select: {
                id: true,
                name: true,
                description: true,
                recordStatusId: true,
                slug: true,
                imageUrl: true,
                parentId: true,
                isProductCategory: true
            }
        });

        if (res) {
            const catgs: CategoryResponse[] = [];
            catgs.push(res);

            if (q && q.withChildren) {
                await getAllChildren(res.id, catgs,{typeProductCategory});
            }

            const [treeCatgs] = categoryTreeBuilder(catgs);

            return ApiResponse.success("Consulta exitosa.", treeCatgs)
        }

        return ApiResponse.notFound("La categoría no existe o los parámetros no son válidos.")

    });

}


async function getAllChildren(parentId: number, acc: CategoryResponse[] = [], find: Find) {

    const { typeProductCategory } = find;

    const children = await prisma.category.findMany({
        where: { parentId: parentId, ...(typeProductCategory && { isProductCategory: true }) },
        select: {
            id: true,
            name: true,
            description: true,
            recordStatusId: true,
            slug: true,
            imageUrl: true,
            parentId: true,
            isProductCategory: true,
        }
    });

    if (children.length === 0) return acc;

    for (const c of children) {
        acc.push(c);
        await getAllChildren(c.id, acc, find); // recursión
    }

    return acc;
}