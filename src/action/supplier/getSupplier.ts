"use server";

import prisma from "@/lib/prisma";
import { SUPPLIER_CAPABILITIES_LABELS } from "@/src/features/supplier/shared/capability.constans";
import { SUPPLIER_RELATION_MODE_LABEL } from "@/src/features/supplier/shared/relationMode.constants";
import { SupplierDetailsResponse, SupplierFormDataResponse } from "@/src/interfaces/supplier";
import { ApiResponse, PromiseReturn, Result } from "@/src/utils";


export async function getSupplier(p: { to: "details", id: number }): Promise<Result<SupplierDetailsResponse>>;
export async function getSupplier(p: { to: "form", publicId: string }): Promise<Result<SupplierFormDataResponse>>;

export async function getSupplier(p: any) {

    return PromiseReturn(async () => {

        if (p.to !== "form" && p.to !== "details")
            return ApiResponse.badRequest();

        const res = await prisma.supplier.findUnique({
            where: p.to === "details" ? { id: p.id } : { publicId: p.publicId },
            select: {
                id:true,
                logoUrl: true,
                name: true,
                description: true,
                address: true,
                relationMode: true,
                capabilities: true
            }
        })
        if (!res)
            return ApiResponse.notFound();

        if (p.to === "details")
            return ApiResponse.success("", {
                ...res,
                relationMode: SUPPLIER_RELATION_MODE_LABEL[res.relationMode] as string,
                capabilities: res.capabilities.sort().map(v => SUPPLIER_CAPABILITIES_LABELS[v]) as string[]
            });
        else
            return ApiResponse.success("", res);

    });
};

