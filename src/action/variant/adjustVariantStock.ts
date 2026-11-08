"use server";

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { getAuthenticatedActor } from "../auth/getAuthenticatedActor";
import { z } from "zod";

const adjustVariantStockSchema = z.object({
    productId: z.number().int().positive(),
    variantId: z.number().int().positive(),
    newStock: z.number().int().min(0).max(1_000_000),
    reason: z.string().trim().min(3).max(500),
}).strict();

export type AdjustVariantStockPayload = z.infer<typeof adjustVariantStockSchema>;

export const adjustVariantStock = async (input: AdjustVariantStockPayload) => {
    return PromiseReturn(async () => {
        const { productId, variantId, newStock, reason } = adjustVariantStockSchema.parse(input);
        const actor = await getAuthenticatedActor();

        if (!actor) {
            return ApiResponse.unauthorized("Inicia sesión para ajustar el inventario.");
        }

        return prisma.$transaction(async tx => {
            const variant = await tx.productVariant.findFirst({
                where: { id: variantId, productId },
                select: { id: true, stockQuantity: true, inventoryPolicy: true },
            });

            if (!variant) {
                return ApiResponse.badRequest("La variante seleccionada no pertenece a este producto.", "VALIDATION");
            }

            if (variant.inventoryPolicy !== "AUTO_DECREMENT") {
                return ApiResponse.badRequest("Solo se puede ajustar el stock de variantes con inventario controlado.", "VALIDATION");
            }

            const difference = newStock - variant.stockQuantity;
            if (difference === 0) {
                return ApiResponse.success("El conteo coincide con el stock actual; no se registraron cambios.", {
                    previousStock: variant.stockQuantity,
                    newStock,
                    difference,
                });
            }

            const update = await tx.productVariant.updateMany({
                where: { id: variantId, productId, stockQuantity: variant.stockQuantity },
                data: {
                    stockQuantity: newStock,
                    inventoryStatus: newStock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
                    updatedBy: actor.name ?? "Usuario",
                    updatedById: actor.id,
                },
            });

            if (update.count !== 1) {
                return ApiResponse.conflict("El stock cambió mientras realizabas el ajuste. Actualiza la lista e inténtalo de nuevo.");
            }

            await tx.stockMovement.create({
                data: {
                    variantId,
                    type: "ADJUSTMENT",
                    quantity: difference,
                    reason,
                    createdBy: actor.name  ?? "Usuario",
                    createdById: actor.id,
                },
            });

            return ApiResponse.success("Inventario ajustado correctamente.", {
                previousStock: variant.stockQuantity,
                newStock,
                difference,
            });
        });
    });
};
