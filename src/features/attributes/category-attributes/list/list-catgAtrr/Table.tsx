"use client"
import { useStore } from "@/src/store/useStore";
import { useCallback } from "react";
import { SortableItemProvider, Sorteable } from "@/src/shared/sortable";
import { ListSelectionPanel } from "./ListSelectionPanel";
import { useSortableQuery } from "../../hook/useSortableQuery";
import { ActionType, CategoryAttrResponse } from "../../types";
import { DynamicReactTable, HeaderRow, SortableRow, useTableContext } from "@/src/shared/table/core";
import { TablePaginationUrl } from "@/src/shared/table/pagination";

interface Props { actionType: ActionType }

export const Table = ({ actionType }: Props) => {

    const table = useTableContext().table!;


    const setSelectedId = useStore(v => v.setCategoryAttrSelectedIds);
    const setSelect = useCallback((id: any) => setSelectedId(id), []);

    const { handleDragEnd } = useSortableQuery();

    const options = table.options.meta;
    const pagination = options?.pagination;
    const meta = options?.metaPagination;

    const items = table.getRowModel().rows.map<CategoryAttrResponse & { isSelected: boolean }>(v => ({ ...v.original, isSelected: v.getIsSelected() }));
    const itemIds = items.map(v => v.id);

    return (
        <>
            <Sorteable itemIds={itemIds} onDragEnd={handleDragEnd} strategy="vertical">
                <DynamicReactTable
                    roundedTop={false}
                    totalSize={table.getCenterTotalSize()}
                    HeaderRows={table.getHeaderGroups().map(group => <HeaderRow key={group.id} group={group} />)} >
                    {
                        table.getRowModel().rows.map(row => <SortableItemProvider
                            key={row.id} id={row.original.id}>
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
            </Sorteable>

            <ListSelectionPanel {...{
                actionType,
                items,
                tableResetRowSelection: table.resetRowSelection
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

