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
    rectSwappingStrategy
} from '@dnd-kit/sortable';

interface Props {
    children: React.ReactNode;
    itemIds: string[] | number[]; // [id,id,id]
    onDragEnd: (even: DragEndEvent) => void;
    strategy?: "vertical" | "horizontal" | "rectSorting" | "rectSwapping";
}

export const Sorteable = ({ children, itemIds, onDragEnd, strategy }: Props) => {


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
                strategy={strategy === "horizontal"
                    ? horizontalListSortingStrategy
                    : strategy === "vertical"
                        ? verticalListSortingStrategy
                        : strategy === "rectSorting"
                            ? rectSortingStrategy
                            : strategy === "rectSwapping" ? rectSwappingStrategy : rectSortingStrategy}
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