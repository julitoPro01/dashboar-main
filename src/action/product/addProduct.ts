"use server"

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/utils"
import { CreateProductSchema } from "./schema/upsertProduct";
import { ProductCategoryCreateManyInput } from "@/src/generated/prisma/models";
import { CreateMediaFileSchema } from "../media-file/schema/upsertMediaFile";
import { CreateProductImageSchema } from "./schema/upsertImage";
import { UpsertProductImage } from "@/src/interfaces/image";
import { RECORD_STATUS_ID } from "@/src/domains/record-status";
import { VERIFICATION_STATUS_ID } from "@/src/domains/verification-status";
import { INVENTORY_STATUS_ID } from '../../domains/inventory-status';
import { SALES_STATUS_ID } from "@/src/domains/sale-status";

interface Audi {
    createdBy: string;
    createdById: number;
}

interface DataProduct {
    supplierId: number;
    mainCategoryId: number;
    lastCategoryId: number;
    currencyId?: number; // por defecto "id = 1 -> PEN (soles)"
    name: string;
    longDescription?: string;
    shortDescription: string;
    slug: string;

}

type DataImages = {
    isPrimary: boolean;
    displayOrder: number;
    mediaFile: {
        fileName: string;
        filePath: string;
        fileSize: number;
        mimeType: string;
    }
}


export const addProduct = async (dataProduct: DataProduct, dataImages: DataImages[], categoryIds: number[], { createdBy, createdById }: Audi) => {

    return PromiseReturn(async () => {

        const parse = CreateProductSchema.parse(dataProduct);
        const res = await prisma.$transaction(async () => {
            //#1
            const product = await prisma.product.create({
                data: {
                    supplierId: parse.supplierId,
                    recordStatusId:RECORD_STATUS_ID.INACTIVE,//TODO: "INACTIVE" valor que debe existir
                    inventoryStatusId:INVENTORY_STATUS_ID.OUT_OF_STOCK, //TODO: "OUT_OF_STOCK"  valor que debe existir en la tabla
                    saleStatusId:SALES_STATUS_ID.COMING_SOON,// TODO: "COMING_SOON" valor que debe existir en la tabla
                    verificationStatusId: VERIFICATION_STATUS_ID.DRAFT, // TODO: "DRAFT" ...
                    mainCategoryId: parse.mainCategoryId,
                    lastCategoryId: parse.lastCategoryId,

                    name: parse.name,
                    shortDescription: parse.shortDescription,
                    longDescription: parse.longDescription,
                    slug: parse.slug,

                    createdBy: createdBy,
                    createdById: createdById
                }
            });
            //#2
            await prisma.productCategory.createMany({
                data: categoryIds.map(id => ({
                    categoryId: id,
                    productId: product.id
                }))
            });
            //#3
            await prisma.product.update({
                where: { id: product.id },
                data: { slug: product.slug + "--" + product.publicId }
            });
            // TODO:
            // #4
            // for (let val of dataImages) {

            //     const { mediaFile, ...img } = val;
            //     const parseMedia = CreateMediaFileSchema.parse(mediaFile);
            //     const parseImag = CreateProductImageSchema.parse(img)

            //     await prisma.mediaFile.create({
            //         data: {
            //             fileName: parseMedia.fileName,
            //             filePath: parseMedia.filePath,
            //             fileSize: parseMedia.fileSize,
            //             mimeType: parseMedia.mimeType,
            //             productImage: {
            //                 create: {
            //                     productId: product.id,
            //                     isPrimary: parseImag.isPrimary,
            //                     displayOrder: parseImag.displayOrder,
            //                 }
            //             }
            //         }
            //     })
            // }

            return { id: product.id, name: product.name }
        });
        return ApiResponse.success("Producto añadido exitosamente.", res);
    });
}