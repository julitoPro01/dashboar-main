import { z } from "zod";
import { InventoryPolicyTypeDb, PublicationStatusTypeDb, SaleStatusTypeDb } from "../variant/typeDb";
import { SALE_STATUS_BY_INVENTORY_POLICY } from "../../constants";
import { categorizationSchema, gallerySchema } from "../form.schema";



const commercialInfoSchema = z.object({
    commercialInfo: z.object({
        //TODO: Solo para mostrar en la UI
        sku: z.string().nullable().optional(),
        
        barCode: z.string().nullable().optional(),
        basePrice: z.number("Ingrese el precio base")
            .min(0, "El valor no puede ser negativo")
            .max(999_999.99, "El valor no puede superar S/ 999,999.99"),
        discount: z.number().int("El valor debe ser un número entero")
            .min(0, "El valor no puede ser negativo")
            .max(100, "El valor no puede superar el 100%")
            .optional(),
        discountStartsAt: z.string().nullable().optional(),
        discountEndsAt: z.string().nullable().optional(),
    }).optional()
});

export const inventoryPolicyTypeSchema = z.enum(InventoryPolicyTypeDb, "Selecciona un valor");
const operationStatusSchema = z.object({
    operationStatus: z.object({
        recordStatusId: z.number("Selecciona un valor"),
        saleStatus: z.enum(SaleStatusTypeDb, "Selecciona un valor"),

        inventoryPolicy: z.object({
            type: inventoryPolicyTypeSchema,
            stockQuantity: z.number("Ingrese el stock inicial")
                .int("El valor debe ser un número entero")
                .min(0, "El valor no puede ser negativo")
                .max(1_000_000, "El valor no puede superar 1,000,000"),
            minStock: z.number()
                .int("El valor debe ser un número entero")
                .min(0, "El valor no puede ser negativo")
                .max(1_000, "El valor no puede superar 1,000")
                .optional()
        }),

    }).refine(
        ({ saleStatus, inventoryPolicy }) =>
            SALE_STATUS_BY_INVENTORY_POLICY[inventoryPolicy.type].includes(
                saleStatus as never
            ),
        {
            path: ["saleStatus"],
            message: "El estado de venta no aplica al régimen de inventario.",
        }
    )
});

const catalogRulesSchema = z.object({
    catalogRules: z.object({
        isMainVariant: z.boolean(),

    })
})

export const publicationStatusSchema = z.enum(PublicationStatusTypeDb, {
    error: "Selecciona un valor"
})
const distributionChannelsSchema = z.object({
    distributionChannels: z.object({
        storeFront: z.object({ publicationStatus: publicationStatusSchema }),
        marketplace: z.object({ publicationStatus: publicationStatusSchema }),
        physicalStore: z.object({ publicationStatus: publicationStatusSchema }),
        wholesale: z.object({ publicationStatus: publicationStatusSchema }),
    })
})

export const variantFormSchema = z.object({
    ...categorizationSchema.shape,
    ...commercialInfoSchema.shape,
    ...gallerySchema.shape,
    ...operationStatusSchema.shape,
    ...distributionChannelsSchema.shape,
    ...catalogRulesSchema.shape
})