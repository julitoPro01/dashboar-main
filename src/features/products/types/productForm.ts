import {z}from "zod";
import {  productFormSchema } from "./productForm.schema";

export interface ProductFormData extends z.infer<typeof productFormSchema> {
}

