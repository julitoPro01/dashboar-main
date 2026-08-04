
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
import { useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useFloatingPanel } from "./useFloatingPanel";
import { FloatingPanelType } from "@/src/store/uiSlice";


interface Props {
    panelType: FloatingPanelType;
    children: React.ReactNode;
    onEffectClose?: () => void;
    placement?: Placement;
    offsetDistance?: number;
    isVirtual?: boolean;
    overlay?: boolean;
}

export const FloatingPanel = ({
    panelType,
    children,
    onEffectClose,
    placement = "bottom-start",
    offsetDistance = 8,
    isVirtual = true,
    overlay = true
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
    }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

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
                className="z-50 bg-surface-overlay shadow-dropdown border border-border rounded-lg"

            >
                {children}
            </div>
        </FloatingPortal>
    );
};