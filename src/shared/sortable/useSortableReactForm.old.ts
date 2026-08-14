// hooks/useSortableFieldArray.ts
import { useCallback } from 'react';
// import { DragEndEvent } from '@dnd-kit/core';
import { FieldArrayPath, FieldArrayWithId, FieldValues } from 'react-hook-form';

type Reorder = {
    minIndex: number;
    maxIndex: number;
}

interface UseSortableFieldArrayOptions<T extends FieldValues> {
    fields: FieldArrayWithId<T, FieldArrayPath<T>, "customId">[];
    move: (indexA: number, indexB: number) => void;
}

//TODO: No se esta usando
export const useSortableFieldArray = <T extends Record<string, any>>({
    fields, move
}: UseSortableFieldArrayOptions<T>) => {


    const dragEnd = useCallback((event: any, onReorder?: (_: Reorder) => void) => {
        const { active, over } = event;

        // Validaciones básicas
        if (!over || active.id === over.id) return;

        // Encontrar índices usando el ID del elemento
        const oldIndex = fields.findIndex(item => item.customId === active.id);
        const newIndex = fields.findIndex(item => item.customId === over.id);

        if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

        // Mover en el array de react-hook-form
        move(oldIndex, newIndex);

        const minIndex = Math.min(oldIndex, newIndex);
        const maxIndex = Math.max(oldIndex, newIndex);

        if (onReorder)
            onReorder({ maxIndex, minIndex })

    }, [fields, move]); 


    return {
        dragEnd
    };
};