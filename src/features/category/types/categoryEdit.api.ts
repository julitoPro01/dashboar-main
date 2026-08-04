// ------------ EDIT --------------

export interface CategoryEditResponse {
    id: number;
    name: string;
    description: string | null;
    slug: string;
    imageUrl: string | null;
    parentId:number  | null;
    createdAt: Date;
    updatedAt: Date | null;
    recordStatusId: number;
}

