"use client";

import { DynamicReactTable, OpenPanelParams, SortableRow, DynamicSortableRow, TableProvider, useTableContext } from "@/src/shared/table/core";
import { MetaPagination, PaginationState, TablePaginationUrl } from "@/src/shared/table/pagination";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ColumnSizingState, RowSelectionState } from "@tanstack/react-table";
import { DragDropProvider } from "@dnd-kit/react";
import { SortableItemProvider } from "@/src/shared/sortable";
import { useStore } from "@/src/store/useStore";
import { moveDragEnd } from "@/src/shared/sortable/moveDragEnd";
import { columns, visibilityColumnByAction } from "./table";
import { VariantListItemResponse } from "../../../types";
import { TableActionPanel } from "./tableActionPanel";
import { HeaderRow } from "./table/HeaderRow";
import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice";
import { VARIANT_TABLE_ACTION } from "@/src/store/variantSlice";


interface Props {
    variants: VariantListItemResponse[];
    pagination: PaginationState;
    metaPagination: MetaPagination;
}

export const ListVariants = ({ variants, pagination, metaPagination }: Props) => {

    const reagentColumn = useStore(v => v.variantReagentColumn);

    const tableAction = useStore(v => v.variantTableAction);
    const previusVersionRef = useRef(tableAction.version);

    const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
    const [orderedVariants, setOrderedVariants] = useState(variants);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    // Para acción de reordenamiento ---------------
    const handleDragEnd = moveDragEnd(orderedVariants, (nextVariants) => {
        setOrderedVariants(nextVariants);
    });

    const reorderedCount = useMemo(() => {
        const currentOrder = orderedVariants.map(v => v.id);
        return currentOrder.filter((id, index) => id !== variants[index]?.id).length;
    }, [orderedVariants])

    //Volvemos al orden original
    const handleUndo = () => {
        setOrderedVariants(variants);
    }


    // Reestablecemos la lista reorder si existen valores reordenanos
    // y la versión no ha cambiado
    useEffect(() => {

        if (tableAction.type === VARIANT_TABLE_ACTION.list)
            if (reorderedCount && (previusVersionRef.current === tableAction.version)) {
                setOrderedVariants(variants);
            }

        if (tableAction.version !== previusVersionRef.current)
            previusVersionRef.current = tableAction.version

    }, [tableAction.type, tableAction.version, reorderedCount, variants])
    // -------------------------

    //Inicializamos datos
    useEffect(() => {
        setOrderedVariants(variants);

        // if(isModeEdit)
        reagentColumn("price")

    }, [variants, reagentColumn]);


    return (
        <>
            <TableProvider
                data={orderedVariants}
                columns={columns}
                meta={{ pagination, metaPagination }}
                state={{
                    columnSizing,
                    columnVisibility: visibilityColumnByAction[tableAction.type],
                    rowSelection
                }}
                stateAction={{
                    setColumnSizing,
                    setRowSelection
                }}
                stateOptions={{
                    enableColumnResizing: true,
                    columnResizeMode: "onChange",
                    enableRowSelection: false
                    // enableRowSelection: enabledRowSelection.includes(tableActiontype),
                    // enableMultiRowSelection: enableMultiRowSelection.includes(tableActiontype)
                }}

            >
                <DragDropProvider onDragEnd={handleDragEnd}>
                    <Table />
                </DragDropProvider>

                <TableActionPanel
                    action={tableAction.type}
                    reorderedCount={reorderedCount}
                    onUndo={handleUndo}
                />

            </TableProvider>
            <TablePaginationUrl pagination={pagination} metaPagination={metaPagination} />
        </>
    );
}

const Table = () => {

    const table = useTableContext().table!;

    const selected = useStore(v => v.variantSelected);
    const setSelect = useStore(v => v.setVariantSelect);
    const setDetailsId = useStore(v => v.setVariantDetailsId);
    const setFloatingMenu = useStore(v => v.setFloatingPanel);

    const tableActionType = useStore(v => v.variantTableAction.type);

    const select = (original: VariantListItemResponse) => {
        setSelect({
            id: original.id,
            sku: original.sku,
            isMainVariant: original.isMainVariant,
            attributes: original.attributes,
            inventoryPolicy: original.inventoryPolicy,
            stockQuantity: original.stockQuantity,
            minStock: original.minStock,
            stockAdjustments: original.stockAdjustments,
            variantChannel: original.variantChannel,
            recordStatus: original.recordStatus,
        });
    }
    // Abrir panel de menu
    const handleOpenMenu = useCallback(({ cx, cy, original }: OpenPanelParams<VariantListItemResponse>) => {

        setFloatingMenu({ cx, cy, open: true, type: FLOATING_PANEL_TYPE.VARIANT });
        select(original);

    }, [setFloatingMenu, setSelect])

    // Seleccionar fila para acciones específicas
    const handleSelect = useCallback((original: VariantListItemResponse) => {

        if (tableActionType === "editMode") return;

        if (tableActionType === "details") {
            setDetailsId(original.id);
            select(original)
        }

    }, [tableActionType])

    // Deseleccionamos todas las filas a vista por defecto.
    useEffect(() => {

        const hasSelection = table.getSelectedRowModel().rows.length;
        if (tableActionType === "list" && hasSelection)
            table.toggleAllRowsSelected(false)

    }, [tableActionType, table]);


    // Control de las filas
    const enabledDrag = tableActionType === VARIANT_TABLE_ACTION.reorder;
    const enabledRowClick = tableActionType !== VARIANT_TABLE_ACTION.editMode

    const openPanel = tableActionType === VARIANT_TABLE_ACTION.list ? handleOpenMenu : undefined;
    const onSelect = tableActionType === VARIANT_TABLE_ACTION.details ? handleSelect : undefined
    return (
        <>
            <DynamicReactTable
                roundedTop={false}
                totalSize={table.getCenterTotalSize()}
                HeaderRows={table.getHeaderGroups().map(group => (
                    <HeaderRow key={group.id} group={group} />
                ))}
            >

                {table.getRowModel().rows.map((row, i) => (
                    <SortableItemProvider
                        key={row.id}
                        index={i}
                        id={row.original.id}
                        disabled={!enabledDrag}
                    >
                        <DynamicSortableRow
                            row={row}
                            isSelected={row.original.id === selected?.id || row.getIsSelected()}
                            canSelect={row.getCanSelect()}

                            onOpenPanel={openPanel}
                            onSelect={onSelect}
                            enableRowClick={enabledRowClick}
                        />

                    </SortableItemProvider>
                ))}
            </DynamicReactTable>

        </>
    )
}
