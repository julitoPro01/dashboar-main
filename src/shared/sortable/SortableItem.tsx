
import { useSortableNode } from "./useSortableNode";

export const SortableItem = ({id,children}:{id: string,children:React.ReactNode}) => {

    const { setNodeRef, style, attributes, listeners } = useSortableNode(id)

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
}