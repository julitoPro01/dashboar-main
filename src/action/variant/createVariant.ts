"use server";

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { VariantAttributeValueCreateManyInput } from "@/src/generated/prisma/models";
import { createVariantSchema } from "./upsertSchema";
import { z } from "zod";
import { RECORD_STATUS_ID } from "@/src/shared/domains/recordStatus";
import { parsePeruDateTime } from "@/src/shared/utils/date";
import { generateSku, mapImagesToPayload, deriveInventoryStatus } from "../shared/utils";
import { getAuthenticatedActor } from "../auth";

type Data = z.infer<typeof createVariantSchema> ;


export const createVariant = async (pars: Data) => {
    return PromiseReturn(async () => {


        const parse = createVariantSchema.parse(pars);

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

          const actor = await getAuthenticatedActor();
        
            if (!actor) {
                return ApiResponse.unauthorized("Inicia sesión para actualizar la variante.");
            }

        const res = await prisma.$transaction(async (tx) => {

            const lastVariant = await tx.productVariant.findFirst({
                where: { productId: parse.productId },
                orderBy: { displayOrder: "desc" },
                select: { displayOrder: true },
            });

            const displayOrder = (lastVariant?.displayOrder ?? 0) + 1;

            // Existe al menos una variante Activa, por lo tando
            // Tambien existe una variante "Primaria"
            const existsVariant = await tx.productVariant.findFirst({
                where: { productId: parse.productId, recordStatusId: RECORD_STATUS_ID.ACTIVE }
            });

            const isPrimary = existsVariant ? false : parse.recordStatusId === RECORD_STATUS_ID.ACTIVE;

            // #1
            const variant = await tx.productVariant.create({
                data: {
                    productId: parse.productId,

                    recordStatusId: parse.recordStatusId,
                    inventoryStatus:deriveInventoryStatus(parse.stockQuantity,parse.inventoryPolicy),
                    saleStatus: parse.saleStatus,
                    inventoryPolicy: parse.inventoryPolicy,

                    sku: generateSku(undefined, "variant"),
                    stockQuantity: parse.stockQuantity,
                    minStock: parse.minStock,

                    price: parse.price,
                    discount: parse.discount,
                    discountStartsAt: discountStartsAt,
                    discountEndsAt: discountEndsAt,

                    isMainVariant: isPrimary,
                    displayOrder: displayOrder,
                    tags: parse.tags as any,

                    createdBy: actor.name,
                    createdById: actor.id
                }
            });

            // #2 - Imagenes
            for (const image of mapImagesToPayload(parse.images)) {
                await tx.mediaFile.create({
                    data: {
                        fileName: image.mediaFile.fileName,
                        filePath: image.mediaFile.filePath,
                        mimeType: image.mediaFile.mimeType,
                        fileSize: image.mediaFile.fileSize,
                        productImage: {
                            create: {
                                variantId: variant.id,
                                isPrimary: image.isPrimary,
                                displayOrder: image.displayOrder,
                            }
                        }
                    }
                }); 
            }


            // #3 - Atributos
            if (parse.systemAttributes?.length) {
                await tx.variantAttributeValue.createMany({
                    data: parse.systemAttributes.map<VariantAttributeValueCreateManyInput>(v => ({
                        variantId: variant.id,
                        attributeDefinitionId: v.attributeDefinitionId,

                        valueText: v.valueText,
                        valueBoolean: v.valueBoolean,
                        valueDate: v.valueDate,
                        valueNumber: v.valueNumber,
                        valueOptionIds: v.valueOptionIds
                    }))
                })
            }

            // #4 - Canales de comercializaciones
            const { storeFront, marketplace, physicalStore, wholesale } = parse.distributionChannels;
            await tx.variantChannel.createMany({
                data: [
                    { variantId: variant.id, channel: "STOREFRONT", publicationStatus: storeFront.publicationStatus },
                    { variantId: variant.id, channel: "MARKETPLACE", publicationStatus: marketplace.publicationStatus },
                    { variantId: variant.id, channel: "PHYSICAL_STORE", publicationStatus: physicalStore.publicationStatus },
                    { variantId: variant.id, channel: "WHOLESALE", publicationStatus: wholesale.publicationStatus },
                ]
            })


            return { id: variant.id, productId: variant.productId }

        })

        return ApiResponse.created("Variante creado exitosamente.", res);
    })
}