"use server"

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { z } from "zod";
import { ProductAttributeValueCreateManyInput } from "@/src/generated/prisma/models";
import { updateCategorizationSchema } from "./schema/upsertProduct";

interface PayloadProps {
    productId: number,
    data: z.infer<typeof updateCategorizationSchema>;
}

export const updateCategorization = async ({ productId, data }: PayloadProps) => {

    return PromiseReturn(async () => {

        await prisma.$transaction(async (tx) => {

            const { categoryId, attributes } = updateCategorizationSchema.parse(data);

            await prisma.product.update({
                where: { id: productId },
                data: { categoryId}
            });

            // Eliminar atributos del sistema actuales
            await tx.productAttributeValue.deleteMany({
                where: {
                    productId,
                    customName: null
                }
            });

            // Crear los valores actuales
            if (attributes.length > 0) {

                await tx.productAttributeValue.createMany({
                    data: attributes.map<ProductAttributeValueCreateManyInput>(
                        attr => ({
                            productId,
                            attributeDefinitionId: attr.attributeDefinitionId,

                            valueText: attr.valueText,
                            valueNumber: attr.valueNumber,
                            valueBoolean: attr.valueBoolean,
                            valueDate: attr.valueDate,
                            valueOptionIds: attr.valueOptionIds
                        })
                    )
                });
            }
        })

        return ApiResponse.success();
    })
}