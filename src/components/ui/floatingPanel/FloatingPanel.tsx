"use client";

import { useStore } from "@/src/store/useStore";
import { useEffect, useRef } from 'react';
import { createPortal } from "react-dom";

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
    cx: number;
    cy: number;
    open: boolean;
}

export const FloatingPanel = ({ children, onClick, cx: CX, cy: CY, open }: Props) => {


    const setMenuDrop = useStore(v => v.setFloatingPanel);

    const nodeRef = useRef<HTMLDivElement>(null);

    // Posicionamiento
    useEffect(() => {
        if (!open || !nodeRef.current) return;

        const target = nodeRef.current;
        const { width, height } = target.getBoundingClientRect();

        const w = window.innerWidth;
        const h = window.innerHeight;

        let cx = CX;
        let cy = CY;

        if (cx + width > w) cx -= width;
        if (cy + height > h) cy -= height;

        target.style.transform = `translate(${cx}px, ${cy}px)`;
    }, [CX, CY, open]);

    // Cambio de ruta
    useEffect(() => {
        return () => {
            setMenuDrop({ cx: 0, cy: 0, open: false });
        }
    }, []);

    // Resize
    useEffect(() => {

        if (!open || !nodeRef.current) return;
        const target = nodeRef.current;

        const onResize = () => {
            const { width, height } = target.getBoundingClientRect();

            const w = window.innerWidth;
            const h = window.innerHeight;

            let cx = CX;
            let cy = CY;

            if (cx + width > w) cx = w - width;
            if (cy + height > h) cy = h - height;

            target.style.transform = `translate(${cx}px, ${cy}px)`;

        };
        window.addEventListener("resize", onResize);

        return () => window.removeEventListener("resize", onResize);
    }, [open]);


    if (!open) return null;

    return createPortal(<div className=" fixed top-0 left-0 inset-0 z-50 overflow-hidden"
        onClick={() => {
            setMenuDrop({ cx: 0, cy: 0, open: false });
            if (onClick)
                onClick()
        }}>
        <div
            ref={nodeRef}
            onClick={(e) => e.stopPropagation()}
            className=" absolute top-0 left-0 bg-surface-overlay shadow-dropdown border border-border rounded-lg"
        >
            {children}
        </div>
    </div>, document.body)

};

