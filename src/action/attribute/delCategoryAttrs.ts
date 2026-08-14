"use server"
import prisma from "@/lib/prisma";
import { ApiEntityInUseData, ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { revalidateCategories } from "../category";


export const delCategoryAttrs = async ({ del, updateIds }: { del: { id: number, name: string }[], updateIds: number[] }) => {
    return PromiseReturn(async () => {

        // Invalidamos la ruta de cache, para traer datos frescos
        await revalidateCategories()

        const deleteIds = del.map(v => v.id);

        const p_count = prisma.productAttributeValue.groupBy({
            by: ["attributeDefinitionId"],
            where: { attributeDefinitionId: { in: deleteIds } },
            _count: { _all: true },
        });

        const v_count = prisma.variantAttributeValue.groupBy({
            by: ["attributeDefinitionId"],
            where: { attributeDefinitionId: { in: deleteIds } },
            _count: { _all: true }
        });
        const [p_count_res, v_count_res] = await prisma.$transaction([p_count, v_count]);

        // --- Mapeamos a valor detallado
        const p_mapped = del.map(v => {
            const match = p_count_res.find(g => g.attributeDefinitionId === v.id);
            return {
                attributeDefinitionId: v.id,
                name: v.name,
                _count: {
                    _all: match ? match._count._all : 0
                }
            };
        })

        const v_mapped = del.map(v => {
            const match = v_count_res.find(g => g.attributeDefinitionId === v.id);

            return {
                attributeDefinitionId: v.id,
                name: v.name,
                _count: {
                    _all: match ? match._count._all : 0
                }
            };
        })
        
        // d = eliminar - u = actualizar
        const products = p_mapped.reduce((prev, curr) => {
            if (curr._count._all < 1)
                prev.d = [...prev.d, curr.attributeDefinitionId];
            else
                prev.u = [...prev.u, curr.attributeDefinitionId];
            return prev;
        }, { d: [], u: [] } as { d: number[], u: number[] });

        const variants = v_mapped.reduce((prev, curr) => {
            if (curr._count._all < 1)
                prev.d = [...prev.d, curr.attributeDefinitionId];
            else
                prev.u = [...prev.u, curr.attributeDefinitionId];
            return prev;
        }, { d: [], u: [] } as { d: number[], u: number[] });
        //----------------

        await prisma.categoryAttribute.deleteMany({
            where: { attributeDefinitionId: { in: [...products.d, ...variants.d] } }
        });

        const u_ids_all = [...updateIds, ...products.u, ...variants.u]
        if (deleteIds.length) {

            await Promise.all(u_ids_all.map((id, i) =>
                prisma.categoryAttribute.updateMany({
                    where: {
                        attributeDefinitionId: id
                    },
                    data: {
                        displayOrder: i + 1
                    }
                })
            ))
        }

        // --- Si no existen valores en actualizar = no hay referencias encontradas
        if (products.u.length < 1 && variants.u.length < 1) {

            return ApiResponse.success("Se eliminó con éxito.")
        }

        // ---- isOk:true = ELIMINADO
        const all_ids = [
            ...p_mapped.map(v => ({ id: v.attributeDefinitionId, isOk: v._count._all < 1, entity: "Producto / Valor", count: v._count._all, name: v.name })),
            ...v_mapped.map(v => ({ id: v.attributeDefinitionId, isOk: v._count._all < 1, entity: "Variante / Valor", count: v._count._all, name: v.name })),
        ]


        return ApiResponse.badRequest<ApiEntityInUseData[]>("No se puede eliminar el atributo porque está siendo utilizado.", "ENTITY_IN_USE", undefined,
            all_ids
        )


    })
};