import { z } from "zod";
import { basicInformationSchema, longDescriptionSchema, productFormSchema, supplierSchema } from "./productForm.schema";

export type ProductFormData = z.infer<typeof productFormSchema>;

export type ProductFormDataResponse = ProductFormData & {id:number};

export type BasicInformationForm = z.infer<typeof basicInformationSchema>;

export type SupplierForm = z.infer<typeof supplierSchema>;

export type longDescriptionForm = z.infer<typeof longDescriptionSchema>;
