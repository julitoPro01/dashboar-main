"use client";

import {
    autoPlacement,
    autoUpdate,
    flip,
    FloatingOverlay,
    FloatingPortal,
    offset,
    Placement,
    shift,
    size,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useRole,
} from "@floating-ui/react";
import { useState } from "react";
import { useFloatingPanel } from "./useFloatingPanel";
import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice";

interface Props {
    trigger: React.ReactNode;
    children: React.ReactNode;
    placement?: Placement;
    fallbackPlacements?: Placement[];
    offsetDistance?: number;
    className?: string;
    openChange?: boolean;
}

export function FloatingCard({
    trigger,
    children,
    placement = "bottom-end",
    fallbackPlacements,
    offsetDistance = 8,
    className, openChange = true
}: Props) {

    const { isOpen, close } = useFloatingPanel(FLOATING_PANEL_TYPE.PRODUCT_STAT_CARD)

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: (open) => {
            if (openChange && !open)
                close()
        },
        placement,
        middleware: [
            offset(offsetDistance),
            flip({
                fallbackPlacements,

            }),
            shift({ padding: 0 }),

            size({
                apply({ availableHeight, elements }) {
                    Object.assign(elements.floating.style, {
                        maxHeight: `${availableHeight}px`,
                        overflowY: "auto",
                        // height:"auto"
                    });
                },
            })
        ],
        whileElementsMounted: autoUpdate,
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role,
    ]);

    return (
        <>
            <div ref={refs.setReference} {...getReferenceProps()}>
                {trigger}
            </div>
            {isOpen && (
                <FloatingPortal>
                    <div
                        ref={refs.setFloating}
                        style={floatingStyles}
                        {...getFloatingProps()}
                        className={className}
                    >
                        {children}
                    </div>
                </FloatingPortal>
            )}
        </>
    );
}