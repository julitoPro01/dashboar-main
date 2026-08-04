"use client";

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';

import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    horizontalListSortingStrategy,
    rectSortingStrategy,
    rectSwappingStrategy,
    SortingStrategy
} from '@dnd-kit/sortable';

type Strategy = "vertical" | "horizontal" | "rectSorting" | "rectSwapping";
interface Props {
    children: React.ReactNode;
    itemIds: string[] | number[]; // [id,id,id]
    onDragEnd: (even: DragEndEvent) => void;
    strategy?: Strategy;
}

const direction: Record<Strategy, SortingStrategy> = {
    vertical: verticalListSortingStrategy,
    horizontal: horizontalListSortingStrategy,
    rectSorting: rectSortingStrategy,
    rectSwapping: rectSwappingStrategy
}

export const Sorteable = ({ children, itemIds, onDragEnd, strategy = "vertical" }: Props) => {


    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );


    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
        >
            <SortableContext
                items={itemIds}
                strategy={direction[strategy]}
            >
                {children}
            </SortableContext>
        </DndContext>
    );


}


//  const onDragEnd =(event:DragEndEvent)=> {
//     const {active, over} = event;

//     if (over && active.id !== over?.id) {
//       setItems((itemIds) => {
//         const oldIndex = itemIds.indexOf(active?.id.toString());
//         const newIndex = itemIds.indexOf(over?.id.toString());
//         const newItems = arrayMove(itemIds, oldIndex, newIndex);
//         return newItems;
//       });
//     }

//   }