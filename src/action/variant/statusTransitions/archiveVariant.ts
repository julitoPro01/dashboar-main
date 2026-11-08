"use server";

import prisma from "@/lib/prisma";
import { RECORD_STATUS_ID } from "@/src/shared/domains/recordStatus";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { z } from "zod";
import { getAuthenticatedActor } from "../../auth";
import { reorderActiveVariants } from "../reorderVariants";

const archiveVariantSchema = z.object({
    productId: z.number().int().positive(),
    variantId: z.number().int().positive(),
}).strict();

export type ArchiveVariantPayload = z.infer<typeof archiveVariantSchema>;

export const archiveVariant = async (input: ArchiveVariantPayload) => PromiseReturn(async () => {
    const { productId, variantId } = archiveVariantSchema.parse(input);
    const actor = await getAuthenticatedActor();

    if (!actor) return ApiResponse.unauthorized("Inicia sesión para archivar la variante.");

    return prisma.$transaction(async (tx) => {
        const variant = await tx.productVariant.findFirst({
            where: {
                id: variantId,
                productId,
                deletedAt: null,
            },
            select: {
                id: true,
                isMainVariant: true,
                recordStatusId: true,
            },
        });

        if (!variant || variant.recordStatusId === RECORD_STATUS_ID.DELETED) {
            return ApiResponse.notFound("No se encontró la variante seleccionada.");
        }

        if (![RECORD_STATUS_ID.ACTIVE, RECORD_STATUS_ID.INACTIVE].includes(variant.recordStatusId)) {
            return ApiResponse.badRequest(
                "Solo puedes archivar variantes activas o inactivas.",
                "VALIDATION",
            );
        }

        const activeSibling = await tx.productVariant.findMany({
            where: {
                productId,
                id: { not: variant.id },
                deletedAt: null,
                recordStatusId: RECORD_STATUS_ID.ACTIVE,
            },
            orderBy: [{ displayOrder: "asc" }, { id: "asc" }],
            select:{id:true}
        });

        const activeSiblingCount = activeSibling.length


        if (variant.isMainVariant && activeSiblingCount > 0) {
            return ApiResponse.badRequest(
                "Antes de archivar esta variante, establece otra variante activa como principal.",
                "VALIDATION",
            );
        }

        await tx.productVariant.update({
            where: { id: variant.id },
            data: {
                recordStatusId: RECORD_STATUS_ID.ARCHIVED,
                isMainVariant: false,
                updatedBy: actor.name,
                updatedById: actor.id,
                displayOrder: 0
            },
        });

        await reorderActiveVariants(tx, activeSibling.map(v=>v.id));

        if (variant.recordStatusId === RECORD_STATUS_ID.ACTIVE && activeSiblingCount === 0) {
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

        return ApiResponse.success("La variante se archivó correctamente.", { id: variant.id });
    });
});
