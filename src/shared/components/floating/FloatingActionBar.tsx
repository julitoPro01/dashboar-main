"use client"
import { useState } from "react";
import { Button } from "../btn";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Tooltip } from "./Tooltip";


const dirr = {
    "top-r": { y: "top-2.5", x: "right-2.5" },
    "top-c": { y: "top-1/2 -translate-y-1/2", x: "right-2.5" },
    "bottom-r": { y: "bottom-2.5", x: "right-2.5" },
    "bottom-l": { y: "bottom-2.5", x: "left-2.5" },
    "top-l": { y: "top-2.5", x: "left-2.5" },
}

const VARIANT = {
    basic: "",
    primary: " border border-primary ",
    secondary: "bg-surface-black/70 backdrop-blur-md/70 rounded-full border border-border-strong"
} as const;

interface Props {
    children:
    | React.ReactNode
    | ((collapsible: boolean) => React.ReactNode);
    position?: keyof typeof dirr | { custom: string };
    padding?: string;
    variant?: keyof typeof VARIANT;
    className?: string;
    collapsible?: boolean
}

/**
 * Acciónes vertica flotante
 * @param param0 
 * @returns 
 */
export const FloatingActionBar = ({ children, position = "top-c", padding = "p-1", className,
    variant = "secondary", collapsible
}: Props) => {

    const [isCollapsed, setIsCollapsed] = useState(false);

    let posit = "";
    if (typeof position === "object")
        posit = position.custom;
    else
        posit = dirr[position].x + " " + dirr[position].y;

    return (
        <aside
            className={` fixed
                ${posit}
                ${padding}
                ${VARIANT[variant]}
                z-100
            
                flex items-center
                flex-col
                gap-2

                shadow-dropdown

                transition-all
                duration-300
                ${className}
                `
            }
        >
            {
                collapsible &&
                <Tooltip text={!isCollapsed ? "Expandir" : "Ocultar"} position="left" x="right-12" variant="banderola">
                    <Button variant="tabLight"
                        size="sm"
                        rounded="full"
                        padding="p-1.5"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        ariaLabel={!isCollapsed ? "Expandir" : "Ocultar"}
                    >
                        {isCollapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
                    </Button>
                </Tooltip>
            }

            {typeof children === "function" ? children(isCollapsed) : children}
        </aside>
    );
};