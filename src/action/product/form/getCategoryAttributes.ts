"use server";

import prisma from "@/lib/prisma";
import { CategoryAttributeGroupResponse } from "@/src/features/products/types";
import { Prisma } from "@/src/generated/prisma/client";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { formatInputDate } from "@/src/shared/utils/date";

export type CategoryAttributesPayload = {
    categoryId: number,
    entity: "product" | "variant"
    id?: number;
} 



export const getCategoryAttributes = async ({ categoryId, ...props }: CategoryAttributesPayload) => {

    return PromiseReturn(async () => {

        if (!categoryId)
            return ApiResponse.success("", []);

        const where: Prisma.CategoryAttributeWhereInput = {
            categoryId, isVariant: props.entity === "variant"
        }

        const res = await prisma.categoryAttribute.findMany({
            where,
            select: {
                id: true,
                isRequired: true,
                isFilter: true,
                isVariant: true,
                displayOrder: true,
                displayGroup: true,


                attributeDefinition: {
                    select: {
                        id: true,
                        name: true,
                        dataType: true,
                        description: true,

                        systemAttributeValue: {
                            select: {
                                id: true,
                                value: true,
                                displayOrder: true
                            }
                        },

                        ...( (props.entity==="product" && props.id) && {
                            productAttributeValues: {
                                where: { productId: props.id },
                                select: {
                                    customName: true,
                                    valueText: true,
                                    valueNumber: true,
                                    valueBoolean: true,
                                    valueDate: true,
                                    valueOptionIds: true
                                }
                            }
                        }),

                        ...( (props.entity==="variant" && props.id) && {
                            variantAttributeValues: {
                                where: { variantId: props.id },
                                select: {
                                    customName: true,
                                    valueText: true,
                                    valueNumber: true,
                                    valueBoolean: true,
                                    valueDate: true,
                                    valueOptionIds: true
                                }
                            }
                        })
                    }
                }


            }
        });

        const mapped = res.reduce((prev, curr) => {
            const { displayGroup, ...rest } = curr

            const attr = {
                attributeDefinitionId: rest.attributeDefinition.id,
                name: rest.attributeDefinition.name,
                description: rest.attributeDefinition.description,
                dataType: rest.attributeDefinition.dataType,

                isRequired: rest.isRequired,
                isFilter: rest.isFilter,
                isVariant: rest.isVariant,

                displayOrder: rest.displayOrder,

                ...((props.entity === "product")
                    ? {
                        valueText: rest.attributeDefinition.productAttributeValues?.[0]?.valueText ?? "",
                        valueNumber: rest.attributeDefinition.productAttributeValues?.[0]?.valueNumber ?? 0,
                        valueBoolean: rest.attributeDefinition.productAttributeValues?.[0]?.valueBoolean ?? false,
                        valueDate: rest.attributeDefinition.productAttributeValues?.[0]?.valueDate
                            ? formatInputDate(rest.attributeDefinition.productAttributeValues?.[0]?.valueDate) : "",
                        valueOptionIds: rest.attributeDefinition.productAttributeValues?.[0]?.valueOptionIds ?? [],
                    }
                    : {
                        valueText: rest.attributeDefinition.variantAttributeValues?.[0]?.valueText ?? "",
                        valueNumber: rest.attributeDefinition.variantAttributeValues?.[0]?.valueNumber ?? 0,
                        valueBoolean: rest.attributeDefinition.variantAttributeValues?.[0]?.valueBoolean ?? false,
                        valueDate: rest.attributeDefinition.variantAttributeValues?.[0]?.valueDate
                            ? formatInputDate(rest.attributeDefinition.variantAttributeValues?.[0]?.valueDate) : "",
                        valueOptionIds: rest.attributeDefinition.variantAttributeValues?.[0]?.valueOptionIds ?? [],
                    }
                ),

                systemAttributeValues: rest.attributeDefinition.systemAttributeValue?.map(s => ({
                    id: s.id,
                    value: s.value,
                    displayOrder: s.displayOrder
                })).sort(
                    (a, b) =>
                        (a.displayOrder ?? 0) -
                        (b.displayOrder ?? 0)
                )
            }

            const f = prev.find(v => v.group === curr.displayGroup)
            if (f)
                f.attributes.push(attr)
            else {
                prev.push({
                    group: displayGroup,
                    attributes: [attr]
                })
            }


            return prev;
        }, [] as CategoryAttributeGroupResponse[])

        return ApiResponse.success<CategoryAttributeGroupResponse[]>("Listas optenidas correctamente",
            mapped.map(v => ({
                ...v,
                attributes: v.attributes.sort(
                    (a, b) =>
                        (a.displayOrder ?? 0) -
                        (b.displayOrder ?? 0)
                )
            }))
        )
    });

}
