import {z} from "zod";
import { UpsertSupplierFormSchema } from "../shared/upsertSupplierForm.schema";

export type UpsertSupplierForm = z.infer<typeof UpsertSupplierFormSchema>;
