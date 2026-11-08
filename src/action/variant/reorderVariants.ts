"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@/src/generated/prisma/client";
import { RECORD_STATUS_ID } from "@/src/shared/domains/recordStatus";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { z } from "zod";

const reorderVariantsSchema = z.object({
    productId: z.number().int().positive(),
    variants: z.array(z.object({
        id: z.number().int().positive(),
    }).strict()).min(1),
}).strict().superRefine(({ variants }, ctx) => {
    const ids = new Set(variants.map(variant => variant.id));

    if (ids.size !== variants.length) {
        ctx.addIssue({ code: "custom", message: "La lista contiene variantes duplicadas." });
    }

});

export type ReorderVariantsPayload = z.infer<typeof reorderVariantsSchema>;

export const reorderVariants = async (input: ReorderVariantsPayload) => {
    return PromiseReturn(async () => {

        const { productId, variants } = reorderVariantsSchema.parse(input);

        const variantIds = variants.map(variant => variant.id);

        const productVariants = await prisma.productVariant.findMany({
            where: { productId, recordStatusId: RECORD_STATUS_ID.ACTIVE },
            select: { id: true },
        });

        const productVariantIds = new Set(productVariants.map(variant => variant.id));
        if (
            productVariantIds.size !== variantIds.length ||
            variantIds.some(id => !productVariantIds.has(id))
        ) {
            return ApiResponse.badRequest("La lista de variantes no coincide con las variantes actuales del producto.", "VALIDATION");
        }

        await prisma.$transaction(async (tx) => {
            await reorderActiveVariants(tx, variantIds);
        });

        return ApiResponse.success("Orden de variantes actualizado");
    });
};


export const reorderActiveVariants = async (
    tx: Prisma.TransactionClient,
    ids: number[]
) => {
    await Promise.all(
        ids.map((id, index) =>
            tx.productVariant.update({
                where: {id},
                data: {
                    displayOrder: index + 1,
                },
            })
        )
    );
};