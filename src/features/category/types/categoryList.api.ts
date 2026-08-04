import { RecordStatusDb } from "@/src/shared/domains/status";

//--------LIST - ITEM ----------
export type CategoryResponse = {
    id: number;
    publicId: string;
    name: string;
    recordStatus: RecordStatusDb;
    description?: string | null;
    imageUrl?: string | null;
    slug?: string | null;
    parentId?: number | null;
    level: number;
    path: string;
    hasChildren: boolean;
    hasAttributes:boolean;
};
