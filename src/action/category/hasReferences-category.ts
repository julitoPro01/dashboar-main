"use server";
import prisma from "@/lib/prisma"
import { ApiResponse, PromiseReturn } from "@/src/utils"

interface Props {
    id: number
}

export const hasReferencesCategory = async ({ id }: Props) => {
    return PromiseReturn(async () => {

        const resAsync = prisma.category.findFirst({
            where: { parentId: id },
            select: { id: true },
            take: 1
        })

        const res1Async = prisma.productCategory.findFirst({
            where: { categoryId:id },
            select: { categoryId: true },
            take: 1
        });

        const res2Async = prisma.categoryAttribute.findFirst({
            where: { categoryId:id },
            select: { categoryId: true },
            take: 1
        });

        const res3Async = prisma.promotion.findFirst({
            where: { categoryId:id },
            select: { categoryId: true },
            take: 1
        });

        const [res, res1, res2, res3] = await Promise.all([
            resAsync, res1Async, res2Async, res3Async
        ])

        const hasReferences =
            !!res ||
            !!res1 ||
            !!res2 ||
            !!res3;

        const msg = hasReferences
            ? "La categoría tiene referencias asociadas"
            : "La categoría no tiene referencias"

        return ApiResponse.success(
            msg, {
            hasReferences
        })
    })
}