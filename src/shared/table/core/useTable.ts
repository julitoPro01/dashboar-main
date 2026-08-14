"use client"
import { ColumnDef, ColumnSizingState, getCoreRowModel, Row, RowSelectionState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { type PaginationState } from "../pagination/types/pagination";
import { MetaPagination } from "../pagination";

export type MetaActionType = "view" | "assign" | "edit";
export type MetaInvalidationReasonType = { type: "create" | "update" | "add" | "delete" | "refresh", time: number }

export interface MetaOptions {
    // Estilos
    styleHeader?: string
    styleBody?: string
    styleHover?: string
    fill?: boolean

    selectedId?: number
    // Paginacion
    filters?: Object
    metaPagination?: MetaPagination
    pagination?: PaginationState

    // funcionalidad de la tabla
    actionType?: MetaActionType

    // Rason por la la tabla recive datos fresco
    invalidationReason?: MetaInvalidationReasonType

    onSelect?: (params: any) => void
    updateData?: (rowIndex: number | string, columnId: string, value: string | boolean | number) => void
}

interface StateOptions {
    enableColumnResizing?: boolean,
    enableRowSelection?: ((row: Row<any>) => boolean) | boolean,
    columnResizeMode?: "onChange" | "onEnd",
    enableMultiRowSelection?: boolean
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
    meta?: MetaOptions | Record<string, any>;
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
