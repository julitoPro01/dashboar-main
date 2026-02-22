
import {z} from "zod";
import { UpsertSupplierUserFormSchema } from "./upsertSupplierUserForm.schema";

export type UpsertSupplierUserForm = z.infer<typeof UpsertSupplierUserFormSchema>;