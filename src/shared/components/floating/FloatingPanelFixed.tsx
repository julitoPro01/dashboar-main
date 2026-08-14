"use client";

import { FloatingPanelType } from "@/src/store/uiSlice";
import { useStore } from "@/src/store/useStore";
import { useEffect, useRef } from 'react';
import { createPortal } from "react-dom";


type AnchorSide = 'right' | 'left' | 'top' | 'bottom';


interface Props {
    margin?: number; // Distancia desde el borde (default: 20)
    anchorSide: AnchorSide; // Lado desde donde se ancla
    children: React.ReactNode;
    onEffectClose?: () => void;
    panelType: FloatingPanelType;
    x?: number;
    y?: number;
    isDynamic?: boolean
}

//TODO: ELIMINAR
export const FloatingPanelFixed = ({ children, onEffectClose, anchorSide, panelType, x = 0, y = 0, isDynamic }: Props) => {

    const { open, cx: CX, cy: CY, type } = useStore(v => v.floatingPanel);

    const setMenuFloating = useStore(v => v.setFloatingPanel);

    const nodeRef = useRef<HTMLDivElement>(null);
    const isOk = type === panelType;


    const rightMargin = useRef(0);
    const bottomMargin = useRef(0);
    const leftMargin = useRef(0);
    const topMargin = useRef(0);
    const isInitialized = useRef(false);

    const position = () => {
        const target = nodeRef.current;
        if (!target) return;

        const { width, height } = target.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        let left: number;
        let top: number;

        // -----------------------------
        // INICIALIZACIÓN
        // -----------------------------
        if (!isInitialized.current) {
            let initialLeft = CX;
            let initialTop = CY;

            // Ajustes iniciales basados en el ancla
            initialLeft = Math.max(0, Math.min(initialLeft, vw - width));
            initialTop = Math.max(0, Math.min(initialTop, vh - height));

            // Guardamos TODOS los márgenes
            rightMargin.current = vw - (initialLeft + width);
            bottomMargin.current = vh - (initialTop + height);
            leftMargin.current = initialLeft;
            topMargin.current = initialTop;

            isInitialized.current = true;

            left = initialLeft;
            top = initialTop;
        } else {
            // -----------------------------
            // POSICIÓN FIJA según el ancla
            // -----------------------------

            switch (anchorSide) {
                case 'right':
                    // Mantiene distancia al borde derecho
                    left = vw - width - rightMargin.current;
                    top = vh - height - bottomMargin.current;
                    break;

                case 'left':
                    // Mantiene distancia al borde izquierdo
                    left = leftMargin.current;
                    top = vh - height - bottomMargin.current;
                    break;

                case 'top':
                    // Mantiene distancia al borde superior
                    left = vw - width - rightMargin.current;
                    top = topMargin.current;
                    break;

                case 'bottom':
                    // Mantiene distancia al borde inferior
                    left = vw - width - rightMargin.current;
                    top = vh - height - bottomMargin.current;
                    break;

                default:
                    left = vw - width - rightMargin.current;
                    top = vh - height - bottomMargin.current;
            }

            // Clamp para seguridad
            left = Math.max(0, Math.min(left, vw - width));
            top = Math.max(0, Math.min(top, vh - height));
        }

        target.style.transform = `translate(${left + x}px, ${top + y}px)`;
    };

    // Posicionamiento
    useEffect(() => {
        if (!open || !isOk || !nodeRef.current) return;

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


// return createPortal(
//     <div
//         ref={nodeRef}
//         className="fixed z-50 top-0 left-0"
//     >

//         {children}
//     </div>, document.body)
