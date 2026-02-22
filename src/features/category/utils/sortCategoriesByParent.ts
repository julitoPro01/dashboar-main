type HasParent = {
    id: number;
    parentId?: number | null;
};

export function sortCategoriesByParent<T extends HasParent>(
    categories: readonly T[]
): T[] {
    // encontrar el root
    const result: T[] = [];
    let current = categories.find(c => !c.parentId);

    while (current) {
        result.push(current);
        current = categories.find(c => c.parentId === current!.id);
    }

    return result;
}
