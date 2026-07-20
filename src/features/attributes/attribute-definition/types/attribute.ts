import { AttributeDataType, DisplayGroup } from "@/src/generated/prisma/enums";

export type AttributeDataTypeDb = AttributeDataType;

// Tipo para crear/actualizar
export type UpsertAttributeForm = {
    name: string;
    dataType?: AttributeDataTypeDb;
    // isOptionValues?:boolean;
    isSupportValues?: boolean;
    description?: string;
    isActive: boolean;

    //AttributeValueOption
    // isSystemDefault: boolean;
    value: string;
    values: { value: string, displayOrder: number, id: number, isSystemDefault: true }[];
}
