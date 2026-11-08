"use server";

import prisma from "@/lib/prisma";
import { RECORD_STATUS_ID } from "@/src/shared/domains/recordStatus";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { z } from "zod";
import { getAuthenticatedActor } from "../../auth/getAuthenticatedActor";
import { validateVariantActivation } from "./validateVariantActivation";

const publishVariantSchema = z.object({
    productId: z.number().int().positive(),
    variantId: z.number().int().positive(),
}).strict();

export type PublishVariantPayload = z.infer<typeof publishVariantSchema>;

export const publishVariant = async (input: PublishVariantPayload) => PromiseReturn(async () => {
    const { productId, variantId } = publishVariantSchema.parse(input);
    const actor = await getAuthenticatedActor();

    if (!actor) return ApiResponse.unauthorized("Inicia sesión para publicar la variante.");

    return prisma.$transaction(async (tx) => {
        const variant = await tx.productVariant.findFirst({
            where: { id: variantId, productId, deletedAt: null },
            select: { id: true, recordStatusId: true, isMainVariant: true },
        });

        if (!variant || variant.recordStatusId === RECORD_STATUS_ID.DELETED) {
            return ApiResponse.notFound("No se encontró la variante seleccionada.");
        }

        if (![RECORD_STATUS_ID.DRAFT, RECORD_STATUS_ID.INACTIVE].includes(variant.recordStatusId)) {
            return ApiResponse.badRequest("Esta variante no se puede publicar desde su estado actual.", "VALIDATION");
        }

        const validationMessage = await validateVariantActivation(tx, productId, variantId);
        if (validationMessage) return ApiResponse.badRequest(validationMessage, "VALIDATION");

        const activeSiblingCount = await tx.productVariant.count({
            where: {
                productId,
                id: { not: variant.id },
                deletedAt: null,
                recordStatusId: RECORD_STATUS_ID.ACTIVE,
            },
        });
        const becomesMainVariant = activeSiblingCount === 0;

        await tx.productVariant.update({
            where: { id: variant.id },
            data: {
                recordStatusId: RECORD_STATUS_ID.ACTIVE,
                isMainVariant: becomesMainVariant,
                updatedBy: actor.name,
                updatedById: actor.id,
                displayOrder: activeSiblingCount + 1
            },
        });

        return ApiResponse.success("La variante se publicó correctamente.", {
            id: variant.id,
            isMainVariant: becomesMainVariant,
        });
    });
});
