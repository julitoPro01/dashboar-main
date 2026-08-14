import { useSortable } from "@dnd-kit/react/sortable";

interface Props {
    id: string | number;
    index: number;
    disabled?:boolean;
}

export const useSortableNode = ({ id, index, disabled=false }: Props) => {
    const {
        ref,
        handleRef,
        isDragging,
        isDropping,
        isDragSource,
        isDropTarget,
        
    } = useSortable({
        id,
        index,
        disabled
    });

    return {
        ref,
        handleRef,
        isDragging,
        isDropping,
        isDragSource,
        isDropTarget,
    };
};