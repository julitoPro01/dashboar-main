"use server"

import prisma from "@/lib/prisma"
import { ApiResponse, PromiseReturn } from "@/src/utils"
import { CategoryUpdateSchema } from "./schema/UpsertCategorySchema"
import { CategoryAttributeCreateManyInput, CategoryAttributeUpdateManyMutationInput } from "@/src/generated/prisma/models"


type CategoryAttr = {
    id?: number;
    categoryId?: number;
    attributeDefinitionId?: number;
    isRequired?: boolean;
    isFilter?: boolean;
    displayOrder?: number;
}

interface Props {
    data: any,
    id: number,
    childrenStatusId?: number,
    categoryAttrs?: CategoryAttr[],
    audi: { updateBy: string, updateById: number }
}

export const updateCategory = async ({ data, id, childrenStatusId, audi, categoryAttrs }: Props) => {

    return PromiseReturn(async () => {

        const parse = CategoryUpdateSchema.parse(data);

        const res = await prisma.category.update({
            where: { id },
            data: { ...parse, updatedBy: audi.updateBy, updatedById: audi.updateById },
            select: {
                id: true,
                name: true,
                description: true,
                recordStatusId: true,
                slug: true,
                imageUrl: true,
                parentId: true,
                isProductCategory: true
            }
        });

        if (childrenStatusId) {
            // 2) Obtener TODAS las categorías hijas (nivel infinito)
            const allChildIds = await getAllChildrenIds(res.id);

            // 3) Si hay hijos → actualizarlos en 1 sola operación
            if (allChildIds.length > 0) {
                await prisma.category.updateMany({
                    where: {
                        id: { in: allChildIds }
                    },
                    data: {
                        recordStatusId: childrenStatusId
                    }
                });
            }
        }

        if (categoryAttrs && categoryAttrs.length > 0) {

            const updateDate = categoryAttrs.filter(v => v.id);

            const newData = categoryAttrs.filter(v => !v.id).map(v => ({
                categoryId: v.categoryId,
                attributeDefinitionId: v.attributeDefinitionId,
                isRequired: v.isRequired,
                isFilter: v.isFilter
            })) as CategoryAttributeCreateManyInput[];

            if (newData.length > 0) {

                await prisma.categoryAttribute.createMany({
                    data: newData
                })

            }
            else if (updateDate.length > 0) {
                await prisma.categoryAttribute.updateMany({
                    data:updateDate.map<CategoryAttributeUpdateManyMutationInput>(v=>({
                        isFilter:v.isFilter,
                        isRequired:v.isRequired
                     }))
                })
            }
        }
        return ApiResponse.success("Categoría actualizado correctamente.", res)
    })
}

// Consultamos a los hijos con estados publicos
async function getAllChildrenIds(parentId: number, acc: number[] = []) {

    const children = await prisma.category.findMany({
        where: { parentId: parentId, recordStatus: { name: { in: ["ACTIVE"] } } },
        select: { id: true }
    });

    if (children.length === 0) return acc;

    for (const c of children) {
        acc.push(c.id);
        await getAllChildrenIds(c.id, acc); // recursión
    }

    return acc;
}
