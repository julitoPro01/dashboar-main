"use server";

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";

export const getAuthRoles = async()=>{
    return PromiseReturn(async()=>{
        const res = await prisma.role.findMany();

        return ApiResponse.success("Consulta exitosa",res)
    });
}   