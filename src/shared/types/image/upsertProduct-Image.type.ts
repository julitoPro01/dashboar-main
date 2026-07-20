import { UpsertMediaFile } from "../media-file";

export interface UpsertProductImage {
    id?: number;
    productId?: number;
    fileId?: number;
    
    isPrimary: boolean;
    displayOrder: number;
    mediaFile:UpsertMediaFile

    isFeatured?:boolean; 
    featuredOrder?:number;
    description?: string;
    
}