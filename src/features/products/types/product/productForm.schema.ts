import { SupplierCapabilityDb, SupplierRelationModeDb } from "@/src/features/suppliers/types";
import { z } from "zod";
import { categorizationSchema, gallerySchema } from "../form.schema";

const descriptionSchema = z.object({
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

export const basicInformationSchema = z.object({
    basicInfo: z.object({
        id: z.number().optional(),
        name: z.string()
            .trim()
            .min(1, "El nombre es obligatorio.")
            .min(3, "Debe tener al menos 3 caracteres.")
            .max(150, "No puede superar los 150 caracteres."),
        slug: z.string().trim(),
        // longDescription: longDescriptionSchema.nullable().optional(),
        shortDescription: z
            .string().trim()
            .min(10, "Mínimo 10 caracteres")
            .max(300, "Máximo 300 caracteres"),
    })

});


export const supplierSchema = z.object({
    supplier: z.object({
        id: z.number().int().positive(),
        name: z.string().optional(),
        capabilities: z.array(z.string<SupplierCapabilityDb>()).optional(),
        relationMode: z.custom<SupplierRelationModeDb>().optional()
    }, { error: "El proveedor es requerido" }),
});


export const longDescriptionSchema = z.object({
    longDescription: descriptionSchema.nullable().optional(),
});

export const productFormSchema = z.object({
    ...basicInformationSchema.shape,
    ...gallerySchema.shape,
    ...categorizationSchema.shape,
    ...supplierSchema.shape,
    ...longDescriptionSchema.shape
});
