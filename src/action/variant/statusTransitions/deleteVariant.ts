"use server";

import prisma from "@/lib/prisma";
import type { Prisma } from "@/src/generated/prisma/client";
import { RECORD_STATUS_ID } from "@/src/shared/domains/recordStatus";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { getAuthenticatedActor } from "../../auth/getAuthenticatedActor";
import { reorderActiveVariants } from "../reorderVariants";
import { z } from "zod";

const deleteVariantSchema = z.object({
    productId: z.number().int().positive(),
    variantId: z.number().int().positive(),
}).strict();

export type DeleteVariantPayload = z.infer<typeof deleteVariantSchema>;

const findVariantForDeletion = async (
    tx: Prisma.TransactionClient,
    productId: number,
    variantId: number,
) => tx.productVariant.findFirst({
    where: { id: variantId, productId },
    select: {
        id: true,
        sku: true,
        isMainVariant: true,
        recordStatusId: true,
        images: { select: { fileId: true } },
        movies: { select: { fileId: true } },
        _count: {
            select: {
                supplierProducts: true,
                varianAttributesValue: true,
                cartItems: true,
                invoiceItems: true,
                orderItems: true,
                images: true,
                movies: true,
                variantChannel: true,
                reservations: true,
            },
        },
    },
});

const hasMainVariantSiblings = async (
    tx: Prisma.TransactionClient,
    productId: number,
    variantId: number,
) => (await tx.productVariant.count({
    where: {
        productId,
        id: { not: variantId },
        deletedAt: null,
        recordStatusId: RECORD_STATUS_ID.ACTIVE,
    },
})) > 0;

export const softDeleteVariant = async (input: DeleteVariantPayload) => PromiseReturn(async () => {
    const { productId, variantId } = deleteVariantSchema.parse(input);
    const actor = await getAuthenticatedActor();

    if (!actor) return ApiResponse.unauthorized("Inicia sesión para eliminar la variante.");

    return prisma.$transaction(async (tx) => {
        const variant = await findVariantForDeletion(tx, productId, variantId);

        if (!variant) return ApiResponse.notFound("No se encontró la variante seleccionada.");
        if (variant.recordStatusId === RECORD_STATUS_ID.DELETED) {
            return ApiResponse.badRequest("La variante ya está en eliminados.", "VALIDATION");
        }

        const hasMainSiblings = await hasMainVariantSiblings(tx, productId, variantId)
        if (variant.isMainVariant && hasMainSiblings) {
            return ApiResponse.badRequest(
                "Antes de eliminar esta variante, elige otra como principal para que el producto conserve su representación visual.",
                "VALIDATION",
            );
        }
        
        // Si la variante eliminada estaba activa y no quedan activas, desactivar el producto base.
        if (variant.recordStatusId === RECORD_STATUS_ID.ACTIVE && !hasMainSiblings)
            await tx.product.updateMany({
                where: { id: productId, recordStatusId: RECORD_STATUS_ID.ACTIVE },
                data: {
                    recordStatusId: RECORD_STATUS_ID.INACTIVE,
                    inactiveReason: "NO_ACTIVE_VARIANTS",
                    updatedBy: actor.name,
                    updatedById: actor.id,
                }
            })

        await tx.productVariant.update({
            where: { id: variantId },
            data: {
                recordStatusId: RECORD_STATUS_ID.DELETED,
                deletedAt: new Date(),
                updatedBy: actor.name,
                updatedById: actor.id,
                isMainVariant: false,
                displayOrder:0
            },
        });

        if (variant.recordStatusId === RECORD_STATUS_ID.ACTIVE) {
            const activeVariants = await tx.productVariant.findMany({
                where: {
                    productId,
                    recordStatusId: RECORD_STATUS_ID.ACTIVE,
                    deletedAt: null,
                },
                orderBy: [{ displayOrder: "asc" }, { id: "asc" }],
                select: { id: true },
            });

            await reorderActiveVariants(tx, activeVariants.map(({ id }) => id));
        }

        return ApiResponse.success("La variante se movió a eliminados.");
    });
});

export const permanentlyDeleteVariant = async (input: DeleteVariantPayload) => PromiseReturn(async () => {
    const { productId, variantId } = deleteVariantSchema.parse(input);
    const actor = await getAuthenticatedActor();

    if (!actor) return ApiResponse.unauthorized("Inicia sesión para eliminar la variante.");

    return prisma.$transaction(async (tx) => {
        const variant = await findVariantForDeletion(tx, productId, variantId);

        if (!variant) return ApiResponse.notFound("No se encontró la variante seleccionada.");


        const { _count } = variant;
        const referenceCount = Object.values(_count).reduce((total, count) => total + count, 0);
        const hasProtectedHistory = _count.orderItems + _count.invoiceItems > 0;
        const isDraft = variant.recordStatusId === RECORD_STATUS_ID.DRAFT;

        if (hasProtectedHistory || (!isDraft && referenceCount > 0)) {
            return ApiResponse.badRequest(
                hasProtectedHistory
                    ? "Esta variante aparece en pedidos o facturas y no se puede borrar definitivamente. Puedes moverla a eliminados para conservar su historial."
                    : "Esta variante todavía tiene información asociada. Muévela a eliminados para que deje de aparecer sin perder esos datos.",
                "ENTITY_IN_USE",
            );
        }

        const mediaFileIds = [...new Set([
            ...variant.images.map(({ fileId }) => fileId),
            ...variant.movies.map(({ fileId }) => fileId),
        ])];

        await tx.productVariant.delete({ where: { id: variantId } });

        for (const fileId of mediaFileIds) {
            const mediaFile = await tx.mediaFile.findUnique({
                where: { id: fileId },
                select: {
                    productImage: { select: { id: true } },
                    productMovie: { select: { id: true } },
                    reviewImage: { select: { id: true }, take: 1 },
                },
            });

            if (
                mediaFile
                && !mediaFile.productImage
                && !mediaFile.productMovie
                && mediaFile.reviewImage.length === 0
            ) {
                await tx.mediaFile.delete({ where: { id: fileId } });
            }
        }

        return ApiResponse.success("La variante se eliminó permanentemente.");
    });
});
