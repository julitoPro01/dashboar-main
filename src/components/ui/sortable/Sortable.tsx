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
    horizontalListSortingStrategy
} from '@dnd-kit/sortable';

interface Props {
    children: React.ReactNode;
    items: string[]; // [id,id,id]
    handleDragEnd: (even: DragEndEvent) => void;
    vertical?: boolean
}

export const Sorteable = ({ children, items, handleDragEnd, vertical }: Props) => {


    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );


    //  const handleDragEnd =(event:DragEndEvent)=> {
    //     const {active, over} = event;

    //     if (over && active.id !== over?.id) {
    //       setItems((items) => {
    //         const oldIndex = items.indexOf(active?.id.toString());
    //         const newIndex = items.indexOf(over?.id.toString());
    //         const newItems = arrayMove(items, oldIndex, newIndex);
    //         return newItems;
    //       });
    //     }

    //   }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items}
                strategy={vertical ? verticalListSortingStrategy : horizontalListSortingStrategy}
            >
                {children}
            </SortableContext>
        </DndContext>
    );


}