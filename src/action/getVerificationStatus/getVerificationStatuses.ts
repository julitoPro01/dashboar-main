"use server";
import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/utils";

export const getVerificationStatuses =async ()=>{
    return PromiseReturn( async()=>{

        const res = await prisma.verificationStatus.findMany();

        return ApiResponse.success("Listas obtenidas correctamente.",res);
    })
}