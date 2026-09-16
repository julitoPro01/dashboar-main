import { z } from "zod";
import { basicInformationSchema, categorizationSchema, customAttributesSchema, gallerySchema, productFormSchema, supplierSchema } from "./productForm.schema";

export type ProductFormData = z.infer<typeof productFormSchema>;

export type ProductFormDataResponse = Omit<ProductFormData, "customAttributes"> & {id:number};

export type BasicInformationForm = z.infer<typeof basicInformationSchema>;
export type CategorizationForm = z.infer<typeof categorizationSchema>;

export type GalleryForm = z.infer<typeof gallerySchema>;

export type CustomAttributeForm = z.infer<typeof customAttributesSchema>;

export type SupplierForm = z.infer<typeof supplierSchema>;

