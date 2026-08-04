"use client";
import { useStore } from "@/src/store/useStore";

interface P{attributeCount:number}
export const AttributeMetrics = ({attributeCount}:P) => {
        const selected = useStore(v => v.selectedCategory);

    return (
        <>
            {
                !selected?.hasChildren &&
                <div className="bg-surface border border-border rounded-xl shadow-card p-3">
                    <p className="text-text-muted text-xs uppercase mb-2">
                        Attributos
                    </p>

                    <p className="text-2xl font-bold text-text-strong">
                        {attributeCount}
                    </p>
                </div>
            }
        </>
    )
}
