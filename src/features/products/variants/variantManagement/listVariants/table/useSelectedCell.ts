import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice";
import { useStore } from "@/src/store/useStore";

interface Props {

    editable?: boolean;
    dirtyData: Record<string, any>;
    originalId: number;
    columnId: string
}
export const useSelectedCell = ({ editable, dirtyData, originalId, columnId }: Props) => {

    const selectedCell = useStore(v => v.variantSelectedCells[columnId].cell?.[originalId]);
    const setSelectCell = useStore(v => v.setVariantSelectCells);
    const openPanel = useStore(v => v.setFloatingPanel);

    const { isDirty, isSelected, mode, ...selected } = selectedCell ?? {};

    const handleSelectCell = ({ cx, cy }: { cx: number, cy: number }, isMulti?: boolean) => {
        if (!editable) return;

        // Celda modificada
        if (isDirty) return;

        //Celda seleccionada
        if (selectedCell) {
            setSelectCell(columnId, originalId, undefined);
            return;
        }

        // Celda no seleccionada
        setSelectCell(columnId, originalId, {
            columnId,
            mode: isMulti ? "multiSelect" : "singleSelect",
            dirtyData: dirtyData,
            isDirty: false,
            isSelected: true,
            originalId: originalId
        });

        if (isMulti) return;

        openPanel({
            type: FLOATING_PANEL_TYPE.VARIANT_CELL_EDITOR_CONTENT,
            open: true,
            cx, cy
        })
    }

    return {
        selectedCell, setSelectCell, openPanel,
        isDirty: isDirty ?? false,
        isSelected: isSelected ?? false,
        isMultSelect: mode === "multiSelect",
        handleSelectCell,
    }
}