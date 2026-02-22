import { z } from "zod";

export const UpsertVariantForm = z.object({

    statusId: z.number().positive().min(1,"Estado inválido"),

    stockQuantity: z.number().positive().min(1,"Stock inválido"),
    minStock: z.number().positive("Stock inválido").optional(),

    price: z.number().positive().min(1,"Precio inválido"),
    discount: z.number().positive("Descuento inválido").optional(),

    tags: z.array(z.string()).optional(),

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


