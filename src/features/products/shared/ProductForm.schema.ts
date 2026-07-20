import { z } from "zod";

export const UpsertProductFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "El nombre es obligatorio.")
        .min(3, "Debe tener al menos 3 caracteres.")
        .max(150, "No puede superar los 150 caracteres."),

    shortDescription: z
        .string().trim()
        .min(10, "Mínimo 10 caracteres")
        .max(250, "Máximo 250 caracteres"),

    longDescription: z
        .string().trim()
        .optional(),

    supplierId: z
        .number()
        .positive("Proveedor inválido"),

    selectedCategories: z
        .array(
            z.object({
                id: z.number(),
                name: z.string(),
                parentId: z.number().optional(),
            })
        )
        .min(1, "Seleccione al menos una categoría"),

    images: z.array(
        z.object({
            id: z.number().optional(),
            fileId: z.number().optional(),
            previewUrl: z.string(),
            isPrimary: z.boolean(),
            displayOrder: z.number().positive(),
            mediaFile: z.object({
                fileName: z.string(),
                filePath: z.string(),
                fileSize: z.number(),
                mimeType: z.string()
            }).optional()
        })
    )
});
