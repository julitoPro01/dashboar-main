"use server"

import prisma from "@/lib/prisma";
import { z } from "zod";

import { ApiResponse, PromiseReturn } from "@/src/shared/utils";

import { ProductAttributeValueCreateManyInput } from "@/src/generated/prisma/models";


import { generateSku } from "../utils/generateSku";
import { generateSlugSuffix } from "../utils/generateSlugSuffix";
import { createProductSchema } from "./schema/upsertProduct";

interface CreateProductPayload extends z.infer<typeof createProductSchema> {
    createdBy: string; createdById: number;
};

export const createProduct = async (dataProduct: CreateProductPayload) => {

    return await PromiseReturn(async () => {

        const { createdBy, createdById, ...rest } = dataProduct;

        const parse = createProductSchema.parse(rest);
        const res = await prisma.$transaction(async () => {
            //#1
            const product = await prisma.product.create({
                data: {
                    supplierId: parse.supplierId,
                    categoryId: parse.categoryId,

                    recordStatusId: parse.recordStatusId,
                    inventoryStatusId: parse.inventoryStatusId,
                    saleStatusId: parse.saleStatusId,
                    verificationStatusId: parse.verificationStatusId,

                    name: parse.name,
                    shortDescription: parse.shortDescription,
                    longDescription: parse.longDescription ?? {},
                    slug: parse.slug,
                    parentSku: generateSku(),

                    createdBy: createdBy,
                    createdById: createdById
                }
            });
            //#2 ACTUALIAMOS EL SLUG
            await prisma.product.update({
                where: { id: product.id },
                data: { slug: product.slug + "-" + generateSlugSuffix() }
            });

            //#4 IMAGENES
            for (const image of parse.images) {
                await prisma.mediaFile.create({
                    data: {
                        fileName: image.mediaFile.fileName,
                        filePath: image.mediaFile.filePath,
                        mimeType: image.mediaFile.mimeType,
                        fileSize: image.mediaFile.fileSize,
                        productImage: {
                            create: {
                                productId: product.id,
                                isPrimary: image.isPrimary,
                                displayOrder: image.displayOrder,
                            }
                        }
                    }
                });
            }
           
            //#6 ATRIBUTOS DEL SISTEMA
            if (parse.systemAttributes?.length) {
                await prisma.productAttributeValue.createMany({
                    data: parse.systemAttributes.map<ProductAttributeValueCreateManyInput>(v => ({
                        productId: product.id,
                        attributeDefinitionId: v.attributeDefinitionId,
                        valueText: v.valueText,
                        valueBoolean: v.valueBoolean,
                        valueDate: v.valueDate,
                        valueNumber: v.valueNumber,
                        valueOptionIds: v.valueOptionIds
                    }))
                })
            }


            return { id: product.id, name: product.name, publicId: product.publicId }
        });
        return ApiResponse.success("Producto añadido exitosamente.", res);
    });


}