import type { Prisma } from "@/src/generated/prisma/client";
import { RECORD_STATUS_ID } from "@/src/shared/domains/recordStatus";

const hasRequiredValue = (dataType: string, value: {
    valueText: string | null;
    valueNumber: number | null;
    valueBoolean: boolean | null;
    valueDate: Date | null;
    valueOptionIds: number[];
}) => {
    switch (dataType) {
        case "TEXT":
        case "LONG_TEXT":
        case "COLOR":
        case "URL":
        case "EMAIL":
        case "PHONE":
            return Boolean(value.valueText?.trim());
        case "NUMBER":
        case "DECIMAL":
            return value.valueNumber !== null;
        case "BOOLEAN":
            return value.valueBoolean !== null;
        case "DATE":
            return value.valueDate !== null;
        case "SELECT":
        case "MULTISELECT":
            return value.valueOptionIds.length > 0;
        default:
            return false;
    }
};

/** Returns a user-facing reason when a variant cannot transition to ACTIVE. */
export const validateVariantActivation = async (
    tx: Prisma.TransactionClient,
    productId: number,
    variantId: number,
): Promise<string | null> => {
    const product = await tx.product.findUnique({
        where: { id: productId },
        select: { recordStatusId: true, categoryId: true },
    });

    if (!product || product.recordStatusId === RECORD_STATUS_ID.DELETED) {
        return "No se encontró el producto base o ya fue eliminado.";
    }

    // Una variante puede activarse con el producto base en DRAFT o INACTIVE.
    // El producto base controla la comercialización y se activa en una acción independiente.
    if (product.recordStatusId === RECORD_STATUS_ID.ARCHIVED) {
        return "No puedes activar variantes mientras el producto base esté archivado. Restaura primero el producto.";
    }

    const imagesCount = await tx.productImage.count({ where: { variantId } });
    if (imagesCount === 0) {
        return "Agrega al menos una imagen a la variante antes de publicarla.";
    }

    const requiredAttributes = await tx.categoryAttribute.findMany({
        where: {
            categoryId: product.categoryId,
            isVariant: true,
            isRequired: true,
        },
        select: {
            attributeDefinition: {
                select: { id: true, name: true, dataType: true },
            },
        },
    });

    if (requiredAttributes.length === 0) return null;

    const values = await tx.variantAttributeValue.findMany({
        where: {
            variantId,
            attributeDefinitionId: {
                in: requiredAttributes.map(({ attributeDefinition }) => attributeDefinition.id),
            },
        },
        select: {
            attributeDefinitionId: true,
            valueText: true,
            valueNumber: true,
            valueBoolean: true,
            valueDate: true,
            valueOptionIds: true,
        },
    });

    const valueByAttributeId = new Map(values.map((value) => [value.attributeDefinitionId, value]));
    const missingAttributes = requiredAttributes
        .filter(({ attributeDefinition }) => {
            const value = valueByAttributeId.get(attributeDefinition.id);
            return !value || !hasRequiredValue(attributeDefinition.dataType, value);
        })
        .map(({ attributeDefinition }) => attributeDefinition.name);

    if (missingAttributes.length > 0) {
        return `Completa los campos obligatorios de la variante: ${missingAttributes.join(", ")}.`;
    }

    return null;
};
