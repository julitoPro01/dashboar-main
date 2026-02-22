import {z} from "zod";
import { upsertProductSchema } from "../validation/upsertProductForm.schema";

export type UpsertProductForm = z.infer<typeof upsertProductSchema>;