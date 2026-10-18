"use server";

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { z } from "zod";

const setMainVariantSchema = z.object({
    productId: z.number().int().positive(),
    variantId: z.number().int().positive(),
}).strict();

export type SetMainVariantPayload = z.infer<typeof setMainVariantSchema>;

export const setMainVariant = async (input: SetMainVariantPayload) => {
    
    return PromiseReturn(async () => {
        const { productId, variantId } = setMainVariantSchema.parse(input);

        const variant = await prisma.productVariant.findFirst({
            where: { id: variantId, productId },
            select: { id: true, isMainVariant: true },
        });

        if (!variant) {
            return ApiResponse.badRequest("La variante seleccionada no pertenece a este producto.", "VALIDATION");
        }

        if (variant.isMainVariant) {
            return ApiResponse.success("Esta variante ya es la principal.");
        }

        await prisma.$transaction(async tx => {
            await tx.productVariant.updateMany({
                where: { productId, isMainVariant: true },
                data: { isMainVariant: false },
            });

            await tx.productVariant.update({
                where: { id: variantId },
                data: { isMainVariant: true },
            });
        });

        return ApiResponse.success("Variante principal actualizada.");
    });
};
