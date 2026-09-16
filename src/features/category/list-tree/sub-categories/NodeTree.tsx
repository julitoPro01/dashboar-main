
import { CreateCategory } from "./CreateCategory"
import { CategoryTreeNode, CategoryTreeResponse } from "../../types"
import { BranchLine, ItemTree } from "../../shared/components";
import { useEffect, useState } from "react";

//---------CATEGORÍA-ARBOL-------------------------------------------------
interface Props {
    categoryTree: CategoryTreeNode[];
    selectedPaths: CategoryTreeNode[];
    selectedId?: number;
    allowSelectingAll?: boolean;
    onOpenFloatingMenu: (selectedPaths: CategoryTreeNode[], cx: number, cy: number) => void;
}

export const NodeTree = ({
    selectedPaths,
    categoryTree,
    selectedId,
    allowSelectingAll,
    onOpenFloatingMenu
}: Props) => {

    const isCreating = !!categoryTree.flatMap(v => v.children).find(v => v.isCreating);

    return (
        <>
            {categoryTree.map((v, i) => {
                const isLast = i === categoryTree.length - 1;
                return (

                    <TreeNodeItem
                        key={v.id}
                        ctg={v}
                        selectedPaths={selectedPaths}
                        onOpenFloatingMenu={onOpenFloatingMenu}
                        allowSelectingAll={allowSelectingAll}
                        selectedId={selectedId}
                        isLast={isLast}
                        isCreating={isCreating}
                    />
                );
            })}
        </>
    )

}

type ItemProps = {
    ctg: CategoryTreeNode;
    selectedPaths: CategoryTreeResponse[];
    allowSelectingAll: boolean | undefined;
    onOpenFloatingMenu: (selectedPaths: CategoryTreeNode[], cx: number, cy: number) => void;
    isLast: boolean;
    selectedId?: number;
    isCreating?: boolean
}

const TreeNodeItem = ({ ctg, isLast, selectedPaths, allowSelectingAll, onOpenFloatingMenu,
    selectedId, isCreating
}: ItemProps) => {

    const [open, setOpen] = useState(false);

    const hasChildCreating = ctg.children?.some(child => child.isCreating);

    useEffect(() => {
      
        if(hasChildCreating)
            setOpen(true)
    }, [hasChildCreating])
    

    return (
        <BranchLine isLastChild={isLast}>
            {
                ctg.isCreating
                    ? <CreateCategory id={ctg.id} />
                    : <ItemTree
                        ctg={ctg}
                        selectedPaths={[...selectedPaths, ctg]}
                        isSelected={ctg.id === selectedId}
                        hasChildren={!!ctg.children.length}
                        allowSelectingAll={allowSelectingAll}
                        onOpenFloatingMenu={onOpenFloatingMenu}
                        onOpen={() => setOpen(!open)}
                        isOpen={open} />
            }

            {(open || ctg.isCreating) &&
                <NodeTree
                    categoryTree={ctg.children}
                    selectedPaths={[...selectedPaths, ctg]}
                    onOpenFloatingMenu={onOpenFloatingMenu}
                    allowSelectingAll={allowSelectingAll}
                    selectedId={selectedId}
                />}
        </BranchLine>
    );
};
