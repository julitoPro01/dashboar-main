
"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { updateGallerySchema } from "./schema/upsertProduct";

interface PayloadProps {
    productId: number;
    images: z.infer<typeof updateGallerySchema>;
}

export const updateGallery = async ({
    productId,
    images
}: PayloadProps) => {

    return PromiseReturn(async () => {

        const parse = updateGallerySchema.parse(images)

        await prisma.$transaction(async (tx) => {

            const keepImageIds = parse
                .filter(image => image.id)
                .map(image => image.id as number);

            // Eliminar las imágenes que ya no existen
            await tx.mediaFile.deleteMany({
                where: {
                    productImage: {
                        productId
                    },
                    id: {
                        notIn: keepImageIds
                    }
                }
            });

            // Crear nuevas imágenes
            const createImages = images.filter(image => !image.id);

            for (const image of createImages) {

                await tx.mediaFile.create({
                    data: {
                        fileName: image.mediaFile.fileName,
                        filePath: image.mediaFile.filePath,
                        mimeType: image.mediaFile.mimeType,
                        fileSize: image.mediaFile.fileSize,

                        productImage: {
                            create: {
                                productId,
                                isPrimary: image.isPrimary,
                                displayOrder: image.displayOrder
                            }
                        }
                    }
                });
            }

            // Actualizar imágenes existentes
            const updateImages = images.filter(image => image.id);

            for (const image of updateImages) {

                await tx.mediaFile.update({
                    where: {
                        id: image.id
                    },
                    data: {
                        fileName: image.mediaFile.fileName,
                        filePath: image.mediaFile.filePath,
                        mimeType: image.mediaFile.mimeType,
                        fileSize: image.mediaFile.fileSize,

                        productImage: {
                            update: {
                                where: {
                                    productId
                                },
                                data: {
                                    isPrimary: image.isPrimary,
                                    displayOrder: image.displayOrder
                                }
                            }
                        }
                    }
                });
            }
        });

        return ApiResponse.success(
            "Imágenes actualizadas correctamente."
        );
    });
};
