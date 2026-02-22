import { useEffect } from "react";

interface UseScrollToIndexOnceOptions {
    index?: number | null;
    offset?: number;
    behavior?: ScrollBehavior;
    block?: ScrollLogicalPosition;
}

export function useScrollToIndexOnce({
    index,
    offset = 0,
    behavior = "smooth",
    block = "center",
}: UseScrollToIndexOnceOptions) {
    useEffect(() => {
        if (index == null) return;

        requestAnimationFrame(() => {
            const el = document.querySelector(
                `[data-row-index="${index - offset}"]`
            );

            el?.scrollIntoView({ behavior, block });
        });
    }, []);
}
