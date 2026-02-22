import { z } from "zod";

export const CreateProductImageSchema = z.object({
    productId: z.int().positive(),
    fileId: z.int().positive().optional(),
    description: z.string().trim().optional(),
    isPrimary: z.boolean(),
    isFeatured: z.boolean().optional().default(false),
    displayOrder: z.int().positive(),
    featuredOrder: z.int().positive().optional(),
}).strict()

export const CreateVariantImageSchema = z.object({
    variantId: z.int().positive(),
    fileId: z.int().positive().optional(),
    description: z.string().trim().optional(),
    isPrimary: z.boolean(),
    isFeatured: z.boolean().optional().default(false),
    displayOrder: z.int().positive(),
    featuredOrder: z.int().positive().optional(),
}).strict()