"use client";

import { FloatingPanelType } from "@/src/store/uiSlice";
import { useStore } from "@/src/store/useStore";
import { useEffect, useRef } from 'react';
import { createPortal } from "react-dom";

interface Props {
    children: React.ReactNode;
    onEffectClose?: () => void;
    panelType: FloatingPanelType;
    x?: number;
    y?: number;
    isDynamic?: boolean
}

export const FloatingPanel = ({ children, onEffectClose, panelType, x = 0, y = 0, isDynamic }: Props) => {
    const { open, cx: CX, cy: CY, type } = useStore(v => v.floatingPanel);

    const setMenuFloating = useStore(v => v.setFloatingPanel);

    const nodeRef = useRef<HTMLDivElement>(null);
    const isOk = type === panelType;

    const sideRef = useRef<"left" | "right">("right");

    const position = () => {
        const target = nodeRef.current;
        if (!target) return;

        const { width, height } = target.getBoundingClientRect();

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Elegir lado únicamente cuando sea necesario
        if (sideRef.current === "right" && CX + width > vw) {
            sideRef.current = "left";
        }


        let left =
            sideRef.current === "right"
                ? CX
                : CX - width;

        let top = CY;

        if (top + height > vh) {
            top = vh - height;
        }

        left = Math.max(0, Math.min(left, vw - width));
        top = Math.max(0, Math.min(top, vh - height));

        target.style.transform = `translate(${left + x}px, ${top + y}px)`;
    };

    // Posicionamiento
    useEffect(() => {
        if (!open || !isOk || !nodeRef.current) {
            sideRef.current = "right"
        } else
            position()
    }, [CX, CY, open, isOk]);

    // Cambio de ruta
    useEffect(() => {
        return () => {
            setMenuFloating({ open: false });
        }
    }, []);

    // Resize
    useEffect(() => {

        if (!open || !isOk || !nodeRef.current) return;

        const onResize = () => {
            position()
        };
        window.addEventListener("resize", onResize);

        return () => window.removeEventListener("resize", onResize);
    }, [open, isOk]);


    if (!open || !isOk) return null;

    if (isDynamic)
        return createPortal(
            <div
                ref={nodeRef}
                className="fixed z-50 top-0 left-0"
            >

                {children}
            </div>, document.body)

    return createPortal(<div className=" fixed top-0 left-0 inset-0 z-50 overflow-hidden"
        onClick={() => {
            setMenuFloating({ open: false, type: null });
            if (onEffectClose)
                onEffectClose()
        }}>
        <div
            ref={nodeRef}
            onClick={(e) => e.stopPropagation()}
            className={` absolute top-0 left-0  bg-surface-overlay shadow-dropdown border border-border rounded-lg`}
        >

            {children}
        </div>
    </div>, document.body)

};

