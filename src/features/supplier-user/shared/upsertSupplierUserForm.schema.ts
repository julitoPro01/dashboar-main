import { UserRole } from "@/src/shared/domains/accessControl";
import { z } from "zod";

export const UpsertSupplierUserFormSchema = z.object({
    firstName: z.string().trim().min(3, "Mínimo 3 caracteres").max(55, "Máximo 55 caracteres"),
    lastName: z.string().trim().min(3, "Mínimo 3 caracteres").max(55, "Máximo 55 caracteres"),
    email: z.email("Email inválido")
        .trim()
        .toLowerCase(),
    phone: z
        .string()
        .trim()
        .optional()
        .refine(
            val => !val || /^[0-9]+$/.test(val),
            "Solo se permiten números"
        )
        .refine(
            val => !val || /^[0-9]{9}$/.test(val),
            "9 dígitos requeridos"
        ),

    supplierId: z.number("El negocio es requerido").int().min(1, "Negocio inválido").positive(),
    primaryRole: z.string<UserRole>("El rol es requerido"),
    secundaryRoles: z.array(z.string<UserRole>()).optional()
});