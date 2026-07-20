import { RecordStatusDb } from "@/src/shared/domains/status";

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
    children: CategoryTreeResponse[];
    _count: {
        categoryAttributes: number;
    };
}
