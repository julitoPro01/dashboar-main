import { AttributeDataType as AttributeDataTypeDb} from "@/src/generated/prisma/enums";

export {AttributeDataTypeDb};

// Tipo para crear/actualizar
export type UpsertAttributeForm = {
    name: string;
    dataType?: AttributeDataTypeDb;

    isSupportValues?: boolean;
    description?: string;
    isActive: boolean;


    value: string;
    values: { value: string, displayOrder: number, id: number }[];
}

