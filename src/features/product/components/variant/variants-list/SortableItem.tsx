import { configSortNode } from "@/src/components/ui";
import { BsGripVertical } from "react-icons/bs";

interface SortableItemProps {
    id: string;
    children: React.ReactNode;
}
export const SortableItem = ({ id, children }: SortableItemProps) => {

    const { setNodeRef, style, attributes, listeners } = configSortNode(id);

    return (
        <div ref={setNodeRef} style={style} className=" relative flex items-center gap-2 p-2  select-none">
            {/*COMPONENT - DRAG END */}
            <div {...attributes} {...listeners}
                className=" h-full cursor-grab active:cursor-grabbing p-2 text-gray-400 hover:text-gray-600"
            >
                <BsGripVertical size={50} />
            </div>
            {children}
        </div>
    )

}
