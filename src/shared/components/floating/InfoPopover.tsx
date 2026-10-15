"use client"
import { useEffect, useRef, useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FloatingWrapper } from "./FloatingWrapper";
import { SURFACE_VARIANTS } from "../../theme/surface-variant";


export const InfoPopover = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node;

            if (!containerRef.current?.contains(target)) {
                setOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, [open]);


    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                aria-label="Información sobre los estados de publicación"
                aria-expanded={open}
                onClick={() => setOpen((value) => !value)}
                className={`flex size-7 items-center justify-center rounded-md transition-colors hover:bg-bg-soft-blue hover:text-primary
                    ${open ? "bg-bg-select text-primary" : "text-text-muted "}`}
            >
                <IoInformationCircleOutline size={18} />
            </button>

            <FloatingWrapper open={open}
                positionX="right-0"
                positionY={{ custom: "top-9" }}
                overlay={false}
                className={`${SURFACE_VARIANTS.default} p-4`}>
                {children}
            </FloatingWrapper>
        </div>
    );
};