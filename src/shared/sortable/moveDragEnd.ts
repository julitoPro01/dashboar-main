"use client";

import { DragEndEvent } from "@dnd-kit/core"
import { arrayMove } from '@dnd-kit/sortable';

type HasId ={ id: string | number };

export const moveDragEnd = <T extends HasId>(values: T[], action: (values: T[], oldIndex: number, newIndex: number) => void) => {

    return (e: DragEndEvent) => {
        const { active, over } = e;
        if (!over || active.id === over.id) return;

        const oldIndex = values.findIndex(item => item.id === active.id);
        const newIndex = values.findIndex(item => item.id === over.id);

        if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;
        action(arrayMove(values, oldIndex, newIndex), oldIndex, newIndex)
    }


}


