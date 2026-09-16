import { RecordStatusDb } from "@/src/shared/domains/recordStatus";

export interface CategoryTreeResponse {
    id: number;
    publicId: string;
    name: string;
    parentId: number | null;
    level: number;
    path: string;
    recordStatus: {
        name: RecordStatusDb;
    };
    children: CategoryTreeNode[];
    _count: {
        categoryAttributes: number;
    };
}


export interface CategoryTreeNode extends CategoryTreeResponse{
    isCreating?:boolean;
}