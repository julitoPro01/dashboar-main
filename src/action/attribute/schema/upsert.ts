import { AttributeDataTypeDb } from "@/src/features/attributes/attribute-definition/types";
import { capitalize } from "@/src/shared/utils";
import { z } from "zod";

export const createAttrDefinitionSchema = z.object({
    name: z.string().min(1).transform(capitalize),
    dataType: z.string<AttributeDataTypeDb>(),
    description: z.string().optional(),
    isActive: z.boolean(),

    values: z.array(z.object({
        isSystemDefault: z.boolean(),
        value: z.string(),
        displayOrder: z.number().int().positive(),
    })).optional(),

    createdBy: z.string().min(1),
    createdById: z.number().int().positive()
}).strict();

export const editAttrDefinitionSchema = z.object({
    name: z.string().min(1).transform(capitalize).optional(),
    dataType: z.custom<AttributeDataTypeDb>().optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),

    values: z.array(z.object({
        id: z.number().int().optional(),
        isSystemDefault: z.boolean(),
        value: z.string(),
        displayOrder: z.number().int().positive(),
    })).optional(),

    updatedBy: z.string().min(1),
    updatedById: z.number().int().positive()
})