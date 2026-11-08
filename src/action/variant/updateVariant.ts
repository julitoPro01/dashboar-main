"use server";

import prisma from "@/lib/prisma";
import type { VariantAttributeValueCreateManyInput } from "@/src/generated/prisma/models";
import { RECORD_STATUS_ID } from "@/src/shared/domains/recordStatus";
import { parsePeruDateTime } from "@/src/shared/utils/date";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { getAuthenticatedActor } from "../auth";
import { z } from "zod";
import { updateVariantSchema } from "./upsertSchema";
import { deriveInventoryStatus, mapImagesToPayload } from "../shared/utils";

export type UpdateVariantPayload = z.infer<typeof updateVariantSchema>;

export const updateVariant = async (payload: UpdateVariantPayload) => PromiseReturn(async () => {

    const parse = updateVariantSchema.parse(payload);

    let discountStartsAt: Date | null | undefined;
    let discountEndsAt: Date | null | undefined;

    try {
        discountStartsAt = parse.discountStartsAt === undefined
            ? undefined
            : parsePeruDateTime(parse.discountStartsAt);
        discountEndsAt = parse.discountEndsAt === undefined
            ? undefined
            : parsePeruDateTime(parse.discountEndsAt);
    } catch {
        return ApiResponse.badRequest("Revisa las fechas y horas del descuento.", "VALIDATION");
    }

    if (
        discountStartsAt
        && discountEndsAt
        && discountStartsAt.getTime() >= discountEndsAt.getTime()
    ) {
        return ApiResponse.badRequest(
            "La fecha y hora de finalización debe ser posterior a la de inicio.",
            "VALIDATION",
        );
    }

    const actor = await getAuthenticatedActor();

    if (!actor) {
        return ApiResponse.unauthorized("Inicia sesión para actualizar la variante.");
    }

    if (parse.recordStatusId === RECORD_STATUS_ID.DELETED) {
        return ApiResponse.badRequest(
            "Usa la acción de eliminación para quitar una variante.",
            "VALIDATION",
        );
    }

    return prisma.$transaction(async (tx) => {
        const variant = await tx.productVariant.findFirst({
            where: {
                id: parse.id,
                productId: parse.productId,
                deletedAt: null,
                recordStatusId: { not: RECORD_STATUS_ID.DELETED },
            },
            select: { id: true, recordStatusId: true },
        });

        if (!variant) {
            return ApiResponse.badRequest(
                "No se encontró la variante dentro del producto seleccionado.",
                "VALIDATION",
            );
        }

        if (parse.recordStatusId !== undefined && parse.recordStatusId !== variant.recordStatusId) {
            return ApiResponse.badRequest(
                "Usa las acciones de estado del menú de la variante para cambiar su ciclo de vida.",
                "VALIDATION",
            );
        }
        const inventoryStatus = parse.inventoryPolicy
            ? deriveInventoryStatus(parse.stockQuantity ?? 0, parse.inventoryPolicy)
            : undefined


            await tx.productVariant.update({
                where: { id: variant.id },
                data: {
                    barcode: parse.barCode,
                    // tags: parse.tags,
                    recordStatusId: parse.recordStatusId,
                    inventoryStatus,
                    saleStatus: parse.saleStatus,
                    inventoryPolicy: parse.inventoryPolicy,
                    stockQuantity: parse.inventoryPolicy === "AUTO_DECREMENT" ? parse.stockQuantity : 0,
                    minStock: parse.inventoryPolicy === "AUTO_DECREMENT" ? parse.minStock : 0,
                    price: parse.price,
                    discount: parse.discount,
                    discountStartsAt,
                    discountEndsAt,
                    updatedBy: actor.name,
                    updatedById: actor.id,
                },
            });

        if (parse.images?.length) {

            await tx.mediaFile.deleteMany({
                where: { productImage: { variantId: variant.id } }
            })


            for (const { mediaFile, isPrimary, displayOrder } of mapImagesToPayload(parse.images)) {
                await tx.mediaFile.create({
                    data: {
                        fileName: mediaFile.fileName,
                        filePath: mediaFile.filePath,
                        mimeType: mediaFile.mimeType,
                        fileSize: mediaFile.fileSize,
                        productImage: {
                            create: {
                                variantId: variant.id,
                                isPrimary,
                                displayOrder,
                            },
                        },
                    },
                });
            }
        }

        if (parse.systemAttributes !== undefined) {
            await tx.variantAttributeValue.deleteMany({ where: { variantId: variant.id } });

            if (parse.systemAttributes.length > 0) {
                await tx.variantAttributeValue.createMany({
                    data: parse.systemAttributes.map<VariantAttributeValueCreateManyInput>((attribute) => ({
                        variantId: variant.id,
                        attributeDefinitionId: attribute.attributeDefinitionId,
                        valueText: attribute.valueText,
                        valueNumber: attribute.valueNumber,
                        valueBoolean: attribute.valueBoolean,
                        valueDate: attribute.valueDate,
                        valueOptionIds: attribute.valueOptionIds,
                    })),
                });
            }
        }

        if (parse.distributionChannels) {

            const channelUpdates = [
                { channel: "STOREFRONT", status: parse.distributionChannels.storeFront?.publicationStatus },
                { channel: "MARKETPLACE", status: parse.distributionChannels.marketplace?.publicationStatus },
                { channel: "PHYSICAL_STORE", status: parse.distributionChannels.physicalStore?.publicationStatus },
                { channel: "WHOLESALE", status: parse.distributionChannels.wholesale?.publicationStatus },
            ] as const;

            for (const { channel, status } of channelUpdates) {
                if (status === undefined) continue;

                await tx.variantChannel.update({
                    where: { variantId_channel: { variantId: variant.id, channel } },
                    data: { publicationStatus: status },
                });
            }
        }

        return ApiResponse.success("La variante se actualizó correctamente.", { id: variant.id });
    });
});
