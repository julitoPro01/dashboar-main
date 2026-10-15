import {z} from "zod";
import { categorizationSchema, gallerySchema } from "./form.schema";

export type CategorizationForm = z.infer<typeof categorizationSchema>;

export type GalleryForm = z.infer<typeof gallerySchema>;

