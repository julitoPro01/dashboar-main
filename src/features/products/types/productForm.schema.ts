import { SupplierRelationModeDb } from "@/src/features/suppliers/types";
import { z } from "zod";

export const productFormSchema = z.object({

    supplier: z.object({
        id: z.number().int().positive(),
        name: z.string().optional(),
        capabilities: z.array(z.string()).optional(),
        relationMode: z.custom<SupplierRelationModeDb>().optional()
    }),

    parentSku: z.string().trim(),

    slug: z.string().trim(),

    name: z.string()
        .trim()
        .min(1, "El nombre es obligatorio.")
        .min(3, "Debe tener al menos 3 caracteres.")
        .max(150, "No puede superar los 150 caracteres."),

    shortDescription: z
        .string().trim()
        .min(10, "Mínimo 10 caracteres")
        .max(300, "Máximo 300 caracteres"),

    longDescription: z
        .string().trim()
        .max(3000).nullable()
        .optional(),

    recordStatus: z.object({
        id: z.number().int().positive("Estado de registro inválido"),
        name: z.string().optional()
    }),
    saleStatusId: z.number().int().positive("Estado de venta inválido"),
    inventoryStatusId: z.number().int().positive("Estado de inventario inválido"),

    images: z.array(
        z.object({
            id: z.number().optional(),
            isPrimary: z.boolean(),
            displayOrder: z.number().int().positive(),
            mediaFile: z.object({
                id: z.number().optional(),
                fileName: z.string().min(1),
                filePath: z.string().min(1),
                fileSize: z.number().positive(),
                mimeType: z.string().min(1),
                isPublic: z.boolean(),
                bucket: z.string().optional()
            })
        })
    ).min(1, "Agrega al menos una imagen"),

    category: z.object({
        id: z.number(),
        name: z.string().optional(),
        paths: z.array(
            z.object({
                id: z.number().int(),
                name: z.string()
            })).optional()
    }),

    categoryAttributes: z.array(
        z.object({
            id: z.number().int().positive(),
            isRequired: z.boolean(),
            isFilter: z.boolean(),
            displayOrder: z.number().nullable(),
            displayGroup: z.string(),

            attributeDefinition: z.object({
                id: z.number().int(),
                name: z.string(),
                dataType: z.string()
            }),
            productAttributeValue: z.object({
                id: z.number().int().positive().nullable().optional(),
                valueText: z.string().trim().nullable().optional(),
                valueNumber: z.number().nullable().optional(),
                valueBoolean: z.boolean().nullable().optional(),
                valueDate: z.date().nullable().optional()
            })
            // systemAttributeValue:z.array(z.object({
            //     id:z.number().int().nullable(),
            //     value:z.string(),
            //     displayOrder:z.number().int().nullable(),
            // })),

        }))
})