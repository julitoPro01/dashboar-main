import { GalleryForm } from "../../types";

export const mapImagesToDb = (images: GalleryForm["images"]) =>
     images.map(({ mediaFile, isPrimary }, i) => ({
        mediaFile: {
            fileName: mediaFile.fileName,
            filePath: mediaFile.filePath,
            mimeType: mediaFile.mimeType,
            fileSize: mediaFile.fileSize,
        },
        isPrimary, displayOrder: i + 1
    }))