import { Button } from "@/src/shared/components/btn"
import { useStore } from "@/src/store/useStore";
import { AddCategoryAttrs, UpdateCategoryAttrsPayload } from "@/src/action/attribute";
import { useMemo, useRef, useEffect } from 'react';
import { ActionType, CategoryAttrResponse } from "../../types";
import { useSortableQuery } from "../../hook/useSortableQuery";
import { useAddCatgAttrs, useUpdateCatgAttrs } from "../../hook";
import { MetaInvalidationReasonType } from "@/src/shared/table/core";
import { Tooltip } from "@/src/shared/components/floating";
import { MdOutlineDeleteSweep, MdRestartAlt } from "react-icons/md";

type Items = (CategoryAttrResponse & { isSelected: boolean })[];

interface Props {
    actionType: ActionType;
    items: Items;
    invalidationReason?: MetaInvalidationReasonType;
    resetState: () => void;
}

export const SelectionPanel = ({ actionType, invalidationReason, items, resetState }: Props) => {


    const selectedCount = items.filter(v => v.isSelected).length;


    if (actionType === "view") return null;

    return (
        <div className="px-2 py-2 bg-surface border border-t-0 border-border shadow-card">
            <div className="bg-background rounded-lg px-4 py-4 flex flex-wrap justify-between  gap-4">
                {actionType === "assign" && <Assign {...{ selectedCount, items, resetState }} />}
                {actionType === "edit" && <Edit {...{ selectedCount, items, resetState, invalidationReason }} />}
            </div>
        </div>)
}


type ActionProps = { selectedCount: number, items: Items, invalidationReason?: MetaInvalidationReasonType, resetState: () => void }
const Assign = ({ selectedCount, items, resetState }: ActionProps) => {

    const { mutateAsync, isPending } = useAddCatgAttrs();

    const handleConfirm = async () => {
        const selectItems = items.filter(v => v.isSelected).map<AddCategoryAttrs>((v) => ({
            attributeDefinitionId: v.id,
            isFilter: v.isFilter,
            isRequired: v.isRequired,
            isVariant: v.isVariant,
            displayGroup: v.displayGroup ?? "GENERAL"
        }));
        const categoryId = useStore.getState().categoryAttrsFilters.categoryId!;

        await mutateAsync({ categoryId, data: selectItems })

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
        <div className="flex items-center justify-evenly w-full sm:w-auto gap-2 ">
            <Tooltip text="Deshacer">
                <Button onClick={resetState}
                    disabled={selectedCount === 0} size="xs" variant="basic"
                >
                    <MdRestartAlt size={22} />
                </Button>
            </Tooltip>

                <Button onClick={handleConfirm}
                    disabled={selectedCount === 0 || isPending} variant="tab" loading={isPending}
                    padding="p-1"
                >
                    {isPending ? "Agregando..." : "Agregar"}
                </Button>
        </div>
    </>
    )
}

type EditProps = ActionProps;

const Edit = ({ selectedCount, items, invalidationReason, resetState }: EditProps) => {

    const originalRef = useRef<CategoryAttrResponse[]>(items);
    //----
    const setDeleteModal = useStore(v => v.setCategoryAttrsDeleteModal);

    const { mutateAsync: update, isPending } = useUpdateCatgAttrs();

    const { undoSortable } = useSortableQuery()


    const handleUndo = () => {
        undoSortable(originalRef.current)
        resetState();
    };

    const handleEditConfirm = async () => {
        const selectedItems = (reorderedCount ? items : items.filter(v => v.isSelected)).map<UpdateCategoryAttrsPayload>((v) => ({
            id: v.id,
            isFilter: v.isFilter,
            isRequired: v.isRequired,
            isVariant: v.isVariant,
            displayOrder: v.displayOrder,
            displayGroup: v.displayGroup
        }));

        await update(selectedItems);
    };

    const handleDelete = () => {
        const del = items.filter(v => v.isSelected).map(v => ({ id: v.id, name: v.name }));
        const updateIds = items.filter(v => !v.isSelected).map(v => v.id);
        setDeleteModal({
            del,
            updateIds,
            open: true
        })

    }

    const reorderedCount = useMemo(() => {
        const currentOrder = items.map(v => v.id);
        return currentOrder.filter(
            (id, index) =>
                id !== originalRef.current[index]?.id
        ).length;
    }, [items])


    const lastSyncTimeRef = useRef(0);

    useEffect(() => {
        if (!invalidationReason) return;

        const { time, type } = invalidationReason;

        const shouldSync =
            ["delete", "update", "add"].includes(type) &&
            time !== lastSyncTimeRef.current;

        if (!shouldSync) return;

        originalRef.current = items;
        lastSyncTimeRef.current = time;

    }, [items, invalidationReason]);


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
        <div className="flex items-center justify-evenly w-full sm:w-auto gap-2 ">
            <Tooltip text="Deshacer">
                <Button onClick={handleUndo}
                    disabled={selectedCount === 0 && reorderedCount === 0} size="xs" variant="basic"
                >
                    <MdRestartAlt size={22} />
                </Button>
            </Tooltip>

            <Tooltip text="Eliminar" position="top">
                <Button onClick={handleDelete}
                    disabled={selectedCount === 0} variant="ghostDanger" className="text-center"
                    padding="p-1"
                >
                    <MdOutlineDeleteSweep size={26} />
                </Button>
            </Tooltip>

            <Button onClick={handleEditConfirm}
                disabled={(selectedCount === 0 && reorderedCount === 0) || isPending} variant="tab" loading={isPending}
            >
                {isPending ? "Guardando..." : "Guardar cambios"}
            </Button>
        </div>
    </>
    )
}
