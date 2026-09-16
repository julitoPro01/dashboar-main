
import { capitalize } from "@/src/shared/utils";
import { z } from "zod";

export const categoryCreateSchema = z.object({
    name: z.string().min(1, "El nombre es requerido").max(120).transform(capitalize),
    description: z.string().nullable().optional(),
    recordStatusId: z.number().int().positive(),
    slug: z
        .string()
        .min(1)
        .max(120)
        .regex(/^[a-z0-9]+(?:[-_\/][a-z0-9]+)*$/i, "Slug inválido"),
    imageUrl: z.url().nullable().optional(),
    parentId: z.number().int().nonnegative().nullable().optional(),
    parentPath: z.string().trim().nullable().optional(),
    parentLevel: z.number().int().nullable().optional(),
    createdBy: z.string(),
    createdById: z.number().int().positive()

}).strict();

export const CategoryUpdateSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(1).max(100).transform(capitalize).optional(),
    description: z.string().nullable().optional(),
    recordStatusId: z.number().int().positive().optional(),
    slug: z
        .string()
        .min(1)
        .max(120)
        .regex(/^[a-z0-9]+(?:[-_\/][a-z0-9]+)*$/i, "Slug inválido")
        .optional(),
    imageUrl: z.string().url().nullable().optional(),
    parentId: z.number().int().nonnegative().nullable().optional(),

    updatedBy: z.string().trim(),
    updatedById: z.number().int().positive()
}).strict()
    .refine((obj) => Object.keys(obj).length > 0, {
        message: "Al menos un campo debe ser proporcionado para actualizar",
    });