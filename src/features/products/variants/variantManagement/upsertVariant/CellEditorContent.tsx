"use client"
import { FloatingPanel } from "@/src/shared/components/floating"
import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice"
import { useStore } from "@/src/store/useStore"
import { SelectedVariantCell } from "@/src/store/variantSlice"
import { VARIANT_COLUMN_ID } from "../listVariants/table/columnName"

export const CellEditorContent = () => {

    const clearSelectedCell = useStore(v => v.setVariantSelectCells);
    const selectedCell = useStore(v => v.variantSelectedCells);

    const selectedLatest = Object.values(selectedCell).reduce(
            (result, column) => {
                // Accedemos directamente al objeto limpio de celdas
                for (const cell of Object.values(column.cell ?? {})) {

                    if (!cell || cell.isDirty || cell.mode === "multiSelect") continue;

                    if (!result || cell.selectedAt > result.selectedAt) {
                        result = cell
                    }
                }

                return result;
            },
            undefined as SelectedVariantCell | undefined
        );

    const handleClear = () => {

        if (!selectedLatest) return;

        clearSelectedCell(selectedLatest.columnId, selectedLatest.originalId, undefined);
    };

      const renderEditor = () => {
        switch (selectedLatest?.columnId) {
            case VARIANT_COLUMN_ID.image:
                // return <ImageEditor />;
                // return <ImageEditor />;

            case VARIANT_COLUMN_ID.orderInput:
                // return <OrderEditor />;

            case VARIANT_COLUMN_ID.price:
                // return <PriceEditor />;

            case VARIANT_COLUMN_ID.variant:
                // return <StockEditor />;

            default:
                return null;
        }
    };  

    return (
        <FloatingPanel panelType={FLOATING_PANEL_TYPE.VARIANT_CELL_EDITOR_CONTENT}
            onEffectClose={handleClear}
        >
            {renderEditor()}
        </FloatingPanel>
    )
}
