import {z} from "zod";
import { supplierFormSchema } from "./supplierForm.schema";

export type SupplierForm = z.infer<typeof supplierFormSchema>;
