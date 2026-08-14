"use server";

import prisma from "@/lib/prisma";
import { CategoryAttributeGroupResponse } from "@/src/features/products/types";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";

interface Props {
    categoryId: number,
    isVariant?: boolean
}
export const getCategoryAttributes = async ({ categoryId, isVariant = false }: Props) => {

    return PromiseReturn(async () => {

        const res = await prisma.categoryAttribute.findMany({
            where: { categoryId, isVariant },
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
                        }
                    }
                }

            }
        })

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

                options: rest.attributeDefinition.systemAttributeValue?.map(s => ({
                    id: s.id,
                    value: s.value,
                    displayOrder: s.displayOrder
                })).sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ? b.displayOrder : 0))
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
                ...v, attributes: v.attributes.sort((a, b) => {

                    return (a.displayOrder ?? 0) - (b.displayOrder ? b.displayOrder : 0)
                })
            }))
        )
    });

}
