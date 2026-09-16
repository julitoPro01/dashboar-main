"use server"

import prisma from "@/lib/prisma";
import { SupplierCreateSchema } from "./schema/upsertSupplierSchema";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { RECORD_STATUS_ID } from "@/src/shared/domains/recordStatus";

type Data = {
    name: string;
    address: string;
    description: string;
    logoUrl?: string | null;

    relationMode: string;
    capabilities: string[];

    createdBy: string,
    createdById: number,
}

export const createSupplier = async (data: Data) => {
    return PromiseReturn(async () => {

        const parse = SupplierCreateSchema.parse({ ...data });
        if (parse.relationMode === "OWNER")
            return ApiResponse.badRequest();

        const res = await prisma.supplier.create({
            data: {
                name: parse.name,
                address: parse.address,
                recordStatusId: RECORD_STATUS_ID.INACTIVE,
                description: parse.description,
                relationMode: parse.relationMode,
                capabilities: parse.capabilities,
                logoUrl: parse.logoUrl ?? null,
                createdBy: parse.createdBy,
                createdById: parse.createdById
            }
        })
        return ApiResponse.success("Proveedor añadido exitosamente.", res);
    });
}

