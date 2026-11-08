import { z } from "zod";
import { InventoryPolicyType, PublicationStatusType, SaleStatusType } from '@/src/generated/prisma/enums';
import { imageSchema } from "../shared/schema";

const inventoryPolicySchema = z.enum(InventoryPolicyType);
const saleStatusSchema = z.enum(SaleStatusType);

export const createVariantSchema = z.object({
  productId: z.number().int().positive(),
  barCode: z.string().nullable().optional(),

  stockQuantity: z.number().int().min(0).max(1000000),
  minStock: z.number().int().min(0).max(100000).optional().nullable(),

  price: z.number().min(0).max(999999.99),
  discount: z.number().int().min(0).max(100).optional(),
  discountStartsAt: z.string().optional().nullable(),
  discountEndsAt: z.string().optional().nullable(),

  //TODO:Pendiente - Asignar valores despues
  tags: z.array(z.string().min(1).max(50)).max(20).optional(),

  inventoryPolicy: inventoryPolicySchema,
  saleStatus: saleStatusSchema,
  recordStatusId: z.number().int().positive(),

  systemAttributes: z.array(z.object({
    attributeDefinitionId: z.number().int(),
    valueText: z.string().trim().nullable().optional(),
    valueNumber: z.number().nullable().optional(),
    valueBoolean: z.boolean().nullable().optional(),
    valueDate: z.string().nullable().optional(),
    valueOptionIds: z.array(z.number()).optional()
  })).optional(),

  // images: imageSchema.shape.array().min(1, "Agrega al menos una imagen"),

  images: z.array(imageSchema).min(1, "Agrega al menos una imagen"),

  distributionChannels: z.object({
    storeFront: z.object({ publicationStatus: z.enum(PublicationStatusType, { error: "Selecciona un valor" }) }),
    marketplace: z.object({ publicationStatus: z.enum(PublicationStatusType, { error: "Selecciona un valor" }) }),
    physicalStore: z.object({ publicationStatus: z.enum(PublicationStatusType, { error: "Selecciona un valor" }) }),
    wholesale: z.object({ publicationStatus: z.enum(PublicationStatusType, { error: "Selecciona un valor" }) }),
  })

}).strict();




export const updateVariantSchema = z.object({
  id: z.number().int().positive(),
  productId: z.number().int().positive(),

  barCode: z.string().nullable().optional(),

  stockQuantity: z.number().int().min(0).max(1000000).optional(),
  minStock: z.number().int().min(0).max(100000).optional().nullable(),

  price: z.number().min(0).max(999999.99).optional(),
  discount: z.number().int().min(0).max(100).optional(),
  discountStartsAt: z.string().optional().nullable(),
  discountEndsAt: z.string().optional().nullable(),

  //TODO:Pendiente - Asignar valores despues
  tags: z.array(z.string().min(1).max(50)).max(20).optional(),

  inventoryPolicy: inventoryPolicySchema.optional(),
  saleStatus: saleStatusSchema.optional(),
  recordStatusId: z.number().int().positive().optional(),

  systemAttributes: z.array(z.object({
    attributeDefinitionId: z.number().int(),
    valueText: z.string().trim().nullable().optional(),
    valueNumber: z.number().nullable().optional(),
    valueBoolean: z.boolean().nullable().optional(),
    valueDate: z.string().nullable().optional(),
    valueOptionIds: z.array(z.number()).optional()
  })).optional(),

    images: z.array(imageSchema).min(1, "Agrega al menos una imagen").optional(),

  distributionChannels: z.object({
    storeFront: z.object({ publicationStatus: z.enum(PublicationStatusType, { error: "Selecciona un valor" }) }).optional(),
    marketplace: z.object({ publicationStatus: z.enum(PublicationStatusType, { error: "Selecciona un valor" }) }).optional(),
    physicalStore: z.object({ publicationStatus: z.enum(PublicationStatusType, { error: "Selecciona un valor" }) }).optional(),
    wholesale: z.object({ publicationStatus: z.enum(PublicationStatusType, { error: "Selecciona un valor" }) }).optional(),
  }).optional()

}).strict();
