import { useState } from "react";
import type { CategoryTreeResponse } from "../../../types";
import { BranchLine } from "../BranchLine";
import { ItemTree } from "./ItemTree";

interface Props {
    categoryTree: CategoryTreeResponse[];
    selectedPath: CategoryTreeResponse[];
    onSelect?: (val: CategoryTreeResponse[]) => void;
    selected: { id: number, path: string };
    allowSelectingAll?: boolean;
    onOpenFloatingMenu?: (selectedPaths: CategoryTreeResponse[], cx: number, cy: number) => void;

}

export const NodeTree = ({ categoryTree, selectedPath, onSelect,
    selected, allowSelectingAll, onOpenFloatingMenu }: Props) => {

    return (
        <>
            {categoryTree.map((v, i) => {
                const isLast = i === categoryTree.length - 1;

                return (
                    <TreeNodeItem
                        key={v.id}
                        v={v}
                        isLast={isLast}
                        selectedPath={selectedPath}
                        onSelect={onSelect}
                        selected={selected}
                        allowSelectingAll={allowSelectingAll}
                        onOpenFloatingMenu={onOpenFloatingMenu}
                    />
                );
            })}
        </>
    );
};


const TreeNodeItem = ({ v, isLast, selectedPath, onSelect, selected, allowSelectingAll, onOpenFloatingMenu, categoryTree }: any) => {
    const [open, setOpen] = useState(false); // 👈 Ahora este estado es único para CADA rama

    return (
        <BranchLine isLastChild={isLast}>
                <ItemTree
                    ctg={v}
                    selectedPaths={[...selectedPath, v]}
                    onSelect={onSelect}
                    isSelected={v.id === selected.id}
                    hasChildren={!!v.children.length}
                    allowSelectingAll={allowSelectingAll}
                    onOpen={() => setOpen(!open)}
                    isOpen={open}
                    onOpenFloatingMenu={onOpenFloatingMenu}
                />
                {open &&
                    <NodeTree
                        categoryTree={v.children}
                        selectedPath={[...selectedPath, v]}
                        onSelect={onSelect}
                        selected={selected}
                        allowSelectingAll={allowSelectingAll}
                    />
                }
            </BranchLine>
    );
};