"use client";
import { Button } from "@/src/shared/components/btn"
import { useTableContext } from "@/src/shared/table/core";
import { useStore } from "@/src/store/useStore"
import { IoLinkOutline } from "react-icons/io5"
import { MdOutlineModeEdit, MdOutlineVisibility } from "react-icons/md"
import { useShallow } from "zustand/react/shallow"
import { visibilityByAction } from "./list-catgAtrr/table/ColumnDef";
import { useEffect } from "react";

type Action = "view" | "assign" | "edit";

export const ManagerAttribute = () => {

    const { setFilters, categoryId, actionType, setCleanSelectedIds } = useStore(useShallow((v) => ({
        setFilters: v.setCategoryAttrFilters,
        setCleanSelectedIds: v.resetCategoryAttrSelectedIds,
        actionType: v.categoryAttrFilters.actionType,
        categoryId: v.categoryAttrFilters.categoryId,
    })));

    const table = useTableContext().table!;

    const columnVisib = (action: Action) => {
        const config = visibilityByAction[action];
        if (!config) return;

        Object.entries(config).forEach(([columnId, visible]) => {
            table.getColumn(columnId)?.toggleVisibility(visible)
        })
    }

    const handleAction = (action: Action) => {

        columnVisib(action)
        setFilters({ fil: { categoryId, actionType: action } });

    }

    useEffect(() => {
        table.resetRowSelection();
        setCleanSelectedIds();
    }, [categoryId])

    return (
        <div className="bg-surface py-2 flex items-center gap-1 sm:gap-2 border-b-0 border border-border">
            <Button variant="tab" size="sm" className="px-4 py-2" select="underline" disabled={!categoryId}
                active={actionType === "view"} onClick={() => handleAction("view")} >
                <MdOutlineVisibility className="text-lg" />
                <span>Ver</span>
            </Button>

            <Button variant="tab" size="sm" className="px-4 py-2" select="underline" disabled={!categoryId}
                active={actionType === "assign"} onClick={() => handleAction("assign")} >
                <IoLinkOutline className="text-lg" />
                <span>Asignar</span>
            </Button>

            <Button variant="tab" size="sm" className="px-4 py-2" select="underline" disabled={!categoryId}
                active={actionType === "edit"} onClick={() => handleAction("edit")} >
                <MdOutlineModeEdit className="text-lg " />
                <span>Editar</span>
            </Button>
        </div>
    )
}
