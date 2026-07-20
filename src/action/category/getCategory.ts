"use server";
import prisma from "@/lib/prisma"
import { CategoryEditResponse } from "@/src/features/category/types";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils"

export const getCategory = async({id}:{id:number}) => {

    return PromiseReturn<CategoryEditResponse>(async()=>{

        const res = await prisma.category.findUnique({
            where:{id},
            select:{
                id:true,
                name:true,
                slug:true,
                description:true,
                recordStatusId:true,
                imageUrl:true,
                parentId:true,
                createdAt:true,
                updatedAt:true
            }
        })

        if(!res)
            return ApiResponse.notFound();

        return ApiResponse.success("Consulta exitosa",res);
    })
}
