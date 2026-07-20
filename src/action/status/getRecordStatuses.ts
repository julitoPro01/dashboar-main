"use server";

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";

export const getRecordStatuses=async()=>{
    return PromiseReturn(async()=>{

        const res = await prisma.recordStatus.findMany();

        return ApiResponse.success("Listas obtenidas correctamente.",res)
    })
}