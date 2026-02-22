
//------------------
export type CategoryResponse = {
    id: number;
    name: string;
    description?: string | null;
    recordStatusId: number;
    slug: string;
    imageUrl?: string | null;
    parentId?: number | null;
    isProductCategory?: Boolean | null;
};

export type CategoriesResponse = CategoryResponse[];

//-------------------------

export interface CategoryTreeResponse extends CategoryResponse{
    children:CategoryTreeResponse[]
} 
