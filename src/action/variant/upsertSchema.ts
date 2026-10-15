import { z } from "zod";
import { InventoryPolicyType, InventoryStatusType, SaleStatusType } from '@/src/generated/prisma/enums';

const inventoryPolicySchema = z.enum(InventoryPolicyType);
const saleStatusSchema = z.enum(SaleStatusType);
const inventoryStatusSchema = z.enum(InventoryStatusType);

export const createVariantSchema = z.object({
  productId: z.number().int().positive(),
  barCode: z.string().nullable().optional(),

  stockQuantity: z.number().int().min(0).max(1000000),
  minStock: z.number().int().min(0).max(100000).optional().nullable(),

  price: z.number().min(0).max(999999.99),
  discount: z.number().int().min(0).max(100).optional(),
  discountStartsAt: z.string().optional(),
  discountEndsAt: z.string().optional(),

  isMainVariant: z.boolean().default(false),

  //TODO:Pendiente - Asignar valores despues
  tags: z.array(z.string().min(1).max(50)).max(20).optional(),

  inventoryPolicy: inventoryPolicySchema,
  saleStatus: saleStatusSchema,
  inventoryStatus: inventoryStatusSchema,
  recordStatusId: z.number().int().positive(),

  systemAttributes: z.array(z.object({
    attributeDefinitionId: z.number().int(),
    valueText: z.string().trim().nullable().optional(),
    valueNumber: z.number().nullable().optional(),
    valueBoolean: z.boolean().nullable().optional(),
    valueDate: z.string().nullable().optional(),
    valueOptionIds: z.array(z.number()).optional()
  })).optional(),

  images: z.array(z.object({
    isPrimary: z.boolean(),
    displayOrder: z.number().positive(),
    mediaFile: z.object({
      fileName: z.string().trim(),
      filePath: z.string().trim(),
      fileSize: z.number(),
      mimeType: z.string().trim()
    })
  })).min(1, "Agrega al menos una imagen"),

}).strict();

