
interface Props {
    id: number; parentId: number | null
}


export const buildCategoryTrees = <T>(categories: Props[]): T[] => {
    const map = new Map<number, any>();
    const roots: T[] = [];

    // 1. Crear nodos
    categories.forEach(cat => {
        map.set(cat.id, { ...cat, children: [] });
    });

    // 2. Armar el árbol
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

    // 3. Ordenar: nodos CON hijos primero, SIN hijos al final
    const sortChildren = (nodes: any[]) => {
        nodes.sort((a, b) => {
            const aHasChildren = a.children.length > 0 ? 0 : 1;
            const bHasChildren = b.children.length > 0 ? 0 : 1;
            return aHasChildren - bHasChildren;
        });

        // Ordenar recursivamente los hijos
        nodes.forEach(node => {
            if (node.children.length > 0) {
                sortChildren(node.children);
            }
        });
    };

    sortChildren(roots);

    return roots;
};
