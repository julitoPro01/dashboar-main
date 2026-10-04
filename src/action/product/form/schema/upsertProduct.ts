import { z } from "zod";


export const longDescriptionSchema = z.object({
    description: z.object({ // TiptapDocument
        type: z.literal("doc"),
        content: z.array(z.any()).optional(),
    }),

    customProperties: z.array(z.object({
        id: z.number(),
        label: z.string(),
        value: z.string()
    }))
});

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

    longDescription: longDescriptionSchema.nullable().optional(),

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


    systemAttributes: z.array(z.object({
        attributeDefinitionId: z.number().int(),
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

    longDescription: longDescriptionSchema.optional(),

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
            attributeDefinitionId: z.number().int(),
            valueText: z.string().trim().nullable().optional(),
            valueNumber: z.number().nullable().optional(),
            valueBoolean: z.boolean().nullable().optional(),
            valueDate: z.string().nullable().optional(),
            valueOptionIds: z.array(z.number()).optional()
        }))
})
