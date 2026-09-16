
"use server";

import { z } from "zod";

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import {
    ProductAttributeValueCreateManyInput
} from "@/src/generated/prisma/models";
import { updateCustomAttrsSchema } from "./schema/upsertProduct";

interface PayloadProps {
    productId: number;
    attributes: z.infer<typeof updateCustomAttrsSchema>;
}


export const updateCustomAttributes = async ({
    productId,
    attributes
}: PayloadProps) => {

    return PromiseReturn(async () => {

        await prisma.$transaction(async (tx) => {

            const parse = updateCustomAttrsSchema.parse(attributes)

            // Eliminar propiedades personalizadas actuales
            await tx.productAttributeValue.deleteMany({
                where: {
                    productId,
                    customName: {
                        not: null
                    }
                }
            });

            // Crear las propiedades actuales
            if (parse.length > 0) {

                await tx.productAttributeValue.createMany({
                    data: parse.map<ProductAttributeValueCreateManyInput>(
                        attr => ({
                            productId,
                            customName: attr.customName,
                            valueText: attr.valueText
                        })
                    )
                });
            }
        });

        return ApiResponse.success(
            "Propiedades personalizadas actualizadas correctamente."
        );
    });
};
