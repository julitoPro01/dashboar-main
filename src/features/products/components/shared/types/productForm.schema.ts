import { z } from "zod";

export const productFormSchema = z.object({

    supplierId: z
        .number()
        .positive("Proveedor inválido"),

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
        .max(3000)
        .optional(),

    recordStatusId: z.number().int().positive("Estado de registro inválido"),
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
    ).min(1,"Agrega al menos una imagen"),

    categories: z.array(z.object({
        id: z.number(),
        name: z.string()
    })).min(1, "Selecciona al menos una categoría")
})