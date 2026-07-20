"use server";
import prisma from "@/lib/prisma"
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";

interface Props {
    id: number
}

export const categoryHasReferences = async ({ id }: Props) => {
    return PromiseReturn(async () => {

        const resAsync = prisma.category.findFirst({
            where: { parentId: id },
            select: { id: true },
            take: 1
        })

        const res1Async = prisma.productCategory.findFirst({
            where: { categoryId: id },
            select: { categoryId: true },
            take: 1
        });

        const res2Async = prisma.categoryAttribute.findFirst({
            where: { categoryId: id },
            select: { categoryId: true },
            take: 1
        });

        const res3Async = prisma.promotion.findFirst({
            where: { categoryId: id },
            select: { categoryId: true },
            take: 1
        });

        const [childCategory, productCategory, categoryAttribute, promotion] =
            await Promise.all([
                resAsync,
                res1Async,
                res2Async,
                res3Async
            ]);

        if (childCategory) {
            return ApiResponse.success(
                "La categoría tiene subcategorías asociadas",
                { hasReferences: true }
            );
        }

        if (productCategory) {
            return ApiResponse.success(
                "La categoría está asociada a uno o más productos",
                { hasReferences: true }
            );
        }

        if (categoryAttribute) {
            return ApiResponse.success(
                "La categoría tiene atributos asociados",
                { hasReferences: true }
            );
        }

        if (promotion) {
            return ApiResponse.success(
                "La categoría está asociada a una promoción",
                { hasReferences: true }
            );
        }

        return ApiResponse.success(
            "La categoría no tiene referencias asociadas",
            { hasReferences: false }
        );
    })
}