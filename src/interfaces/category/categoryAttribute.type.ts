export interface CategoryAttr {
    id?: number;
    categoryId: number;
    attributeDefinitionId: number;
    isRequired: boolean;
    isFilter: boolean;
    displayOrder?: number;
}
