export type CategoryAttributeResponse =
    {
        id: number;
        categoryId: number;
        attributeDefinitionId: number;
        isRequired: boolean;
        isFilter: boolean;
        displayOrder: number | null;
        attributeDefinition: {
            name: string;
            toProduct: boolean;
        };
    }


export type CategoryAttributesResponse = CategoryAttributeResponse[]