import {z}from "zod";
import { productFormSchema } from './productForm.schema';

export type ProductFormData = z.infer<typeof productFormSchema>

// type ProductForm = {
//     id?: number;

//     supplierId: number;
//     name: string;
//     parentSku: string;

//     shortDescription: string;
//     longDescription?: string;

//     slug: string;
    
//     recordStatusId: number;
//     saleStatusId: number;
//     inventoryStatusId: number;
// }