"use server";

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/utils"

interface Props{
    id:number
}

export const deleteCategory= async({id}:Props)=>{
    return PromiseReturn(async()=>{

       const res = await prisma.category.delete({
            where:{id},
            select:{id:true, recordStatudId:true, parentId:true, name:true}
        });

    
        return ApiResponse.success("Categoría eliminado correctamente.",res)
    });
}