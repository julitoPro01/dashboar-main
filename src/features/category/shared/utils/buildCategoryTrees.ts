interface Props {
  id: number;
  parentId: number | null;
}

type CategoryTree<T> = T & {
  children: CategoryTree<T>[];
};

export const buildCategoryTrees = <T extends Props>(
  categories: T[]
): CategoryTree<T>[] => {
  const map = new Map<number, CategoryTree<T>>();
  const roots: CategoryTree<T>[] = [];

  // 1. Crear nodos
  categories.forEach((category) => {
    map.set(category.id, {
      ...category,
      children: [],
    });
  });

  // 2. Armar el árbol
  categories.forEach((category) => {
    const node = map.get(category.id)!;

    if (category.parentId === null) {
      roots.push(node);
    } else {
      const parent = map.get(category.parentId);

      if (parent) {
        parent.children.push(node);
      }
    }
  });

  // 3. Ordenar
  const sortChildren = (nodes: CategoryTree<T>[]): void => {
    nodes.sort((a, b) => {
      const aHasChildren = a.children.length > 0 ? 0 : 1;
      const bHasChildren = b.children.length > 0 ? 0 : 1;

      return aHasChildren - bHasChildren;
    });

    nodes.forEach((node) => {
      sortChildren(node.children);
    });
  };

  sortChildren(roots);

  return roots;
};