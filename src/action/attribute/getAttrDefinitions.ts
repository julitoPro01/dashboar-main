"use server";
import prisma from "@/lib/prisma";
import { AttributeDefinitionsResponse } from "@/src/interfaces/attribute/attribute.api";
import { ApiResponse, PromiseReturn } from "@/src/utils";

export const getAttrDefinitions=async()=>{
    return PromiseReturn<AttributeDefinitionsResponse>(async()=>{

        const res = await prisma.attributeDefinition.findMany();

        return ApiResponse.success("Lista de atributos consultados correctamente.",res)
    });
}