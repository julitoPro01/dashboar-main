import type { CategoryTreeResponse } from "../../../types";
import { Item } from "./Item";

interface Props {
    categoryTree: CategoryTreeResponse[];
    selected: CategoryTreeResponse[];
    onSelect: (val: CategoryTreeResponse[]) => void;
    selectedId: number;
}

export const NodeTree = ({ categoryTree, selected, onSelect, selectedId }: Props) => {

    return <>
        {categoryTree.map(v => {
            return (
                <div key={v.id} className="ml-6 pl-2 border-l border-border-subtle">
                    <div className="group">
                        <Item ctg={v} selected={[...selected, v]} onSelect={onSelect} selectedId={selectedId} />
                        <NodeTree categoryTree={v.children} selected={[...selected, v]} onSelect={onSelect} selectedId={selectedId} />
                    </div>
                </div >
            )
        })}

    </>
}
