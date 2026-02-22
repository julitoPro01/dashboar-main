
import { z } from 'zod';

export const CreateMediaFileSchema = z.object({
fileName:z.string().trim(),
filePath:z.string().trim(),
fileSize:z.int(),
mimeType:z.string(),

bucket:z.string().trim().optional(),
isPublic:z.boolean().optional().default(true),
metadata:z.json().optional(),
});

export const UpdateMediaFileSchema = z.object({
fileName:z.string().trim().optional(),
filePath:z.string().trim().optional(),
fileSize:z.int().optional(),
mimeType:z.string().optional(),
bucket:z.string().optional(),
isPublic:z.string().optional(),
metadata:z.json().optional(),
})