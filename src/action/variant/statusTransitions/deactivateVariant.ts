"use server";

import prisma from "@/lib/prisma";
import { RECORD_STATUS_ID } from "@/src/shared/domains/recordStatus";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { z } from "zod";
import { getAuthenticatedActor } from "../../auth";
import { reorderActiveVariants } from "../reorderVariants";

const deactivateVariantSchema = z.object({
    productId: z.number().int().positive(),
    variantId: z.number().int().positive(),
}).strict();

export type DeactivateVariantPayload = z.infer<typeof deactivateVariantSchema>;

export const deactivateVariant = async (input: DeactivateVariantPayload) => PromiseReturn(async () => {
    const { productId, variantId } = deactivateVariantSchema.parse(input);
    const actor = await getAuthenticatedActor();

    if (!actor) return ApiResponse.unauthorized("Inicia sesión para desactivar la variante.");

    return prisma.$transaction(async (tx) => {
        const variant = await tx.productVariant.findFirst({
            where: {
                id: variantId,
                productId,
                deletedAt: null,
            },
            select: {
                id: true,
                sku: true,
                isMainVariant: true,
                recordStatusId: true,
            },
        });

        if (!variant || variant.recordStatusId === RECORD_STATUS_ID.DELETED) {
            return ApiResponse.notFound("No se encontró la variante seleccionada.");
        }

        if (variant.recordStatusId !== RECORD_STATUS_ID.ACTIVE) {
            return ApiResponse.badRequest("Solo puedes desactivar una variante activa.", "VALIDATION");
        }

        const activeSibling = await tx.productVariant.findMany({
            where: {
                productId,
                id: { not: variant.id },
                deletedAt: null,
                recordStatusId: RECORD_STATUS_ID.ACTIVE,
            },
            orderBy: [{ displayOrder: "asc" }, { id: "asc" }],
        });

        const activeSiblingCount=activeSibling.length;

        if (variant.isMainVariant && activeSiblingCount > 0) {
            return ApiResponse.badRequest(
                "Antes de desactivar esta variante, establece otra variante activa como principal.",
                "VALIDATION",
            );
        }

        await tx.productVariant.update({
            where: { id: variant.id },
            data: {
                recordStatusId: RECORD_STATUS_ID.INACTIVE,
                isMainVariant: activeSiblingCount === 0 ? false : variant.isMainVariant,
                updatedBy: actor.name,
                updatedById: actor.id,
                displayOrder: 0
            },
        });

        await reorderActiveVariants(tx, activeSibling.map(v => v.id));


        if (activeSiblingCount === 0) {
            await tx.product.updateMany({
                where: { id: productId, recordStatusId: RECORD_STATUS_ID.ACTIVE },
                data: {
                    recordStatusId: RECORD_STATUS_ID.INACTIVE,
                    inactiveReason: "NO_ACTIVE_VARIANTS",
                    updatedBy: actor.name,
                    updatedById: actor.id,
                },
            });
        }

        return ApiResponse.success("La variante se desactivó correctamente.", { id: variant.id });
    });
});
