"use server"
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { createAttrDefinitionSchema } from "./schema/upsert";
import prisma from "@/lib/prisma";
import type { AttributeDataTypeDb } from "@/src/features/attributes/attribute-definition/types";

interface SystemAttributeValue {
    value: string;
    displayOrder: number;
}

interface Props {
    name: string;
    dataType: AttributeDataTypeDb;
    description?: string;
    isActive: boolean;

    values?: SystemAttributeValue[]

    createdBy: string;
    createdById: number;
}
export const addAttrDefinition = async (props: Props) => {

    return PromiseReturn(async () => {

        const parse = createAttrDefinitionSchema.parse(props);

        const res = await prisma.attributeDefinition.create({
            data: {
                name: parse.name,
                dataType: parse.dataType,
                description: parse.description,
                isActive: parse.isActive,
                createdBy: parse.createdBy,
                createdById: parse.createdById,
                systemAttributeValue:parse.values ? {
                    create: parse.values
                } : undefined
            }
        });

        return ApiResponse.success("Ok", res);
    })
}