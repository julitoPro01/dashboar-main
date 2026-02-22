
import { z } from "zod";

export const CategoryCreateSchema = z.object({
    name: z.string().min(1, "El nombre es requerido").max(120),
    description: z.string().nullable().optional(),
    recordStatudId: z.number().int().positive(),
    slug: z
        .string()
        .min(1)
        .max(120)
        .regex(/^[a-z0-9]+(?:[-_\/][a-z0-9]+)*$/i, "Slug inválido"),
    imageUrl: z.url().nullable().optional(),
    parentId: z.number().int().nonnegative().nullable().optional(),
    isProductCategory: z.boolean().optional().default(false),
}).strict();

export const CategoryUpdateSchema = z.object({
        name: z.string().min(1).max(120).optional(),
        description: z.string().nullable().optional(),
        recordStatudId: z.number().int().positive().optional(),
        slug: z
            .string()
            .min(1)
            .max(120)
            .regex(/^[a-z0-9]+(?:[-_\/][a-z0-9]+)*$/i, "Slug inválido")
            .optional(),
        imageUrl: z.string().url().nullable().optional(),
        parentId: z.number().int().nonnegative().nullable().optional(),
        isProductCategory: z.boolean().optional(),
    }).strict()
    .refine((obj) => Object.keys(obj).length > 0, {
        message: "Al menos un campo debe ser proporcionado para actualizar",
    });