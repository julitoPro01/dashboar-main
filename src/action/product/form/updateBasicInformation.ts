
"use server";

import { z } from "zod";

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { longDescriptionSchema, updateBasicInformationSchema } from "./schema/upsertProduct";

interface PayloadProps {
    id: number;
    updatedBy: string;
    updatedById: number;
    data: z.infer<typeof updateBasicInformationSchema>;
}

export const updateBasicInformation = async ({
    id,
    updatedBy,
    updatedById,
    data
}: PayloadProps) => {

    return PromiseReturn(async () => {

        const parse = updateBasicInformationSchema.parse(data)

        const product = await prisma.product.update({
            where: { id },
            data: {
                ...parse,
                updatedBy,
                updatedById,
            }
        });

        return ApiResponse.success(
            "Producto actualizado correctamente.",
            {
                ...product,
                longDescription: longDescriptionSchema.parse(product.longDescription)
            }
        );
    });
};

