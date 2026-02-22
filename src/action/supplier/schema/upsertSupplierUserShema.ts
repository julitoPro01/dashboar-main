import { RoleType } from '@/src/generated/prisma/enums';
import { z } from 'zod';

export const SupplierUserCreateSchema = z.object({
    supplierId: z.number().int().positive("Seleeciona un estado válido"),
    primaryRole: z.string<RoleType>(),
    secondaryRoleIds: z.array(z.number()),
    // Campos requeridos
    firstName: z.string()
        .trim()
        .min(1, "Nombre requerido")
        .max(50, "Máximo 50 caracteres"),
    lastName: z.string()
        .trim()
        .min(1, "Nombre requerido")
        .max(50, "Máximo 50 caracteres"),
    email: z.email("Email inválido")
        .trim()
        .toLowerCase(),
    phone: z.string()
        .trim()
        .nullable()
        .optional()
        .transform(val => {
            // Si es null/undefined/string vacío, retornamos null
            if (!val || val.trim() === '') {
                return null;
            }

            // Limpiar caracteres no numéricos
            const cleaned = val.replace(/\D/g, '');

            // Si después de limpiar está vacío, es null
            if (cleaned === '') {
                return null;
            }

            return cleaned;
        })
        .refine(
            val => val === null || /^[0-9]{9}$/.test(val),
            "Debe tener 9 dígitos o ser nulo"
        )
        .default(null)

});
