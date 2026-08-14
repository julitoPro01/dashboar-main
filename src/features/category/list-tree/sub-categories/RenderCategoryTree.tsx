
import { CreateCategory } from "./CreateCategory"
import { ItemChild } from "./ItemChild"
import { CategoryTreeNode } from "../../types"
import { BranchLine } from "../../shared/components";

//---------CATEGORÍA-ARBOL-------------------------------------------------
interface RenderProps {
    categoryTree: CategoryTreeNode[];
    selectedPaths: CategoryTreeNode[]
    selectedId?: number;

    onOpenFloatingMenu: (selectedPaths: CategoryTreeNode[], cx: number, cy: number) => void;
}

export const RenderCategoryTree = ({
    selectedPaths,
    categoryTree,
    selectedId,
    onOpenFloatingMenu
}: RenderProps) => {


    return (
        <>
            {categoryTree.map((v, i) => {
                const isLast = i === categoryTree.length - 1;

                return (
                    <BranchLine key={v.id} isLastChild={isLast}>

                        {
                            v.isCreating
                                ? <CreateCategory id={v.id} />
                                : <ItemChild
                                    ctg={v}
                                    selectedPaths={[...selectedPaths, v]}
                                    isSelected={v.id === selectedId}
                                    hasChildren={!!v.children.length}
                                    onOpenFloatingMenu={onOpenFloatingMenu}
                                />
                        }



                        <RenderCategoryTree
                            categoryTree={v.children}
                            selectedPaths={[...selectedPaths, v]}
                            onOpenFloatingMenu={onOpenFloatingMenu}
                            selectedId={selectedId}
                        />

                    </BranchLine>
                );
            })}
        </>
    )

    // return (
    //     <div className={` ${categoryTree.parentId ? "border-l border-border ml-6" : ""} `}>
    //         <div>
    //             {
    //                 categoryTree.isCreating
    //                     ? <CreateCategory id={categoryTree.id} />
    //                     : isParent
    //                         ? <ItemParent onOpenFloatingMenu={onOpenFloatingMenu} selectedItems={selectedItems} category={categoryTree} selectedId={selectedId} />
    //                         : <ItemChild onOpenFloatingMenu={onOpenFloatingMenu} selectedItems={selectedItems} category={categoryTree} selectedId={selectedId} />
    //             }
    //             {
    //                 categoryTree.children.map(v => (
    //                     <RenderCategoryTree key={v.id}
    //                         categoryTree={v}
    //                         selectedItems={[...selectedItems, v]}
    //                         onOpenFloatingMenu={onOpenFloatingMenu}
    //                         selectedId={selectedId}
    //                     />
    //                 ))
    //             }
    //         </div>
    //     </div>
    // )
}