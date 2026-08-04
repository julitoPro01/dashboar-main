import { Button } from "@/src/shared/components/btn"
import { useStore } from "@/src/store/useStore";
import { AddCategoryAttrs, EditCategoryAttrs } from "@/src/action/attribute";
import { ToastModal } from "@/src/shared/components/toaster";
import { DeleteSelected } from "./DeleteSelected";
import { useEffect, useMemo, useRef, useState } from "react";
import { ActionType, CategoryAttrResponse } from "../../types";
import { useCategoryAttrActions } from "../../hook/useCategoryAttrs";
import { useSortableQuery } from "../../hook/useSortableQuery";

type Items = (CategoryAttrResponse & { isSelected: boolean })[];
type TableResetRowSelection = () => void;

interface Props {
    actionType: ActionType;
    items: Items;
    tableResetRowSelection: TableResetRowSelection;
}

export const ListSelectionPanel = ({ actionType, items, tableResetRowSelection }: Props) => {

    const cleanSelected = useStore(v => v.setCategoryAttrFilters);
    const cleanSelectionIds = useStore(v => v.resetCategoryAttrSelectedIds);

    const snapshot = useRef<string>("");
    const [originalItems, setOriginalItems] = useState<CategoryAttrResponse[]>([]);
    const resetSnapshot = () => { snapshot.current = "" };

    const resetSelection = () => {
        cleanSelected((v) => ({ fil: { selection: { ids: [], type: v.selection?.type! } } }));
        cleanSelectionIds();
        tableResetRowSelection();
    }

    const selectedCount = items.filter(v => v.isSelected).length;

    useEffect(() => {
        const current = `${actionType}-${items.length}`;
        if (snapshot.current !== current) {
            setOriginalItems(items.map(({ isSelected, ...res }) => (res)));
            snapshot.current = current;
        }
    }, [actionType, items])

    if (actionType === "view") return null;

    return (
        <div className="px-2 py-2 bg-surface border border-t-0 border-border shadow-card">
            <div className="bg-background rounded-lg px-4 py-4 flex flex-wrap justify-between  gap-4">
                {actionType === "assign" && <Assign {...{ selectedCount, items, resetSelection }} />}
                {actionType === "edit" && <Edit {...{ selectedCount, items, resetSelection, originalItems, resetSnapshot }} />}
            </div>
        </div>)
}


type NodeAction = { selectedCount: number, items: Items, resetSelection: () => void }
const Assign = ({ selectedCount, items, resetSelection }: NodeAction) => {

    const { assignRows, loading } = useCategoryAttrActions();

    const handleConfirm = () => {
        const selectItems = items.filter(v => v.isSelected).map<AddCategoryAttrs>((v) => ({
            attributeDefinitionId: v.id,
            isFilter: v.isFilter,
            isRequired: v.isRequired,
            isVariant: v.isVariant,
            displayGroup: v.displayGroup ?? "GENERAL"
        }));
        const categoryId = useStore.getState().categoryAttrFilters.categoryId!;
        assignRows(categoryId, selectItems, resetSelection)

    };

    return (<>
        {/* Información de selección */}
        <div className="flex flex-wrap items-center gap-5 text-sm">
            <div className="flex items-center gap-1.5">
                <span className="text-text-muted">Seleccionados:</span>
                <span className="font-semibold text-text">{selectedCount}</span>
            </div>
        </div>

        {/* Acciones principales */}
        <div className="flex items-center justify-evenly w-full sm:w-auto gap-4 ">
            <Button onClick={resetSelection}
                disabled={selectedCount === 0} size="xs" variant="tab" select="tab"
            >
                Deshacer
            </Button>

            <Button onClick={handleConfirm}
                disabled={selectedCount === 0 || loading} variant="secondary" loading={loading}
            >
                {loading ? "Agregando..." : "Agregar"}
            </Button>
        </div>
    </>
    )
}

type EditProps = { originalItems: CategoryAttrResponse[], resetSnapshot: () => void } & NodeAction;

const Edit = ({ selectedCount, items, originalItems, resetSelection, resetSnapshot }: EditProps) => {


    const { editRows, loading } = useCategoryAttrActions();
    const { undoSortable } = useSortableQuery()


    const handleUndo = () => {
        undoSortable(originalItems)
        resetSelection();
    };

    const handleConfirm = () => {
        const selectedItems = (reorderedCount ? items : items.filter(v => v.isSelected)).map<EditCategoryAttrs>((v) => ({
            id: v.id,
            isFilter: v.isFilter,
            isRequired: v.isRequired,
            isVariant: v.isVariant,
            displayOrder: v.displayOrder,
            displayGroup: v.displayGroup
        }));


        const reset = () => {
            resetSelection();
            resetSnapshot()
        }
        editRows(selectedItems, reset);
    };

    const handleDelete = () => {
        const selectedItemIds = items.filter(v => v.isSelected).map(v => v.id);
        const notSelected = items.filter(v => !v.isSelected).map(v => v.id);
        const reset = () => {
            resetSelection();
            resetSnapshot();
        }
        ToastModal({
            title: `Eliminar atributo(s): ${selectedItemIds.length}`,
            contendNode: <DeleteSelected
                selectedIds={selectedItemIds}
                updateIds={notSelected}
                resetSelection={reset} />
        })
    }

    const reorderedCount = useMemo(() => {
        const currentOrder = items.map(v => v.id);
        return currentOrder.filter(
            (id, index) =>
                id !== originalItems[index]?.id
        ).length;
    }, [items, originalItems])

    return (<>
        {/* Información de selección */}
        <div className="flex flex-wrap items-center gap-5 text-sm">
            <div className="flex items-center gap-1.5">
                <span className="text-text-muted">Seleccionados:</span>
                <span className="font-semibold text-text">{selectedCount} </span>
            </div>
            <div className="flex items-center gap-1.5">
                <span className="text-text-muted">Reordenados:</span>
                <span className="font-semibold text-text">{reorderedCount}</span>
            </div>
        </div>

        {/* Acciones principales */}
        <div className="flex items-center justify-evenly w-full sm:w-auto gap-4 ">
            <Button onClick={handleUndo}
                disabled={selectedCount === 0 && reorderedCount === 0} size="xs" variant="tab" select="tab"
            > Deshacer </Button>

            <Button onClick={handleDelete}
                disabled={selectedCount === 0} variant="ghostDanger" className="text-center"
            >Eliminar</Button>

            <Button onClick={handleConfirm}
                disabled={(selectedCount === 0 && reorderedCount === 0) || loading} variant="secondary" loading={loading}
            >{loading ? "Guardando..." : "Guardar cambios"}</Button>
        </div>
    </>
    )
}
