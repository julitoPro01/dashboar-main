
export interface UpsertCategory {
    name: string;
    description?: string | null;
    recordStatusId: number;
    slug: string;
    imageUrl?: string | null;
    parentId?: number | null;
    isProductCategory?: Boolean | null;
}
