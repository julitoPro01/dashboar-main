"use server";

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { z } from "zod";

const reorderVariantsSchema = z.object({
    productId: z.number().int().positive(),
    variants: z.array(z.object({
        id: z.number().int().positive(),
        displayOrder: z.number().int().positive(),
    }).strict()).min(1),
}).strict().superRefine(({ variants }, ctx) => {
    const ids = new Set(variants.map(variant => variant.id));
    const orders = new Set(variants.map(variant => variant.displayOrder));

    if (ids.size !== variants.length) {
        ctx.addIssue({ code: "custom", message: "La lista contiene variantes duplicadas." });
    }

    if (orders.size !== variants.length || variants.some(variant => variant.displayOrder > variants.length)) {
        ctx.addIssue({ code: "custom", message: "El orden de las variantes debe ser consecutivo." });
    }
});

export type ReorderVariantsPayload = z.infer<typeof reorderVariantsSchema>;

export const reorderVariants = async (input: ReorderVariantsPayload) => {
    return PromiseReturn(async () => {
        const { productId, variants } = reorderVariantsSchema.parse(input);
        const variantIds = variants.map(variant => variant.id);

        const productVariants = await prisma.productVariant.findMany({
            where: { productId },
            select: { id: true },
        });

        const productVariantIds = new Set(productVariants.map(variant => variant.id));
        if (
            productVariantIds.size !== variantIds.length ||
            variantIds.some(id => !productVariantIds.has(id))
        ) {
            return ApiResponse.badRequest("La lista de variantes no coincide con las variantes actuales del producto.", "VALIDATION");
        }

        await prisma.$transaction(async tx => {
            for (const variant of variants) {
                await tx.productVariant.update({
                    where: { id: variant.id },
                    data: { displayOrder: variant.displayOrder },
                });
            }
        });

        return ApiResponse.success("Orden de variantes actualizado");
    });
};
