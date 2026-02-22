"use server";

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/utils";
import { CreateVariantSchema } from "./schema/upsertVariant";

type Data = {
    productId: number;
    recordStatusId: number;
    sku: string;
    stockQuantity: number;
    minStock?: number;
    price: number;
    discount?: number;
    isMainVariant: boolean;
    displayOrder: number;
    tags: string[];
}

type AttributeValue = {
    attributeDefinitionId: number;
    value: string;
}


type Image = {
    isPrimary: boolean;
    displayOrder: number;
    mediaFile: {
        fileName: string;
        filePath: string;
        fileSize: number;
        mimeType: string;
    }
}

type Audi = { createdBy: string, createdById: number }

export const addVariant = async (data: Data, attr: AttributeValue[], images: Image[], audi: Audi) => {
    return PromiseReturn(async () => {

        const parse = CreateVariantSchema.parse(data);

        const res = await prisma.$transaction(async () => {
            // #1
            const res = await prisma.productVariant.create({
                data: {
                    productId: parse.productId,
                    recordStatusId: parse.recordStatusId,
                    inventoryStatusId: 1, //TODO:
                    saleStatusId: 1,// TODO:                
                    sku: parse.sku,
                    stockQuantity: parse.stockQuantity,
                    minStock: parse.minStock,//?
                    price: parse.price,
                    discount: parse.discount,//?
                    isMainVariant: parse.isMainVariant,
                    displayOrder: parse.displayOrder,
                    tags: parse.tags as any,
                    createdBy: audi.createdBy,
                    createdById: audi.createdById
                }
            });
            // #2
            await prisma.variantAttributeValue.createMany({
                data: attr.map(v => ({
                    variantId: res.id,
                    attributeDefinitionId: v.attributeDefinitionId,
                    value: v.value
                }))
            })

            // #3
            //TODO: Images

            return true;
        })

        if (res)
            return ApiResponse.created("");

        return ApiResponse.badRequest()
    })
}