"use server";

import prisma from "@/lib/prisma";
import { PreviewProductDetailsResponse } from "@/src/features/products/details/types";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";

interface Props {
    id: number;
}

export const getPreviewProductDetails = async ({ id }: Props) => {
    return PromiseReturn<PreviewProductDetailsResponse>(async () => {

        const res = await prisma.product.findUnique({
            where: { id },
            select: {
                id: true,
                publicId:true,
                supplier: { select: { name: true } },
                recordStatus: { select: { name: true } },
                verificationStatus: { select: { name: true } },
                name: true,
                shortDescription: true,
                longDescription: true,
                images:{select:{ id:true, isPrimary:true, displayOrder:true, mediaFile:{select:{filePath:true}} }},
                productVariants: {
                    select: {
                        id: true,
                        recordStatus: { select: { name: true } },
                        sku: true,
                        stockQuantity: true,
                        price: true,
                        discount: true
                    }
                }
            }
        })

        if (!res)
            return ApiResponse.notFound();

        return ApiResponse.success("Consulta exitosa.", {
            id: res.id,
            publicId:res.publicId,
            supplier: res.supplier!.name,
            status: res.recordStatus.name,
            verificationStatus: res.verificationStatus.name,
            name: res.name,
            shortDescription: res.shortDescription,
            longDescription: res.longDescription,
            images: res.images.map(v=>({ 
                id:v.id,
                url:v.mediaFile.filePath,
                isPrimary:v.isPrimary,
                displayOrder:v.displayOrder
             })).sort((a,b)=>(a.displayOrder - b.displayOrder)),
            variants: res.productVariants.map(v => ({
                id: v.id,
                status: v.recordStatus.name,
                sku: v.sku,
                stockQuantity: v.stockQuantity,
                price: v.price as any,
                discount: v.discount as any
            }))
        })
    })
}