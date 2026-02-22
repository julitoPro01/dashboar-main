"use server"

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/utils"
import { SupplierCreateSchema, SupplierUpdateSchema } from "./schema/upsertSupplierSchema";
import { RECORD_STATUS_ID } from "@/src/domains/record-status";

type Data = {
    id: number;
    name?: string;
    address?: string;
    description?: string;
    logoUrl?: string;

    relationMode?: string;
    capabilities?: string[];

    updatedBy: string,
    updatedById: number,
}

export const updateSupplier = async (data: Data) => {
    return PromiseReturn(async () => {

        const parse = SupplierUpdateSchema.parse({ ...data });
        if (parse.relationMode === "OWNED")
            return ApiResponse.badRequest();

        const res = await prisma.supplier.update({
            where: { id: data.id },
            data: {
                ...parse,
                updatedBy: parse.updatedBy,
                updatedById: parse.updatedById
            }
        })
        return ApiResponse.success("Proveedor añadido exitosamente.");
    });
}

