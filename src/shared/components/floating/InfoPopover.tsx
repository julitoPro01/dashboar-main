"use client"
import { useEffect, useRef, useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FloatingWrapper, type FloatingWrapperPoition } from "./FloatingWrapper";
import { SURFACE_VARIANTS } from "../../theme/surface-variant";
import { Checkbox } from "../../form";

interface Props extends FloatingWrapperPoition {
    initBoot?: { localStoreName: string };
    children: React.ReactNode;
}

export const InfoPopover = ({ children, initBoot, positionX, positionY }: Props) => {
    const [open, setOpen] = useState(false);
    const [hasStoredPreference, setHasStoredPreference] = useState(false);

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

    const localStoreName = initBoot?.localStoreName;

    useEffect(() => {
        if (!localStoreName) {
            setHasStoredPreference(false);
            return;
        }

        try {
            const preferenceExists = localStorage.getItem(localStoreName) !== null;
            setHasStoredPreference(preferenceExists);
            setOpen(!preferenceExists);
        } catch {
            // Si el navegador bloquea localStorage, dejamos disponible la información.
            setHasStoredPreference(false);
            setOpen(true);
        }
    }, [localStoreName]);

    const handleDoNotShowAgain = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!localStoreName) return;

        try {

            if (event.target.checked) {
                localStorage.setItem(localStoreName, "yes");
            } else {
                localStorage.removeItem(localStoreName)
            }
        } catch {
            // El popover permanece abierto si no se pudo guardar la preferencia.
        }
    };


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
                positionX={positionX ?? "right-0"}
                positionY={positionY ?? { custom: "top-9" }}
                overlay={false}
                className={`${SURFACE_VARIANTS.default} p-4`}>
                {children}

                {localStoreName && !hasStoredPreference && (
                    <label className="mt-3 text-xs flex cursor-pointer items-center gap-2 text-text-muted">
                        <Checkbox
                            aria-label="No volver a mostrar"
                            default={false}
                            size="sm"
                            // checked={false}
                            onChange={handleDoNotShowAgain}
                        />
                        <span>No volver a mostrar</span>
                    </label>
                )}
            </FloatingWrapper>
        </div>
    );
};
