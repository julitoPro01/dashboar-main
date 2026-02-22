import {z} from "zod";
import { UpsertSupplierFormSchema } from "./upsertSupplierForm.schema";

export type UpsertSupplierForm = z.infer<typeof UpsertSupplierFormSchema>;
