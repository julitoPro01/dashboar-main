
import { CreateCategory } from "./CreateCategory"
import { ItemParent } from "./ItemParent"
import { ItemChild } from "./ItemChild"
import { CategoryTreeNode } from "../../types"

//---------CATEGORÍA-ARBOL-------------------------------------------------
interface RenderProps {
    categoryTree: CategoryTreeNode;
    selectedItems: CategoryTreeNode[]
    selectedId?: number;

    onOpenFloatingMenu: (selectedItems: CategoryTreeNode[], cx: number, cy: number) => void;
}

export const RenderCategoryTree = ({
    selectedItems,
    categoryTree,
    selectedId,
    onOpenFloatingMenu
}: RenderProps) => {
    const isParent = categoryTree.children.length;


    return (
        <div className={` ${categoryTree.parentId ? "border-l border-border ml-6" : ""} `}>
            <div>
                {
                    categoryTree.isCreating
                        ? <CreateCategory id={categoryTree.id} />
                        : isParent
                            ? <ItemParent onOpenFloatingMenu={onOpenFloatingMenu} selectedItems={selectedItems} category={categoryTree} selectedId={selectedId} />
                            : <ItemChild onOpenFloatingMenu={onOpenFloatingMenu} selectedItems={selectedItems} category={categoryTree} selectedId={selectedId} />
                }
                {
                    categoryTree.children.map(v => (
                        <RenderCategoryTree key={v.id}
                            categoryTree={v}
                            selectedItems={[...selectedItems, v]}
                            onOpenFloatingMenu={onOpenFloatingMenu}
                            selectedId={selectedId}
                        />
                    ))
                }
            </div>
        </div>
    )
}