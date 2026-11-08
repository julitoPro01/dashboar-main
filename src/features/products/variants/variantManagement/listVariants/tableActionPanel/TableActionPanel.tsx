"use client";

import { VARIANT_TABLE_ACTION, type VariantTableAction } from "@/src/store/variantSlice";

import { ReorderVariants } from "../../reorderVariants";

interface Props {
    action: VariantTableAction["type"];
    onUndo: () => void;
    reorderedCount: number
}


export const TableActionPanel = ({
    action,
    onUndo,
    reorderedCount,
}: Props) => {
    const isList = 
    action === VARIANT_TABLE_ACTION.list 
    || action === VARIANT_TABLE_ACTION.details;

    if (isList) return null;

    return (
        <section
            aria-live="polite"
            className="bg-surface border border-primary/20  px-4 py-3 shadow-sm"
        >
            <div className="bg-background rounded-lg px-4 py-4 flex flex-wrap justify-between  gap-4">

                {action === VARIANT_TABLE_ACTION.reorder && <ReorderVariants onUndo={onUndo} reorderedCount={reorderedCount} />}

            </div>
        </section>
    );
};
