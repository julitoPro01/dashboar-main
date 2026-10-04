
"use client";

import {
    useFloating,
    offset,
    flip,
    shift,
    autoUpdate,
    useDismiss,
    useRole,
    useInteractions,
    FloatingPortal,
    type Placement,

    FloatingOverlay,
} from "@floating-ui/react";
import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { useFloatingPanel } from "./useFloatingPanel";
import { FloatingPanelType } from "@/src/store/uiSlice";

type FloatingSize = "sm" | "md" | "lg" | "xl";
interface Props {
    panelType: FloatingPanelType;
    children: React.ReactNode;
    onEffectClose?: () => void;
    placement?: Placement;
    offsetDistance?: number;
    isVirtual?: boolean;
    overlay?: boolean;
    className?: string;
    size?: FloatingSize;
}
/**
 * Aplica una apariencia predefinida.
 * Cuando se especifica `variant`, `className` es ignorado.
 */
export const FloatingPanel = ({
    panelType,
    children,
    onEffectClose,
    placement = "bottom-start",
    offsetDistance = 8,
    isVirtual = true,
    overlay = true,
    className = "",
    size = "sm",
}: Props) => {
    const { isOpen, cx, cy, close } = useFloatingPanel(panelType);
    const pathname = usePathname();

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,

        onOpenChange: (open) => {
            if (!overlay && !open) {
                close();
                onEffectClose?.();
            }
        },

        placement,
        middleware: [
            offset(offsetDistance),
            flip({
                fallbackPlacements: [
                    "bottom-end",
                    "top-start",
                    "top-end",
                ],
            }),
            shift({ padding: 10 }),

        ],

        whileElementsMounted: autoUpdate,
        // NO pasamos elements.reference aquí para virtual elements
    });


    // Setear la referencia VIRTUAL cuando usamos coordenadas (cx, cy)
    useLayoutEffect(() => {
        if (isVirtual && isOpen) {
            refs.setReference({
                getBoundingClientRect: () => ({
                    width: 0,
                    height: 0,
                    x: cx,
                    y: cy,
                    top: cy,
                    left: cx,
                    right: cx,
                    bottom: cy,
                    toJSON: () => ({}),
                }),
            });
        }
    }, [isVirtual, isOpen, cx, cy, refs]);

    const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
    const role = useRole(context, { role: "dialog" });

    const { getFloatingProps } = useInteractions([dismiss, role]);

    // Cerrar al cambiar de ruta
    useEffect(() => {
        if (isOpen) {
            close();
            onEffectClose?.();
        }
    }, [pathname]);

    if (!isOpen) return null;

    return (
        <FloatingPortal>

            {overlay &&
                <FloatingOverlay className=" z-40" onClick={() => {
                    close()
                    onEffectClose?.();
                }} />
            }

            <div
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
                className={`z-50
                    ${sizeClasses[size]}
                    ${className}`}
            >
                {children}
            </div>
        </FloatingPortal>
    );
};


const sizeClasses: Record<FloatingSize, string> = {
    sm: "w-52",
    md: "w-72",
    lg: "w-96",
    xl: "w-[32rem]",
};

