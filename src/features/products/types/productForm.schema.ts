import { SupplierRelationModeDb } from "@/src/features/suppliers/types";
import { z } from "zod";
import { CategoryAttrDisplayGroupDb } from "../../attributes/category-attributes/types";
import { AttributeDataTypeDb } from "../../attributes/attribute-definition/types";


export const basicInformationSchema = z.object({
    name: z.string()
        .trim()
        .min(1, "El nombre es obligatorio.")
        .min(3, "Debe tener al menos 3 caracteres.")
        .max(150, "No puede superar los 150 caracteres."),
    parentSku: z.string().trim(),
    slug: z.string().trim(),
    shortDescription: z
        .string().trim()
        .min(10, "Mínimo 10 caracteres")
        .max(300, "Máximo 300 caracteres"),

    longDescription: z
        .string().trim()
        .max(3000,"Máximo 300 caracteres").nullable()
        .optional(),
});


export const gallerySchema = z.object({
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
    ).min(1, "Agrega al menos una imagen")
})

export const categorizationSchema = z.object({
    supplier: z.object({
        id: z.number().int().positive(),
        name: z.string().optional(),
        capabilities: z.array(z.string()).optional(),
        relationMode: z.custom<SupplierRelationModeDb>().optional()
    },{error:"El proveedor es requerido"}),
    category: z.object({
        id: z.number(),
        name: z.string().optional(),
        paths: z.array(
            z.object({
                id: z.number().int(),
                name: z.string()
            })).optional(),
        path: z.string().optional()
    },{error:"La categoría es requerido"}),

});

export const attributesSchema = z.object({
    customAttributes: z.array(z.object({
        customName: z.string().trim().optional(),
        valueText: z.string().trim().nullable().optional(),
    })).superRefine((values, ctx) => {
        const names = new Map<string, number>();

        values.forEach((value, index) => {

            if (!value.customName) return;

            const name = value.customName.trim().toLowerCase();

            if (names.has(name)) {
                ctx.addIssue({
                    code: "custom",
                    path: [index, "customName"],
                    message: "El atributo personalizado está duplicado",
                });
            } else {
                names.set(name, index);
            }

        })
    }),
    systemAttributes: z.array(z.object({
        group: z.custom<CategoryAttrDisplayGroupDb>(),
        data: z.array(z.object({
            attributeDefinitionId: z.number().int(),
            name: z.string(),
            dataType: z.custom<AttributeDataTypeDb>(),
            options: z.array(z.object({
                id: z.number(),
                value: z.string()
            })).nullable().optional(),

            valueText: z.string().trim().nullable().optional(),
            valueNumber: z.number().nullable().optional(),
            valueBoolean: z.boolean().nullable().optional(),
            valueDate: z.string().nullable().optional(),
            isRequired: z.boolean(),
        })).superRefine((values, ctx) => {

            values.forEach((value, index) => {

                if (value.isRequired && !value.valueText?.trim()) {
                    ctx.addIssue({
                        code: "custom",
                        path: [index, "valueText"],
                        message: "Este campo es obligatorio",
                    });
                }

                if (value.isRequired && !value.valueBoolean) {
                    ctx.addIssue({
                        code: "custom",
                        path: [index, "valueBoolean"],
                        message: "Este campo es obligatorio",
                    });
                }
                if (value.isRequired && !value.valueDate?.trim()) {
                    ctx.addIssue({
                        code: "custom",
                        path: [index, "valueDate"],
                        message: "Este campo es obligatorio",
                    });
                }
                if (value.isRequired && !value.valueNumber) {
                    ctx.addIssue({
                        code: "custom",
                        path: [index, "valueNumber"],
                        message: "Este campo es obligatorio",
                    });
                }
            });
        })
    })),
})

export const productFormSchema = z.object({
    ...basicInformationSchema.shape,
    ...gallerySchema.shape,
    ...categorizationSchema.shape,
    ...attributesSchema.shape
});
