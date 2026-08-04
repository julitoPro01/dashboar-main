"use server";

import prisma from "@/lib/prisma";
import { ApiEntityInUseData, ApiResponse, PromiseReturn } from "@/src/shared/utils";

export const delAttrDefinition = async (id: number) => {

    const res = await PromiseReturn(async () => {

        await prisma.attributeDefinition.delete({ where: { id } });
        return ApiResponse.success("");
    });
  
    if (!res.ok && res.errorCode === "ENTITY_IN_USE") {

        const catgAttr = prisma.categoryAttribute.count({
            where: { attributeDefinitionId: id }
        });

        const prodAttrValue = prisma.productAttributeValue.count({
            where: { attributeDefinitionId: id }
        });

        const varAttrValue = prisma.variantAttributeValue.count({
            where: { attributeDefinitionId: id }
        });

        // ----- ELIMINACIÓN AUTOMATICA EN CASCADA-----------
        // const attrValOption = prisma.attributeValueOption.count({
        //     where: { attributeDefinitionId: id }
        // });


        return await PromiseReturn(async () => {
            const [category, product, variant] = await prisma.$transaction([catgAttr, prodAttrValue, varAttrValue]);

            return ApiResponse.badRequest("No se puede eliminar el atributo porque está siendo utilizado.", "ENTITY_IN_USE", undefined,
                [
                    { entity: "Categoría / Attributo", count: category },
                    { entity: "Producto / Valor", count: product },
                    { entity: "Variante / Valor", count: variant },
                ])
        })

    };

    return res;
} 