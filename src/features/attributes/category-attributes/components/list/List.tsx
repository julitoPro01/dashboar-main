"use client"
import { DynamicReactTable, HeaderRow, SortableRow, TablePagination, useTableContext } from "@/src/shared/table";
import { useStore } from "@/src/store/useStore";
import { useCallback, useMemo} from "react";
import { SortableItemProvider, Sorteable } from "@/src/shared/sortable";
import { ListSelectionPanel } from "./ListSelectionPanel";
import { useSortableQuery } from "../../hook/useSortableQuery";
import { ActionType, CategoryAttrResponse } from "../../types";

interface Props { actionType: ActionType }
export const List = ({ actionType }: Props) => {

    const table = useTableContext().table!;

    const columnVisibility = table.getState().columnVisibility;
    const columnSizing = table.getState().columnSizing;

    const setSelectedId = useStore(v => v.setCategoryAttrSelectedIds);
    const setSelect = useCallback((id: any) => setSelectedId(id), []);

    const headerList = useMemo(
        () => table.getHeaderGroups().map(group => <HeaderRow key={group.id} group={group} />),
        [
            table,
            table.getIsAllRowsSelected(),
            table.getIsSomeRowsSelected(),
            table.getIsAllColumnsVisible(),
            columnSizing,
            columnVisibility
        ]
    );

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
                    HeaderRows={headerList} >
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
                <TablePagination
                    pagination={pagination}
                    metaPagination={meta}
                />
            }
        </>
    )
}

