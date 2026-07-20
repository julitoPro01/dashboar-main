"use client"
import { ColumnDef, ColumnSizingState, getCoreRowModel, Row, RowSelectionState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { useState } from "react";
import { MetaPagination, type PaginationBasic } from "../pagination/shared/pagination.type";


export interface OptionMeta extends Record<any,any> {
    onSelect?: (params: any) => void
    selectedId?: number
    updateData?: (rowIndex: number | string, columnId: string, value: string | boolean | number) => void
    metaPagination?: MetaPagination
    filters?: Object
    actionType?: string
    pagination?: PaginationBasic
}

interface Options {
    enableColumnResizing?: boolean,
    enableRowSelection?: ((row: Row<any>) => boolean) | boolean,
    columnResizeMode?: "onChange" | "onEnd",
}

export interface UseTableProps<T extends any[]> {
    meta?: OptionMeta;
    data: T;
    columns: ColumnDef<any, any>[];
    initColumnVisibility?: VisibilityState;
    initColumnSizing?: ColumnSizingState,
    initRowSelection?: RowSelectionState,
    options?: Options
}

export const useTable = <T extends any[]>({
    data, meta, columns, options,
    initColumnVisibility, initColumnSizing, initRowSelection
}: UseTableProps<T>) => {

    const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({ ...initColumnSizing });
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({ ...initRowSelection });
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({ ...initColumnVisibility });

    const pag = meta?.pagination;

    const table = useReactTable({
        data: data, columns,
        getCoreRowModel: getCoreRowModel(),

        // onColumnFiltersChange: setColumnFilters,
        // getFilteredRowModel: getFilteredRowModel(),

        onColumnVisibilityChange: setColumnVisibility,
        enableColumnResizing: true,
        onColumnSizingChange: setColumnSizing,
        columnResizeMode: "onChange",

        enableRowSelection: options?.enableRowSelection,
        onRowSelectionChange: setRowSelection,
        getRowId: (row) => String(row.id),

        state: {
            rowSelection,
            columnSizing,
            pagination: { pageIndex: pag?.page ?? 0, pageSize: pag?.pageSize ?? 0 },
            columnVisibility,
            // columnFilters
        },
        meta
    });


    return { table, columnSizing, columnVisibility, rowSelection }
}
