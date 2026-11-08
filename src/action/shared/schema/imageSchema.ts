import { z } from "zod";

export const imageSchema = z.object({
        id:z.number().optional(),
        isPrimary: z.boolean(),
        displayOrder: z.number(),
        bucket: z.string().optional().nullable(),
        
        mediaFile: z.object({
            fileName: z.string().trim(),
            filePath: z.string().trim(),
            fileSize: z.number(),
            mimeType: z.string().trim()
        })
    })
