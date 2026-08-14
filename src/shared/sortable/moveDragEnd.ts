import { isSortable } from "@dnd-kit/react/sortable";
import type { DragEndEvent } from "@dnd-kit/react";

export const moveDragEnd = <T>(
    values: T[],
    action: (
        values: T[],
        oldIndex: number,
        newIndex: number
    ) => void
) => {
    return (event: DragEndEvent) => {
        if (event.canceled) return;

        const { source } = event.operation;

        if (!isSortable(source)) return;

        const {
            initialIndex: oldIndex,
            index: newIndex
        } = source;

        if (oldIndex === newIndex) return;

        const newValues = [...values];
        const [item] = newValues.splice(oldIndex, 1);

        newValues.splice(newIndex, 0, item);

        action(newValues, oldIndex, newIndex);
    };
};