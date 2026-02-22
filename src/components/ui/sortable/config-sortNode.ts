"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


export const configSortNode = (id:string) => {
  
     const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
        } = useSortable({ id });
    
        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
        };

        return {
            style, setNodeRef ,
            attributes,listeners
        }
}
