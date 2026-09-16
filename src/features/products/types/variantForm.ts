import {z }from "zod";
import { variantFormSchema } from "./variantForm.schema";

export type VariantForm = z.infer<typeof variantFormSchema>;