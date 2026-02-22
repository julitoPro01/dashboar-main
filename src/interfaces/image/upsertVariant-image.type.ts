import { UpsertMediaFile } from "../media-file";

export interface UpsertVariantImage {
    id?: number;
    variantId?: number;
    fileId?: number;

    isPrimary?: boolean;
    displayOrder?: number;
    mediaFile: UpsertMediaFile

    isFeatured?: boolean;
    featuredOrder?: number;
    description?: string;
}   