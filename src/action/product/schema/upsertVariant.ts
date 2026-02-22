import {z} from "zod";

export const CreateVariantSchema = z.object({
  productId: z.number().int().positive(),
  recordStatusId: z.number().int().positive(),
  sku: z.string().min(3).max(50),
  stockQuantity: z.number().int().min(0).max(1000000),
  minStock: z.number().int().min(0).max(100000).optional().nullable(),
  price: z.number().positive().max(1000000),
  discount: z.number().min(0).max(100).optional().default(0),
  isMainVariant: z.boolean().default(false),
  displayOrder: z.number().int().min(0).default(0),
  tags: z.array(z.string().min(1).max(50)).max(20).default([]),
}).strict();