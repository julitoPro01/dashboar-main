"use server";

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { VariantAttributeValueCreateManyInput } from "@/src/generated/prisma/models";
import { createVariantSchema } from "./upsertSchema";
import { z } from "zod";
import { generateSku } from "../product/utils/generateSku";

type Data = z.infer<typeof createVariantSchema> & {
    createdBy: string, createdById: number
};


export const createVariant = async (pars: Data) => {
    return PromiseReturn(async () => {

        const { createdBy, createdById, ...data } = pars

        const parse = createVariantSchema.parse(data);

        const res = await prisma.$transaction(async (tx) => {

            const lastVariant = await tx.productVariant.findFirst({
                where: { productId: parse.productId },
                orderBy: { displayOrder: "desc" },
                select: { displayOrder: true },
            });

            const displayOrder = (lastVariant?.displayOrder ?? 0) + 1;

            // #1
            const variant = await tx.productVariant.create({
                data: {
                    productId: parse.productId,

                    recordStatusId: parse.recordStatusId,
                    inventoryStatus: parse.inventoryStatus,
                    saleStatus: parse.saleStatus,
                    inventoryPolicy: parse.inventoryPolicy,

                    sku: generateSku(undefined, "variant"),
                    stockQuantity: parse.stockQuantity,
                    minStock: parse.minStock,

                    price: parse.price,
                    discount: parse.discount,

                    isMainVariant: parse.isMainVariant,
                    displayOrder: displayOrder,
                    tags: parse.tags as any,

                    createdBy: createdBy,
                    createdById: createdById
                }
            });

            // #2 - Imagenes
            for (const image of parse.images) {
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

            return { id: variant.id, productId: variant.productId }

        })

        return ApiResponse.created("Variante creado exitosamente.", res);
    })
}