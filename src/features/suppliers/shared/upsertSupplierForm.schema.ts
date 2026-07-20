import { z } from "zod";

export const UpsertSupplierFormSchema = z.object({
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

    relationMode: z
        .string()
        .trim()
        .min(3, "Seleccione un modo de relación válido."),

    capabilities:z.array(z.string().trim()).min(1,"Seleccione al menos un tipo de actividad"),

    logoUrl: z
        .string()
        .trim()
        .optional().nullable(),
});
