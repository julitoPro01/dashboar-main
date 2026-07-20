"use client";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { createContext, useContext } from "react"
import { useSortableNode } from "./useSortableNode";

type Context = {
    style: {
        transform: string | undefined;
        transition: string | undefined;
    };
    setNodeRef: (node: HTMLElement | null) => void;
    attributes: DraggableAttributes;
    listeners: SyntheticListenerMap | undefined;
    isDragging:boolean
};

const SortableContextRow = createContext<Context | null>(null)

    
export const SortableItemProvider = ({ children, id }: { children: React.ReactNode, id: number | string }) => {

    const sortable = useSortableNode(id);

    return (
        <SortableContextRow.Provider value={sortable} >
            {children}
        </SortableContextRow.Provider>
    )
}


export const useSortableItemContext = () => {
    const context = useContext(SortableContextRow);
    if (!context) {
        throw new Error('useTableContext debe usarse dentro de un TableProvider');
    }
    return context;
}