"use client";

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
    trigger: React.ReactNode;
    children: React.ReactNode;
    placement?: Placement;
    fallbackPlacements?: Placement[];
    offsetDistance?: number;
    className?: string;

    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    outClose?: boolean;
    interaction?: "click" | "hover" | "both"
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
    offsetDistance = 8,
    className,
    outClose = true, interaction = "click", open, onOpenChange
}: Props) {


    const { refs, floatingStyles, context } = useFloating({
        open,
        onOpenChange(open) {
            if ((interaction === "click" || interaction==="both") && !outClose){
                onOpenChange?.(true)
            }else
            onOpenChange?.(open)
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
                        zIndex: "50"
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

    return (
        <>
            <div ref={refs.setReference} {...getReferenceProps()}>
                {trigger}
            </div>
            {open && (
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