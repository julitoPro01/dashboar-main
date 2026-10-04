import { z } from "zod";
import { categorizationSchema, gallerySchema } from "./form.schema";


const commercialInfoSchema = z.object({
    commercialInfo: z.object({
        sku: z.string(),
        barCode: z.string().nullable().optional(),
        basePrice: z.number("Ingrese el precio base")
            .min(0, "El valor no puede ser negativo")
            .max(999999.99, "El valor no puede superar S/ 999,999.99"),
        discount: z.number().int("El valor debe ser un número entero")
            .min(0, "El valor no puede ser negativo")
            .max(100, "El valor no puede superar el 100%")
            .nullable().optional(),
    }).optional()
});

const inventorySchema = z.object({
    inventory: z.object({
        stockQuantity: z.number("Ingrese el stock inicial")
            .int("El valor debe ser un número entero")
            .min(0, "El valor no puede ser negativo")
            .max(1000000, "El valor no puede superar 1,000,000"),
        minStock: z.number()
            .int("El valor debe ser un número entero")
            .min(0, "El valor no puede ser negativo")
            .max(1000, "El valor no puede superar 1,000")
            .nullable().optional()
    }).optional()
});


export const variantFormSchema = z.object({
    ...categorizationSchema.shape,
    ...commercialInfoSchema.shape,
    ...inventorySchema.shape,
    ...gallerySchema.shape
})