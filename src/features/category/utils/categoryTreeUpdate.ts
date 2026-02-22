
type Category = {
    id: number;
    name: string;
    recordStatusId: number;
    parentId?: number | null
}

export interface TreeCategories extends Category {
    children: TreeCategories[];
}

export const newSubCategory = (categories: TreeCategories[], parentCategoryId: number, category: TreeCategories): TreeCategories[] => {
    return categories.map<TreeCategories>((val: any) => {
        if (val.id === parentCategoryId) {
            val.children = [...val.children, category];
            return val;
        } else if (val.children) {
            const children = newSubCategory(val.children, parentCategoryId, category)
            if (children.length > 0) return { ...val, children }
        }
        return val;
    })
};


export const removeCategory = (categories: TreeCategories[], id: number): TreeCategories[] => {
    return categories
        .map((val: TreeCategories) => {
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
        .filter((val): val is TreeCategories => val !== null);
}

interface UpdateResult {
    updated: TreeCategories[];
    found: boolean;
}

interface UpdateProps {
    catgsTree: TreeCategories[],
    id: number,
    newCatg: Category,
    pendingRecordStatusId: number, // uso para las categorías hijas
    publicStatus: any[],
}
export const updateCategoryTree = ({ catgsTree, id, newCatg, pendingRecordStatusId, publicStatus }: UpdateProps): TreeCategories[] => {
    return updateCategoryRec(catgsTree, id, newCatg, pendingRecordStatusId, publicStatus).updated;
};

const updateCategoryRec = (
    catgs: TreeCategories[],
    id: number,
    newCatg: Category,
    forChildrenPendingId: number,
    validateStateToChange: any[],
): UpdateResult => {
    let found = false;

    const updated = catgs.map((val) => {
        // Encontrado el ID exacto
        if (val.id === id) {
            found = true;
            return {
                ...newCatg,
                children: updateAllChildren(val.children, forChildrenPendingId, validateStateToChange),
            };
        }

        // Revisar hijos
        if (val.children) {
            const childResult = updateCategoryRec(val.children, id, newCatg, forChildrenPendingId, validateStateToChange);

            if (childResult.found) {
                found = true;
                return { ...val, children: childResult.updated };
            }
        }

        return val;
    });

    return { updated, found };
};



export const updateAllChildren = (catgsTree: TreeCategories[], pendingStatusId: number, validateStateToChange: any[]): TreeCategories[] => {
    return catgsTree.map((val) => ({
        ...val,
        recordStatudId: validateStateToChange.some(v => v.id === val.recordStatusId) ? pendingStatusId : val.recordStatusId,
        children: val.children ? updateAllChildren(val.children, pendingStatusId, validateStateToChange) : val.children,
    }));
};
