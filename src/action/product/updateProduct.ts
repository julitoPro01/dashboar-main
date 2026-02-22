"use server";

import { ApiResponse, PromiseReturn } from "@/src/utils";
import { z } from "zod";
import { UpdateProductSchema } from './schema/upsertProduct';
import prisma from "@/lib/prisma";
import { ProductCategoryCreateManyInput } from "@/src/generated/prisma/models";

interface Audi {
    updatedBy: string;
    updateById: number;
}

type Data = z.infer<typeof UpdateProductSchema>;

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

export const updateProduct = async (data: Data, dataImages: DataImages[] | undefined, dataCategories: ProductCategoryCreateManyInput[] | undefined, audi: Audi, id: number) => {
    return PromiseReturn(async () => {

        const schema = UpdateProductSchema.parse(data);

        const res = await prisma.$transaction(async () => {

            // #1
            const res = await prisma.product.update({
                where: { id },
                data: { ...schema, updatedBy: audi.updatedBy, updatedById: audi.updateById }
            });

            // #2
            if (dataCategories) {
                await prisma.productCategory.deleteMany({
                    where: { productId: id }
                });

                await prisma.productCategory.createMany({
                    data: dataCategories
                });
            }

            // TODO: Imagenes
            // #3 

            return res
        });


        return ApiResponse.success("Producto actualizado correctamente.", res);
    });
}
