"use server";

import prisma from "@/lib/prisma";
import { CategoriesResponse } from "@/src/interfaces/category";
import { ApiResponse, PromiseReturn } from "@/src/utils"

interface Props  { mains?: true, typeProductCategory?: true }

export const getCategories = async ({ mains,typeProductCategory }: Props) => {



    return PromiseReturn<CategoriesResponse>(async () => {


        const res = await prisma.category.findMany({

            where: {
                ...(mains && { parentId: null }),
                ...(typeProductCategory && { isProductCategory: true })
            },
            select: {
                id: true,
                name: true,
                description: true,
                recordStatusId:true,                
                slug: true,
                imageUrl: true,
                parentId: true,
                isProductCategory: true,
            }
        });

        return ApiResponse.success("Lista de categoias obtenidos correctamente.", res);

    })
};