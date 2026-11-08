"use server";

import prisma from "@/lib/prisma";
import { DistributionChannel, PublicationStatusType } from "@/src/generated/prisma/enums";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { getAuthenticatedActor } from "../auth/getAuthenticatedActor";
import { z } from "zod";

const channelStatesSchema = z.array(z.object({
    channel: z.enum(DistributionChannel),
    publicationStatus: z.enum([PublicationStatusType.ACTIVE, PublicationStatusType.INACTIVE]),
}).strict())
    .min(1)
    .refine((channels) => new Set(channels.map(({ channel }) => channel)).size === channels.length);

const updateVariantChannelsSchema = z.object({
    productId: z.number().int().positive(),
    variantId: z.number().int().positive(),
    channels: channelStatesSchema,
}).strict();

export type UpdateVariantChannelsPayload = z.infer<typeof updateVariantChannelsSchema>;

export const updateVariantChannels = async (input: UpdateVariantChannelsPayload) => {
    return PromiseReturn(async () => {
        const { productId, variantId, channels } = updateVariantChannelsSchema.parse(input);
        const actor = await getAuthenticatedActor();

        if (!actor) {
            return ApiResponse.unauthorized("Inicia sesión para gestionar los canales.");
        }

        return prisma.$transaction(async (tx) => {
            const variant = await tx.productVariant.findFirst({
                where: { id: variantId, productId },
                select: { id: true },
            });

            if (!variant) {
                return ApiResponse.badRequest("La variante seleccionada no pertenece a este producto.", "VALIDATION");
            }

            const currentChannels = await tx.variantChannel.findMany({
                where: {
                    variantId,
                    channel: { in: channels.map(({ channel }) => channel) },
                },
                select: { channel: true, publicationStatus: true },
            });

            if (currentChannels.length !== channels.length) {
                return ApiResponse.badRequest("Uno o más canales no están configurados para esta variante.", "VALIDATION");
            }

            if (currentChannels.some(({ publicationStatus }) => publicationStatus === PublicationStatusType.DRAFT)) {
                return ApiResponse.badRequest("Los canales en borrador no se pueden modificar desde esta acción.", "VALIDATION");
            }

            for (const { channel, publicationStatus } of channels) {
                await tx.variantChannel.update({
                    where: { variantId_channel: { variantId, channel } },
                    data: { publicationStatus }

                })
            }

            await tx.productVariant.update({
                where: { id: variantId },
                data: {
                    updatedBy: actor.name,
                    updatedById: actor.id,
                },
            });

            return ApiResponse.success("Canales de la variante actualizados correctamente.");
        });
    });
};
