import type { CategoryTreeResponse } from "../../../types";
import { BranchLine } from "../BranchLine";
import { Item } from "./Item";

interface Props {
    categoryTree: CategoryTreeResponse[];
    selectedPath: CategoryTreeResponse[];
    onSelect: (val: CategoryTreeResponse[]) => void;
    selected: { id: number, path: string };
}

export const NodeTree = ({ categoryTree, selectedPath, onSelect, selected }: Props) => {

    return (
        <>
            {categoryTree.map((v, i) => {
                const isLast = i === categoryTree.length - 1;

                return (
                    <BranchLine key={v.id} isLastChild={isLast}>
                        <Item
                            ctg={v}
                            selectedPath={[...selectedPath, v]}
                            onSelect={onSelect}
                            isSelected={v.id === selected.id}
                            hasChildren={!!v.children.length}
                        />
                        <NodeTree
                            categoryTree={v.children}
                            selectedPath={[...selectedPath, v]}
                            onSelect={onSelect}
                            selected={selected}
                        />
                    </BranchLine>
                );
            })}
        </>
    );
};