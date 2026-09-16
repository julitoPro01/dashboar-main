"use server";

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils"

type Props = { entity: "product" | "variant", id: number }

export const getCustomAttributes = async ({ id, entity }: Props) => {
    return PromiseReturn(async () => {

        if (entity === "product" && id) {

            const res = await prisma.productAttributeValue.findMany({
                where: { productId: id, attributeDefinitionId: null },
                select: {
                    id: true,
                    customName: true,
                    valueText: true
                }
            });

            return ApiResponse.success("", res);
        }

        else if (entity === "variant" && id) {
            const res = await prisma.variantAttributeValue.findMany({
                where: { variantId: id, attributeDefinitionId: null },
                select: {
                    id: true,
                    customName: true,
                    valueText: true
                }
            });

            return ApiResponse.success("", res);
        }

        return ApiResponse.success("", []);

    })
}