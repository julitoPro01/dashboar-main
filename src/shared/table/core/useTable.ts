"use client"
import { ColumnDef, ColumnSizingState, getCoreRowModel, Row, RowSelectionState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { type PaginationState } from "../pagination/types/pagination";
import { MetaPagination } from "../pagination";


export interface MetaOptions {
    onSelect?: (params: any) => void
    selectedId?: number
    updateData?: (rowIndex: number | string, columnId: string, value: string | boolean | number) => void
    filters?: Object
    actionType?: string
    metaPagination?: MetaPagination
    pagination?: PaginationState
}

interface StateOptions {
    enableColumnResizing?: boolean,
    enableRowSelection?: ((row: Row<any>) => boolean) | boolean,
    columnResizeMode?: "onChange" | "onEnd",
    enableMultiRowSelection?:boolean
}

interface stateAction {
    setColumnSizing?: Dispatch<SetStateAction<ColumnSizingState>>;
    setRowSelection?: Dispatch<SetStateAction<RowSelectionState>>;
    setColumnVisibility?: Dispatch<SetStateAction<VisibilityState>>
}
interface State {
    columnSizing?: ColumnSizingState;
    rowSelection?: RowSelectionState
    columnVisibility?: VisibilityState
}

export interface UseTableProps<T> {
    meta?: MetaOptions;
    data: T;
    columns: ColumnDef<any, any>[];

    stateOptions?: StateOptions;
    stateAction?: stateAction;
    state?: State;
}

export const useTable = <T extends any[]>({
    data, meta, columns, stateOptions, stateAction, state
}: UseTableProps<T>) => {


    const pag = meta?.pagination;

    const table = useReactTable({
        data: data, columns,
        getCoreRowModel: getCoreRowModel(),

        onColumnVisibilityChange: stateAction?.setColumnVisibility,
        onColumnSizingChange: stateAction?.setColumnSizing,
        onRowSelectionChange: stateAction?.setRowSelection,

        getRowId: (row) => String(row.id),
        
        ...stateOptions,

        state: {
            ...state,
            pagination: {
                pageIndex: pag?.page ?? 0,
                pageSize: pag?.pageSize ?? 0
            },
        },
        meta
    });


    return table
}
