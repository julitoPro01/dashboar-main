"use server";

import prisma from "@/lib/prisma";
import { RECORD_STATUS_ID } from "@/src/shared/domains/recordStatus";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { z } from "zod";
import { getAuthenticatedActor } from "../../auth";

const restoreArchivedVariantSchema = z.object({
    productId: z.number().int().positive(),
    variantId: z.number().int().positive(),
}).strict();

export type RestoreArchivedVariantPayload = z.infer<typeof restoreArchivedVariantSchema>;

export const restoreArchivedVariant = async (input: RestoreArchivedVariantPayload) => PromiseReturn(async () => {
    const { productId, variantId } = restoreArchivedVariantSchema.parse(input);
    const actor = await getAuthenticatedActor();

    if (!actor) return ApiResponse.unauthorized("Inicia sesión para restaurar la variante.");

    return prisma.$transaction(async (tx) => {
        const variant = await tx.productVariant.findFirst({
            where: { id: variantId, productId, deletedAt: null },
            select: { id: true, recordStatusId: true },
        });

        if (!variant || variant.recordStatusId === RECORD_STATUS_ID.DELETED) {
            return ApiResponse.notFound("No se encontró la variante seleccionada.");
        }

        if (variant.recordStatusId !== RECORD_STATUS_ID.ARCHIVED) {
            return ApiResponse.badRequest("Solo puedes restaurar una variante archivada.", "VALIDATION");
        }

        const product = await tx.product.findUnique({
            where: { id: productId },
            select: { recordStatusId: true },
        });

        if (!product || product.recordStatusId === RECORD_STATUS_ID.DELETED) {
            return ApiResponse.badRequest("No puedes restaurar esta variante porque su producto base fue eliminado.", "VALIDATION");
        }

        await tx.productVariant.update({
            where: { id: variant.id },
            data: {
                recordStatusId: RECORD_STATUS_ID.INACTIVE,
                isMainVariant: false,
                updatedBy: actor.name,
                updatedById: actor.id,
            },
        });

        return ApiResponse.success("La variante se restauró como inactiva para que puedas revisarla antes de activarla.", {
            id: variant.id,
        });
    });
});
