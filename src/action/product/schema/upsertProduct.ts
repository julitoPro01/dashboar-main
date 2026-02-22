import { z } from "zod";

export const CreateProductSchema = z.object({

    supplierId: z.number().int().positive({
        message: "Proveedor inválido",
    }),

    recordStatudId: z.number().int().positive({
        message: "Estado inválido",
    }),

    verificationStatusId: z.number().int().positive(),

    mainCategoryId: z.number().int().positive({
        message: "Seleccione una categoría principal",
    }),

    lastCategoryId: z.number().int().positive({
        message: "Seleccione la última categoría",
    }),    

    currencyId: z.number().int().positive().optional().default(1),

    name: z
        .string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(150, "El nombre es muy largo"),

    longDescription: z
        .string().trim()
        .max(500, "Máximo 500 caracteres")
        .optional(),

    shortDescription: z
        .string()
        .min(10, "La descripción corga el obligatoria")
        .max(250, "Máximo 150 caracteres"),

    slug: z
        .string()
        .min(3, "Slug inválido"),

    // selectedCategories: z
    //     .array(
    //         z.object({
    //             id: z.number().int().positive(),
    //             name: z.string().min(1),
    //             parentId: z.number().int().positive().optional(),
    //         })
    //     )
    //     .min(1, "Seleccione al menos una categoría"),
});


export const UpdateProductSchema = z.object({

    supplierId: z.number().int().positive({
        message: "Proveedor inválido",
    }).optional(),

    recordStatudId: z.number().int().positive({
        message: "Estado inválido",
    }).optional(),

    verificationStatusId: z.number().int().positive().optional(),

    mainCategoryId: z.number().int().positive({
        message: "Seleccione una categoría principal",
    }).optional(),

    lastCategoryId: z.number().int().positive({
        message: "Seleccione la última categoría",
    }).optional(),

    currencyId: z.number().int().positive().optional(),

    name: z
        .string()
        .trim()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(150, "El nombre es muy largo").optional(),

    longDescription: z
        .string()
        .trim()
        .max(500, "Máximo 500 caracteres")
        .optional(),

    shortDescription: z
        .string()
        .trim()
        .min(10, "La descripción corga el obligatoria")
        .max(250, "Máximo 150 caracteres").optional(),

    slug: z
        .string()
        .min(3, "Slug inválido").optional(),
}).strict()
    .refine((obj) => Object.keys(obj).length > 0, {
        message: "Al menos un campo debe ser proporcionado para actualizar",
    });
