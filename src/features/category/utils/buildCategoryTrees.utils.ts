
interface Props {
    id: number; parentId: number | null
}


export const buildCategoryTrees = <T>(categories: Props[]):T[] => {
    const map = new Map<number, any>();
    const roots: T[] = [];

    categories.forEach(cat => {
        map.set(cat.id, { ...cat, children: [] });
    });

    categories.forEach(cat => {
        const node = map.get(cat.id)!;
        if (cat.parentId === null) {
            roots.push(node);
        } else {
            const parent = map.get(cat.parentId);
            if (parent) {
                parent.children!.push(node);
            }
        }
    });

    return roots;
};

