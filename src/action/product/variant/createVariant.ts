"use server";

import prisma from "@/lib/prisma";
import { CreateVariantSchema } from "./schema/upsertVariant";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { VariantAttributeValueCreateManyInput } from "@/src/generated/prisma/models";

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
    attributeOptionId: number;
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

export const createVariant = async (data: Data, attr: AttributeValue[], images: Image[], audi: Audi) => {
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
                data: attr.map<VariantAttributeValueCreateManyInput>(v => ({
                    variantId: res.id,
                    attributeDefinitionId: v.attributeDefinitionId,
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