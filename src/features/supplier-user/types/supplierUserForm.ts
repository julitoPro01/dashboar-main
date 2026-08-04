
import {z} from "zod";
import { supplierUserFormSchema } from "./SupplierUserForm.schema";

export type SupplierUserFormData = z.infer<typeof supplierUserFormSchema>;