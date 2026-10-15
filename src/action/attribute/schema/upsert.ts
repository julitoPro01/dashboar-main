import { AttributeDataType } from "@/src/generated/prisma/enums";
import { capitalize } from "@/src/shared/utils";
import { z } from "zod";

export const createAttrDefinitionSchema = z.object({
    name: z.string().min(1).transform(capitalize),
    dataType: z.string<AttributeDataType>(),
    description: z.string().optional(),
    isActive: z.boolean(),

    values: z.array(z.object({
        value: z.string(),
        displayOrder: z.number().int().positive(),
    })).optional(),

    createdBy: z.string().min(1),
    createdById: z.number().int().positive()
}).strict();

export const editAttrDefinitionSchema = z.object({
    name: z.string().min(1).transform(capitalize).optional(),
    dataType: z.custom<AttributeDataType>().optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),

    values: z.array(z.object({
        id: z.number().int().optional(),
        value: z.string(),
        displayOrder: z.number().int().positive(),
    })).optional(),

    updatedBy: z.string().min(1),
    updatedById: z.number().int().positive()
})