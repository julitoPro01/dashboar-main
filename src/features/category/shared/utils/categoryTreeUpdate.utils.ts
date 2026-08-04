import { CategoryTreeNode } from "../../types";

export const newSubCategory = (categories: CategoryTreeNode[], id: number, category: CategoryTreeNode): CategoryTreeNode[] => {
    let exists = false;

    const recursive = (categories: CategoryTreeNode[], id: number, category: CategoryTreeNode): CategoryTreeNode[] => {
        return categories.map<CategoryTreeNode>((val: any) => {
            if (val.id === id) {
                exists = true;
                return {
                    ...val,
                    children: [
                        category,
                        ...val.children
                    ]
                };
            } else if (val.children) {
                const children = recursive(val.children, id, category)
                if (children.length > 0) return { ...val, children }
            }
            return val;
        });
    }

    const rest = recursive(categories, id, category);

    if (exists)
        return rest;
    return [{ ...category, children: [] }, ...categories,]

};


export const removeCategory = (categories: CategoryTreeNode[], id: number): CategoryTreeNode[] => {
    return categories
        .map((val: CategoryTreeNode) => {
            // Si no tiene nombre, lo eliminamos
            if (val.id === id) {
                return null;
            }

            // Procesar recursivamente los hijos si existen
            if (val.children) {
                const children = removeCategory(val.children, id);
                // Si después de procesar hay hijos, los mantenemos
                if (children.length > 0) {
                    return { ...val, children };
                }
                // Si no hay hijos, mantenemos el elemento pero sin children
                return { ...val, children: [] };
            }

            return val;
        })
        .filter((val): val is CategoryTreeNode => val !== null);
}

interface UpdateResult {
    updated: CategoryTreeNode[];
    found: boolean;
}


export const updateCategoryTree = ( treeCatgs:CategoryTreeNode[], id:number, newCatg:Partial<CategoryTreeNode> ): CategoryTreeNode[] => {
    return updateCategoryRec(treeCatgs, id, newCatg).updated;
};

const updateCategoryRec = (
    catgs: CategoryTreeNode[],
    id: number,
    newCatg: Partial<CategoryTreeNode>,
    // forChildrenStatusId: number,
    // validateStateToChange: any[],
): UpdateResult => {
    let found = false;

    const updated = catgs.map((val) => {
        // Encontrado el ID exacto
        if (val.id === id) {
            found = true;
            return {
                ...val,
                ...newCatg,
            };
        }

        // Revisar hijos
        if (val.children) {
            const childResult = updateCategoryRec(val.children, id, newCatg);

            if (childResult.found) {
                found = true;
                return { ...val, children: childResult.updated };
            }
        }

        return val;
    });

    return { updated, found };
};

