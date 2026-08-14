"use client"
import { useStore } from "@/src/store/useStore";
import { useCallback, useEffect } from "react";
import { SortableItemProvider } from "@/src/shared/sortable";
import { SelectionPanel } from "./SelectionPanel";
import { useSortableQuery } from "../../hook/useSortableQuery";
import { CategoryAttrResponse } from "../../types";
import { DynamicReactTable, HeaderRow, SortableRow, useTableContext } from "@/src/shared/table/core";
import { TablePaginationUrl } from "@/src/shared/table/pagination";
import { DragDropProvider } from "@dnd-kit/react";


export const Table = () => {

    const table = useTableContext().table!;

    const setSelectedId = useStore(v => v.setCategoryAttrsSelectedIds);
    const setSelect = useCallback((id: number) => setSelectedId(curr => curr.includes(id) ? curr.filter(v => v !== id) : [...curr, id]), []);

    const { handleDragEnd } = useSortableQuery();

    const options = table.options.meta;
    const pagination = options?.pagination;
    const meta = options?.metaPagination;
    // custom
    const actionType = options?.actionType ?? "view";
    const invalidationReason = options?.invalidationReason

    const items = table.getRowModel().rows.map<CategoryAttrResponse & { isSelected: boolean }>(v => ({ ...v.original, isSelected: v.getIsSelected() }));

    const resetState = () => {
        const { setCategoryAttrsFilters, setCategoryAttrsSelectedIds } = useStore.getState();

        setCategoryAttrsFilters((v) => ({ fil: { selection: { ids: [], type: v.selection?.type! } } }));
        setCategoryAttrsSelectedIds([]);
        table.resetRowSelection()
    }

    useEffect(() => {

        if (invalidationReason) {
            // assign
            if (
                invalidationReason.type === "add" ||
                invalidationReason.type === "update" ||
                invalidationReason.type === "delete"
            ) {
                resetState();
            }
        }

    }, [invalidationReason])

    return (
        <>
            <DragDropProvider onDragEnd={handleDragEnd} >
                <DynamicReactTable
                    roundedTop={false}
                    totalSize={table.getCenterTotalSize()}
                    HeaderRows={table.getHeaderGroups().map(group => <HeaderRow key={group.id} group={group} />)} >
                    {
                        table.getRowModel().rows.map((row, i) =>
                            <SortableItemProvider
                                key={row.id}
                                index={i}
                                id={row.original.id}>
                                <SortableRow
                                    row={row}
                                    isSelected={row.getIsSelected()}
                                    canSelect={row.getCanSelect()}
                                    onSelect={setSelect}
                                />
                            </SortableItemProvider>
                        )
                    }
                </DynamicReactTable>
            </DragDropProvider>

            <SelectionPanel {...{
                actionType,
                items,
                resetState,
                invalidationReason
            }} />

            {(meta && pagination) &&
                <TablePaginationUrl
                    pagination={pagination}
                    metaPagination={meta}
                />
            }
        </>
    )
}

