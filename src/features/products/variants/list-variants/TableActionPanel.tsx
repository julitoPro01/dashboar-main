"use client";

import type { VariantTableAction } from "@/src/store/variantSlice";
import { ReorderAction } from "./table-action-panel/ReorderAction";
import { SetMainAction } from "./table-action-panel/SetMainAction";
import { AdjustStockAction } from "./table-action-panel/AdjustStockAction";

interface Props {
    action: VariantTableAction["type"];
    onUndo: () => void;
    reorderedCount: number
}



export const TableActionPanel = ({ action, onUndo, reorderedCount }: Props) => {

    if (action === "list") return null;

    return (
        <section
            aria-live="polite"
            className="bg-surface border border-primary/20  px-4 py-3 shadow-sm"
        >
            <div className="bg-background rounded-lg px-4 py-4 flex flex-wrap justify-between  gap-4">

                {action === "reorder" && <ReorderAction onUndo={onUndo} reorderedCount={reorderedCount} />}
                {action === "setMain" && <SetMainAction />}
                {action === "adjustStock" && <AdjustStockAction />}
            </div>
        </section>
    );
};
