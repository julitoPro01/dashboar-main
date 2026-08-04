
import { FloatingPanelType } from "@/src/store/uiSlice";
import { useStore } from "@/src/store/useStore";
import { useCallback } from "react";

export const useFloatingPanel = (panelType: FloatingPanelType) => {

    const { open, type, cx, cy } = useStore((s) => s.floatingPanel);

    const setFloatingPanel = useStore((s) => s.setFloatingPanel);

    const isOpen = open && type === panelType;

    const close = useCallback(() => {
        setFloatingPanel({ open: false, type: null });
    }, [setFloatingPanel]);

    const openAt = useCallback(
        (x: number, y: number) => {
            setFloatingPanel({ open: true, cx: x, cy: y, type: panelType });
        },
        [setFloatingPanel, panelType]
    );

    return { isOpen, cx, cy, close, openAt };
};