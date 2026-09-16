"use client";
import { useSortable } from "@dnd-kit/react/sortable";
import { createContext, useContext } from "react"

type Context = {
    ref: (element: Element | null) => void;
    handleRef: (element: Element | null) => void;
    isDragging: boolean;
    isDropping: boolean;
    isDragSource: boolean;
    isDropTarget: boolean;
};

const SortableContextRow = createContext<Context | null>(null)

type Props = { disabled?: boolean, index: number, children: React.ReactNode, id: number | string }

export const SortableItemProvider = ({ children, index, id, disabled=false }: Props) => {

    const sortable = useSortable({ id, index,disabled });

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