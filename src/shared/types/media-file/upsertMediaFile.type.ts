export interface UpsertMediaFile {
    id?: number;
    
    fileName?: string;
    filePath: string;
    fileSize?: number;
    mimeType?: string;
    
    isPublic?: boolean; // default true
    bucket?: string;
    metadata?: string;
    uploadedBy?: number; // Id del usuario 
}