"use server";
import { APP_ROUTES } from "@/src/shared/routes"
import { revalidatePath } from "next/cache";

export const revalidateCategories = async()=>{
    revalidatePath(APP_ROUTES.CATEGORIES.INDEX);
}