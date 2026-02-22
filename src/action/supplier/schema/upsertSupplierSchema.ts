import { SupplierCapability, SupplierRelationMode } from "@/src/generated/prisma/enums";
import { z } from "zod";

export const SupplierCreateSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "El nombre es obligatorio.")
        .min(3, "Debe tener al menos 3 caracteres.")
        .max(150, "No puede superar los 150 caracteres."),

    address: z
        .string()
        .trim()
        .min(1, "La dirección es obligatorio.")
        .min(5, "Debe tener al menos 5 caracteres.")
        .max(200, "No puede superar los 200 caracteres."),

    description: z
        .string()
        .trim()
        .min(1, "La descripción es obligatoria.")
        .min(10, "Debe tener al menos 10 caracteres.")
        .max(500, "No puede superar los 500 caracteres."),

    relationMode: z.enum(SupplierRelationMode, { error: "El modo de relación es requerido" }),
    capabilities: z.array(z.enum(SupplierCapability)).min(1),

    createdBy: z.string().trim(),
    createdById: z.int(),

    logoUrl: z.url()
        .trim()
        .optional()
});

export const SupplierUpdateSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "El nombre es obligatorio.")
        .min(3, "Debe tener al menos 3 caracteres.")
        .max(150, "No puede superar los 150 caracteres.").optional(),

    address: z
        .string()
        .trim()
        .min(1, "La dirección es obligatorio.")
        .min(5, "Debe tener al menos 5 caracteres.")
        .max(200, "No puede superar los 200 caracteres.").optional(),

    description: z
        .string()
        .trim()
        .min(1, "La descripción es obligatoria.")
        .min(10, "Debe tener al menos 10 caracteres.")
        .max(500, "No puede superar los 500 caracteres.").optional(),

    relationMode: z.enum(SupplierRelationMode, { error: "El modo de relación es requerido" }).optional(),

    capabilities: z.array(z.enum(SupplierCapability)).min(1).optional(),

    updatedBy: z.string().trim(),
    updatedById: z.int(),

    logoUrl: z.url()
        .trim()
        .optional(),
    recordStatusId:z.int().positive().optional()
});
