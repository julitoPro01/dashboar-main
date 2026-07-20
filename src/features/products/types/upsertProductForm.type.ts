import {z} from "zod";
import { UpsertProductFormSchema } from "../shared/ProductForm.schema";

export type UpsertProductForm = z.infer<typeof UpsertProductFormSchema>
