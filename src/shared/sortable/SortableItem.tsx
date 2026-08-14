
import { useSortableNode } from "./useSortableNode";

export const SortableItem = ({ id, index, children }: { id: string, index: number, children: React.ReactNode }) => {

    const { ref } = useSortableNode({ id, index })

    return (
        <div ref={ref}>
            {children}
        </div>
    );
}