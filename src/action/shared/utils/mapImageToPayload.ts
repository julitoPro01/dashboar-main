import { z } from "zod"
import { imageSchema } from "../schema"

type MapImageToSave = z.infer<typeof imageSchema>

export const mapImagesToPayload = (images: MapImageToSave[]) =>
    images.map(({ mediaFile, isPrimary, id }, i) => ({
        id,
        mediaFile: {
            fileName: mediaFile.fileName,
            filePath: mediaFile.filePath,
            mimeType: mediaFile.mimeType,
            fileSize: mediaFile.fileSize,
        },
        isPrimary, displayOrder: i + 1
    }))