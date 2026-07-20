import { getCategories } from "@/src/action/category";
import { NextResponse } from "next/server";

//TODO: No se esta usando
export async function GET() {
    // La lógica de Prisma vive en 'lib', no aquí
    const res = await getCategories({ mains: true });
    return NextResponse.json(res);
}