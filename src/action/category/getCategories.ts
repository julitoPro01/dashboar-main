"use server";

import prisma from "@/lib/prisma";
import { CategoryResponse } from "@/src/features/category/types";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";

interface Props { mains?: true, typeProductCategory?: true, isDesc?: boolean }

export const getCategories = async ({ mains, typeProductCategory, isDesc = false }: Props) => {



    return PromiseReturn(async () => {


        const res = await prisma.category.findMany({

            where: {
                ...(mains && { parentId: null }),
                ...(typeProductCategory && { isProductCategory: true })
            },
            select: {
                id: true,
                publicId: true,
                name: true,
                recordStatus: { select: { name: true } },
                imageUrl: true,
                parentId: true,
                level: true,
                path: true,
                _count: {
                    select: {
                        children: true,
                        categoryAttributes: true
                    }
                }
            }
        });



        return ApiResponse.success("Lista de categoias obtenidos correctamente.",
            res.map<CategoryResponse>(v => ({
                ...v,
                recordStatus: v.recordStatus.name,
                hasChildren: v._count.children > 0,
                hasAttributes: v._count.categoryAttributes > 0
            })).sort((a, b) => {
                return isDesc
                    ? b.recordStatus.localeCompare(a.recordStatus, "es", { sensitivity: "base", numeric: true })
                    : a.recordStatus.localeCompare(b.recordStatus, "es", { sensitivity: "base", numeric: true });
            })
        );

    })
};