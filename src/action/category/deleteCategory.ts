"use server";

import prisma from "@/lib/prisma";
import { ApiEntityInUseData, ApiResponse, PromiseReturn } from "@/src/shared/utils";

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

 const res = await PromiseReturn(async () => {
        
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


    if(!res.ok && res.errorCode==="ENTITY_IN_USE"){

        return await PromiseReturn(async()=>{

            const products = prisma.productCategory.count({where:{categoryId:id}});
            const promotions = prisma.promotion.count({where:{categoryId:id}});

            const [one,two] = await prisma.$transaction([products,promotions]);

            return ApiResponse.badRequest("","ENTITY_IN_USE",undefined,[
                {entity:"Producto / Categoría",count:one},
                {entity:"Promoción",count:two}
            ])
        })
    }

    return res;
}