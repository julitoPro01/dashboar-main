"use server";

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { getAuthenticatedActor } from "../auth/getAuthenticatedActor";
import { z } from "zod";

const restockVariantStockSchema = z.object({
    productId: z.number().int().positive(),
    variantId: z.number().int().positive(),
    quantity: z.number().int().positive().max(1_000_000),
    minStock: z.number().int().min(0).max(100_000).nullable(),
    reason: z.string().trim().max(500).optional(),
}).strict();

export type RestockVariantStockPayload = z.infer<typeof restockVariantStockSchema>;

export const restockVariantStock = async (input: RestockVariantStockPayload) => {
    return PromiseReturn(async () => {
        const { productId, variantId, quantity, minStock, reason } = restockVariantStockSchema.parse(input);

        const actor = await getAuthenticatedActor();

        if (!actor) {
            return ApiResponse.unauthorized("Inicia sesión para reponer el inventario.");
        }

        return prisma.$transaction(async (tx) => {
            const variant = await tx.productVariant.findFirst({
                where: { id: variantId, productId },
                select: { id: true, stockQuantity: true, minStock: true, inventoryPolicy: true },
            });

            if (!variant) {
                return ApiResponse.badRequest("La variante seleccionada no pertenece a este producto.", "VALIDATION");
            }

            if (variant.inventoryPolicy !== "AUTO_DECREMENT") {
                return ApiResponse.badRequest("Solo se puede reponer variantes con inventario controlado.", "VALIDATION");
            }

            const newStock = variant.stockQuantity + quantity;
            if (newStock > 1_000_000) {
                return ApiResponse.badRequest("El stock total no puede superar 1,000,000 unidades.", "VALIDATION");
            }

            const update = await tx.productVariant.updateMany({
                where: {
                    id: variantId,
                    productId,
                    stockQuantity: variant.stockQuantity,
                    minStock: variant.minStock,
                },
                data: {
                    stockQuantity: newStock,
                    minStock,
                    inventoryStatus: "IN_STOCK",
                    updatedBy: actor.name ,
                    updatedById: actor.id,
                },
            });

            if (update.count !== 1) {
                return ApiResponse.conflict("El inventario cambió mientras realizabas la reposición. Actualiza la lista e inténtalo de nuevo.");
            }

            await tx.stockMovement.create({
                data: {
                    variantId,
                    type: "IN",
                    quantity,
                    reason: reason || null,
                    createdBy: actor.name,
                    createdById: actor.id,
                },
            });

            return ApiResponse.success("Inventario repuesto correctamente.", {
                previousStock: variant.stockQuantity,
                newStock,
                quantity,
                minStock,
            });
        });
    });
};
