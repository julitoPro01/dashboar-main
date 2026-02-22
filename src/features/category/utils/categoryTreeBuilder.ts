import { CategoryItem, CategoryTree } from "@/src/interfaces/category";


export const categoryTreeBuilder=(categories:CategoryItem[])=>{
    
    //  Optimización: agrupamos por IdCategoriaPadre
        const map = new Map<number | null | undefined, CategoryTree[]>();

        categories.forEach(cat => {
            const parent = cat.parentId;
            if (!map.has(parent)) map.set(parent, []);
            map.get(parent)?.push({ ...cat, children: [] });
        });
        //  Función recursiva, pero sobre el map (O(n))
        const buildTree = (parentId: number | null | undefined): CategoryTree[] => {
            return (map.get(parentId) ?? []).map(cat => ({
                ...cat,
                children: buildTree(cat.id)
            }));
        };


        return buildTree(categories.at(0)?.parentId);
}

