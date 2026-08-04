"use server";

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";

//TODO: No se esta usando
export const getSupplierOptions = async () => {
  return PromiseReturn(async () => {

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
