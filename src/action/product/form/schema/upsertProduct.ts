import { z } from "zod";

export const createProductSchema = z.object({

    recordStatusId: z.number().int().positive(),
    inventoryStatusId: z.number().int().positive(),
    saleStatusId: z.number().int().positive(),
    verificationStatusId: z.number().int().positive(),

    supplierId: z.number().int().positive({
        message: "Proveedor inválido",
    }),

    categoryId: z.number().int().positive(),

    name: z
        .string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(150, "El nombre es muy largo"),

    longDescription: z
        .string().trim()
        .max(500, "Máximo 500 caracteres")
        .nullable()
        .optional(),

    shortDescription: z
        .string()
        .min(10, "La descripción corga el obligatoria")
        .max(250, "Máximo 150 caracteres"),

    slug: z
        .string()
        .min(3, "Slug inválido"),

    images: z.array(z.object({
        isPrimary: z.boolean(),
        displayOrder: z.number().positive(),
        mediaFile: z.object({
            fileName: z.string().trim(),
            filePath: z.string().trim(),
            fileSize: z.number(),
            mimeType: z.string().trim()
        })
    })).min(1, "Agrega al menos una imagen"),

    customAttributes: z.array(z.object({
        customName: z.string().nullable().optional(),
        valueText: z.string().nullable().optional(),
    })).optional(),

    systemAttributes: z.array(z.object({
        attributeDefinitionId: z.number().int().nullable().optional(),
        valueText: z.string().trim().nullable().optional(),
        valueNumber: z.number().nullable().optional(),
        valueBoolean: z.boolean().nullable().optional(),
        valueDate: z.string().nullable().optional(),
        valueOptionIds: z.array(z.number()).optional()
    })).optional()
});


// UPDATE
export const updateBasicInformationSchema = z.object({
    supplierId: z.number().int().positive().optional(),

    name: z
        .string()
        .min(3)
        .max(150).optional(),

    longDescription: z
        .string().trim()
        .max(500)
        .nullable()
        .optional(),

    shortDescription: z
        .string()
        .min(10)
        .max(250).optional(),

    slug: z
        .string()
        .min(3).optional(),
})

export const updateGallerySchema = z.array(
    z.object({
        id: z.number().optional(),
        isPrimary: z.boolean(),
        displayOrder: z.number().positive(),
        mediaFile: z.object({
            fileName: z.string().trim(),
            filePath: z.string().trim(),
            fileSize: z.number(),
            mimeType: z.string().trim()
        })
    }))

export const updateCustomAttrsSchema = z.array(
    z.object({
        id: z.number().optional(),
        customName: z.string().nullable().optional(),
        valueText: z.string().nullable().optional(),
    }))

export const updateCategorizationSchema = z.object({
    categoryId: z.number().optional(),
    attributes: z.array(
        z.object({
            attributeDefinitionId: z.number().int().nullable().optional(),
            valueText: z.string().trim().nullable().optional(),
            valueNumber: z.number().nullable().optional(),
            valueBoolean: z.boolean().nullable().optional(),
            valueDate: z.string().nullable().optional(),
            valueOptionIds: z.array(z.number()).optional()
        }))
})
