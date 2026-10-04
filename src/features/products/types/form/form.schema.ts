import {z} from "zod";
import { CategoryAttrDisplayGroupDb } from "../../../attributes/category-attributes/types";
import { ATTRIBUTE_INPUT_CONFIG } from "../../constants";
import { AttributeDataTypeDb } from "../../../attributes/attribute-definition/types";

export const categorizationSchema = z.object({
    categorization: z.object({

        category: z.object({
            id: z.number(),
            name: z.string().optional(),
            paths: z.array(
                z.object({
                    id: z.number().int(),
                    name: z.string()
                })).optional(),
            path: z.string().optional()
        }, { error: "La categoría es requerido" }),

        systemAttributes: z.array(z.object({
            group: z.custom<CategoryAttrDisplayGroupDb>(),
            attributes: z.array(z.object({
                attributeDefinitionId: z.number().int(),
                name: z.string(),
                dataType: z.custom<AttributeDataTypeDb>(),
                systemAttributeValues: z.array(z.object({
                    id: z.number(),
                    value: z.string()
                })).nullable().optional(),

                valueText: z.string().trim().nullable().optional(),
                valueNumber: z.number().nullable().optional(),
                valueBoolean: z.boolean().nullable().optional(),
                valueDate: z.string().nullable().optional(),
                valueOptionIds: z.array(z.number()).nullable().optional(),

                isRequired: z.boolean(),
            })).superRefine((values, ctx) => {

                values.forEach((value, index) => {
                    if (!value.isRequired) return;

                    const { field } = ATTRIBUTE_INPUT_CONFIG[value.dataType];

                    switch (field) {
                        case "valueText":
                            if (!value.valueText?.trim()) {
                                ctx.addIssue({
                                    code: "custom",
                                    path: [index, "valueText"],
                                    message: "Este campo es obligatorio",
                                });
                            }
                            break;

                        case "valueNumber":
                            if (!value.valueNumber) {
                                ctx.addIssue({
                                    code: "custom",
                                    path: [index, "valueNumber"],
                                    message: "Este campo es obligatorio",
                                });
                            }
                            break;

                        case "valueBoolean":
                            // false es un valor válido.
                            break;

                        case "valueDate":
                            if (!value.valueDate?.trim()) {
                                ctx.addIssue({
                                    code: "custom",
                                    path: [index, "valueDate"],
                                    message: "Este campo es obligatorio",
                                });
                            }
                            break;

                        case "valueOptionIds":
                            if (
                                value.valueOptionIds == null ||
                                (Array.isArray(value.valueOptionIds) && !value.valueOptionIds.length)
                            ) {
                                ctx.addIssue({
                                    code: "custom",
                                    path: [index, "valueOptionIds"],
                                    message: "Seleccione al menos un valor",
                                });
                            }
                            break;
                    }
                });
            })
        })).optional()
    })
});

export const gallerySchema = z.object({
    images: z.array(
        z.object({
            id: z.number().optional(),
            isPrimary: z.boolean(),
            displayOrder: z.number().int(),
            mediaFile: z.object({
                id: z.number().optional(),
                fileName: z.string().min(1),
                filePath: z.string().min(1),
                fileSize: z.number().positive(),
                mimeType: z.string().min(1),
                isPublic: z.boolean(),
                bucket: z.string().nullable().optional()
            })
        })
    ).min(1, "Agrega al menos una imagen")
})