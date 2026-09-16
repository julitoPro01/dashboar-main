"use server"
import prisma from "@/lib/prisma";
import { buildCategoryTrees } from "@/src/features/category/shared/utils";
import { CategoryTreeFilters, CategoryTreeResponse } from "@/src/features/category/types";
import { Prisma } from "@/src/generated/prisma/client";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";


export const getCategoryTrees = async (props?: CategoryTreeFilters ) => {

    const filter: Prisma.CategoryWhereInput[] = [];

    if (props?.path)
        filter.push({ path: { startsWith: props.path } })
    if (props?.inStatus)
        filter.push({ recordStatus: { name: { in: props.inStatus } } })
    else if (props?.notInStatus)
        filter.push({ recordStatus: { name: { notIn: props.notInStatus } } })


    return PromiseReturn(async () => {

        const res = await prisma.category.findMany({
            where: { AND: filter },
            select: {
                id: true,
                publicId: true,
                name: true,
                recordStatus: { select: { name: true } },
                parentId: true,
                path: true,
                level: true,
                _count: { select: { categoryAttributes: true } }
            },
            orderBy: { level: "asc" }
        });

        const treeCatgs = buildCategoryTrees(res);
;

        return ApiResponse.success<CategoryTreeResponse[]>("Consulta exitosa.", treeCatgs)

    });

}
