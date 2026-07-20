"use server";

import prisma from "@/lib/prisma";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";

interface Props {
    id: number;
    parentId?: number;
}

export const deleteCategory = async ({ id, parentId }: Props) => {

    const resp = {
        isRootCategory: false, // Si es categoría raíz (no tiene padre)
        hasSibling: false, // Si es subcategoría, si tiene hermanos (otras subcategorías con el mismo padre)
        parentIsRootCategory: false // Si es subcategoría, si su padre es categoría raíz (no tiene padre)
    }

    return PromiseReturn(async () => {
        
        await prisma.category.delete({ where: { id } });

        // Es subcategoría, verificamos si tiene hijos.
        if (parentId) {
            const find = await prisma.category.findUnique({
                where: { id: parentId },
                select: {
                    parentId: true,
                    _count: { select: { children: true } }
                }
            });

            resp.hasSibling = find?._count.children! > 0;
            resp.parentIsRootCategory = !find?.parentId;
        } else {
            resp.isRootCategory = true;
        }



        return ApiResponse.success("Categoría eliminada correctamente", resp);

    });
}