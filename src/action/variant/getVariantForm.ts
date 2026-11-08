"use server";

import prisma from "@/lib/prisma";
import { getSystemAttributes } from "@/src/action/product/form/getSystemAttributes";
import type { VariantForm } from "@/src/features/products/types";
import { PUBLICATION_STATUS } from "@/src/features/products/shared/catalog";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { z } from "zod";
import { toPeruDateTimeInput } from "@/src/shared/utils/date";

interface Props {
    variantId: number;
}

const getVariantFormSchema = z.object({
    variantId: z.number().int().positive(),
}).strict();



export const getVariantForm = async (input: Props) => PromiseReturn(async () => {
    const { variantId } = getVariantFormSchema.parse(input);

    const variant = await prisma.productVariant.findUnique({
        where: { id: variantId },
        select: {
            id: true,
            sku: true,
            barcode: true,
            price: true,
            discount: true,
            discountStartsAt: true,
            discountEndsAt: true,
            stockQuantity: true,
            minStock: true,
            recordStatusId: true,
            saleStatus: true,
            inventoryPolicy: true,
            product: {
                select: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                            path: true,
                        },
                    },
                },
            },
            images: {
                orderBy: { displayOrder: "asc" },
                select: {
                    id: true,
                    isPrimary: true,
                    displayOrder: true,
                    mediaFile: {
                        select: {
                            id: true,
                            fileName: true,
                            filePath: true,
                            fileSize: true,
                            mimeType: true,
                            isPublic: true,
                            bucket: true,
                        },
                    },
                },
            },
            variantChannel: {
                select: {
                    channel: true,
                    publicationStatus: true,
                },
            },
        },
    });

    if (!variant) return ApiResponse.notFound("No se encontró la variante.");

    const attributeResponse = await getSystemAttributes({
        categoryId: variant.product.category.id,
        entity: "variant",
        id: variantId,
    });

    if (!attributeResponse.ok) return attributeResponse;

    const channelStatus = new Map(
        variant.variantChannel.map(({ channel, publicationStatus }) => [channel, publicationStatus]),
    );

    const formData: VariantForm = {
        categorization: {
            category: variant.product.category,
            systemAttributes: attributeResponse.data.map(({ group, attributes }) => ({
                group,
                attributes: attributes.map((attribute) => ({
                    attributeDefinitionId: attribute.attributeDefinitionId,
                    name: attribute.name,
                    dataType: attribute.dataType,
                    systemAttributeValues: attribute.systemAttributeValues?.map(({ id, value }) => ({ id, value })),
                    valueText: attribute.valueText,
                    valueNumber: attribute.valueNumber,
                    valueBoolean: attribute.valueBoolean,
                    valueDate: attribute.valueDate,
                    valueOptionIds: attribute.valueOptionIds,
                    isRequired: attribute.isRequired,
                })),
            })),
        },
        commercialInfo: {
            sku: variant.sku,
            barCode: variant.barcode,
            basePrice: Number(variant.price),
            discount: Number(variant.discount),
            discountStartsAt: toPeruDateTimeInput(variant.discountStartsAt),
            discountEndsAt: toPeruDateTimeInput(variant.discountEndsAt),
        },
        images: variant.images.map((image) => ({
            id: image.id,
            isPrimary: image.isPrimary,
            displayOrder: image.displayOrder,
            mediaFile: image.mediaFile,
        })),
        operationStatus: {
            recordStatusId: variant.recordStatusId,
            saleStatus: variant.saleStatus,
            inventoryPolicy: {
                type: variant.inventoryPolicy,
                stockQuantity: variant.stockQuantity,
                minStock: variant.minStock,
            },
        },
        distributionChannels: {
            storeFront: {
                publicationStatus: channelStatus.get("STOREFRONT") ?? PUBLICATION_STATUS.DRAFT,
            },
            marketplace: {
                publicationStatus: channelStatus.get("MARKETPLACE") ?? PUBLICATION_STATUS.DRAFT,
            },
            physicalStore: {
                publicationStatus: channelStatus.get("PHYSICAL_STORE") ?? PUBLICATION_STATUS.DRAFT,
            },
            wholesale: {
                publicationStatus: channelStatus.get("WHOLESALE") ?? PUBLICATION_STATUS.DRAFT,
            },
        },
    };



    return ApiResponse.success<VariantForm>("Datos de la variante obtenidos correctamente.", formData);
});
