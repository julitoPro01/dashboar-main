"use server"
import prisma from "@/lib/prisma";
import { buildCategoryTrees } from "@/src/features/category/utils";
import { Prisma } from "@/src/generated/prisma/client";
import { CategoryTreeResponse } from "@/src/shared/category";
import { RecordStatusDb } from "@/src/shared/domains/status";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";

interface Props {
    path?: string;
    notInStatus?: RecordStatusDb[];
    inStatus?: RecordStatusDb[];
}

export const getCategoryTrees = async (props?: Props) => {

    const filter: Prisma.CategoryWhereInput[] = [];

    if (props?.path)
        filter.push({ path: { startsWith: props.path } })
    if (props?.inStatus)
        filter.push({ recordStatus: { name: { in: props.inStatus } } })
    else if (props?.notInStatus)
        filter.push({ recordStatus: { name: { notIn: props.notInStatus } } })


    return PromiseReturn<CategoryTreeResponse[]>(async () => {

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

        const treeCatgs = buildCategoryTrees<CategoryTreeResponse>(res);


        return ApiResponse.success("Consulta exitosa.", treeCatgs)

    });

}
