"use server";

import type { AttributeDataTypeDb } from "@/src/features/attributes/attribute-definition/types";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { editAttrDefinitionSchema } from "./schema/upsert";
import prisma from "@/lib/prisma";

interface SystemAttributeValue {
    id?: number;
    value: string;
    displayOrder: number;
}

interface Props {
    id: number;
    name?: string;
    description?: string;
    dataType?: AttributeDataTypeDb;
    isActive?: boolean;
    values?: SystemAttributeValue[];
    updatedBy: string;
    updatedById: number;
}

export const editAttrDefinition = async (params: Props) => {

    return PromiseReturn(async () => {

        const { id, ...pars } = params;

        const { values, ...parse } = editAttrDefinitionSchema.parse(pars);
        console.log(values)
        await prisma.attributeDefinition.update({
            where: { id },
            data: {
                ...parse,
                systemAttributeValue:
                    !values
                        ? undefined
                        : {
                            deleteMany: {
                                id: {
                                    notIn: values?.filter(v => v.id)
                                        .map(v => v.id!)
                                }
                            },

                            update: values?.filter(v => v.id)
                                .map(v => ({
                                    where: { id: v.id! },
                                    data: {
                                        value: v.value,
                                        displayOrder: v.displayOrder,
                                    }
                                })),

                            create: values?.filter(v => !v.id)
                                .map(v => ({
                                    value: v.value,
                                    displayOrder: v.displayOrder,
                                }))
                        }
            }
        })

        return ApiResponse.success("", parse);
    });
}
