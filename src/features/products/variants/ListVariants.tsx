"use client";

import { DynamicReactTable, HeaderRow, SortableRow, TableProvider, useTable, useTableContext } from "@/src/shared/table/core";
import { VariantListItemResponse } from "../types";
import { columns } from "./list-variants/Columns";
import { useEffect, useState } from "react";
import { ColumnSizingState, RowSelectionState } from "@tanstack/react-table";
import { DragDropProvider } from "@dnd-kit/react";
import { SortableItemProvider } from "@/src/shared/sortable";
import { visibilityColumnByAction } from "./list-variants/visibilityColumnByAction";
import { useStore } from "@/src/store/useStore";
import { TableActionPanel } from "./list-variants/TableActionPanel";
import { moveDragEnd } from "@/src/shared/sortable/moveDragEnd";
import { VariantTableAction } from "@/src/store/variantSlice";


const enabledRowSelection: VariantTableAction["type"][] = ["setMain", "adjustStock"];
const enableMultiRowSelection: VariantTableAction["type"][] = ["multipleSelection"];

interface Props {
    variants: VariantListItemResponse[];
}

export const ListVariants = ({ variants }: Props) => {

    const tableActiontype = useStore(v => v.variantTableAction.type);

    const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
    const [orderedVariants, setOrderedVariants] = useState(variants);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});


    const handleDragEnd = moveDragEnd(orderedVariants, (nextVariants) => {
        setOrderedVariants(nextVariants);
    });

    const reorderedCount = () => {
        const currentOrder = orderedVariants.map(v => v.id);
        return currentOrder.filter(
            (id, index) =>
                id !== variants[index]?.id
        ).length;
    }

    const handleUndo = () => {
        setOrderedVariants(variants);
    }

    //Inicializamos
    useEffect(() => {
        setOrderedVariants(variants);
    }, [variants]);

    // const enableRowSelection = tableActiontype===""

    return (
        <>
            <TableProvider
                data={orderedVariants}
                columns={columns}
                state={{
                    columnSizing,
                    columnVisibility: visibilityColumnByAction[tableActiontype],
                    rowSelection
                }}
                stateAction={{
                    setColumnSizing,
                    setRowSelection
                }}
                stateOptions={{
                    enableColumnResizing: true,
                    columnResizeMode: "onChange",
                    enableRowSelection: enabledRowSelection.includes(tableActiontype),
                    enableMultiRowSelection: enableMultiRowSelection.includes(tableActiontype)
                }}

            >
                <DragDropProvider onDragEnd={handleDragEnd}>
                    <Table />
                </DragDropProvider>

                <TableActionPanel
                    action={tableActiontype}
                    reorderedCount={reorderedCount()}
                    onUndo={handleUndo}
                />

            </TableProvider>
        </>
    );
}

const Table = () => {

    const table = useTableContext().table!;

    const tableActionType = useStore(v => v.variantTableAction.type);

    const enabledDrag = tableActionType === "reorder";


    // Deseleccionamos todas las filas si vista por defecto.
    useEffect(() => {

        const hasSelection = table.getSelectedRowModel().rows.length;
        if (tableActionType === "list" && hasSelection)
            table.toggleAllRowsSelected(false)

    }, [tableActionType, table])


    return (
        <>
            <DynamicReactTable
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
                        <SortableRow
                            row={row}
                            isSelected={row.getIsSelected()}
                            canSelect={row.getCanSelect()}
                        // onSelect={ }
                        />
                    </SortableItemProvider>
                ))}
            </DynamicReactTable>

        </>
    )
}