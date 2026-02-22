import { AttributeDetails } from "@/src/interfaces/attribute";
import { UpsertVariantForm } from "../validation/upsertVariantForm.schema";

export type UpsertVariantForm = {
    recordStatusId: number;

    stockQuantity: number;
    minStock?: number; // TODO: No se esta usando 

    price: number;
    discount?: number;

    tags: string[],

    images: {
        previewUrl: string;
        isPrimary: boolean;
        displayOrder: number;
        id?: number | undefined;
        fileId?: number | undefined;
        mediaFile?: {
            fileName: string;
            filePath: string;
            fileSize: number;
            mimeType: string;
        } | undefined;
    }[];

    attributes: AttributeDetails[]

};