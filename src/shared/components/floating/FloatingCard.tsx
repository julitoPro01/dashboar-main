"use client";

import { useCallback, useState } from "react";

import {
    autoUpdate,
    flip,
    FloatingPortal,
    offset,
    Placement,
    safePolygon,
    shift,
    size,
    useClick,
    useDismiss,
    useFloating,
    useHover,
    useInteractions,
    useRole,
} from "@floating-ui/react";

interface Props {
    trigger: React.ReactNode | ((state: {
        open: boolean;
        referenceRef: React.RefCallback<HTMLButtonElement>;
        referenceProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
    }) => React.ReactNode);
    children: React.ReactNode;
    placement?: Placement;
    fallbackPlacements?: Placement[];
    offsetDistance?: number;
    className?: string;

    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    outClose?: boolean;
    interaction?: "click" | "hover" | "both";
    zIndex?: number
    portalRoot?: HTMLElement | null;
    keepMounted?: boolean;
}
/**
 * Componente carta flotante
 * @param param0 
 * @returns 
 */
export function FloatingCard({
    trigger,
    children,
    placement,
    fallbackPlacements,
    offsetDistance = 0,
    className,
    outClose = true, interaction = "click",
    open, defaultOpen = false, onOpenChange, zIndex = 50, portalRoot, keepMounted = false
}: Props) {

    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;


    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange(nextOpen) {
            const resolvedOpen = (interaction === "click" || interaction === "both") && !outClose
                ? true
                : nextOpen;

            if (!isControlled) {
                setInternalOpen(resolvedOpen);
            }
            onOpenChange?.(resolvedOpen);
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

    const hover = useHover(context, {
        move: false, handleClose: safePolygon(),
        enabled: interaction === "hover" || interaction === "both"
    });

    const click = useClick(context, {
        enabled: interaction === "click" || interaction === "both"
    });
    const dismiss = useDismiss(context);
    const role = useRole(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        hover,
        dismiss,
        role,
    ]);

    const referenceRef = useCallback((element: HTMLButtonElement | null) => {
        refs.setReference(element);
    }, [refs.setReference]);

    const referenceProps = getReferenceProps();
    const triggerContent = typeof trigger === "function"
        ? trigger({
            open: isOpen,
            referenceRef,
            referenceProps: referenceProps as React.ButtonHTMLAttributes<HTMLButtonElement>,
        })
        : trigger;

    return (
        <>
            {typeof trigger === "function"
                ? triggerContent
                : <div ref={refs.setReference} {...referenceProps}>{trigger}</div>}
            {(isOpen || keepMounted) && (
                <FloatingPortal root={portalRoot}>
                    <div
                        ref={refs.setFloating}
                        style={{...floatingStyles, zIndex}}
                        {...getFloatingProps()}
                        aria-hidden={!isOpen}
                        className={`${className} w-max ${!isOpen ? "invisible pointer-events-none" : ""}`}
                    >
                        {children}
                    </div>
                </FloatingPortal>
            )}
        </>
    );
}
