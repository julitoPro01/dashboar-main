"use server";

import prisma from "@/lib/prisma";
import { SupplierOptionsResponse } from "@/src/interfaces/supplier";
import { ApiResponse, PromiseReturn } from "@/src/utils";

export const getSupplierOptions = async () => {
  return PromiseReturn<SupplierOptionsResponse>(async () => {

    const res = await prisma.supplier.findMany({
      where: {
        recordStatus: { name: "ACTIVE" },
        relationMode: { in: ["CATALOG", "PARTNER"] },
      },
      select: {
        id: true,
        name: true,
        capabilities: true
      },
      orderBy: { name: "asc" },
    });

    return ApiResponse.success("Opciones de proveedores", res);
  });
};
