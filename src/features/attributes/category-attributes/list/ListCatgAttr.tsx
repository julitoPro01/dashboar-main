"use client"
import { useCategoryAttrs } from "../hook/useCategoryAttrs";
import { columnDef, visibilityByAction } from "./list-catgAtrr/table/ColumnDef";
import { ManagerAttribute } from "./ManagerAttribute";
import { useEffect, useState } from "react";
import { useStore } from "@/src/store/useStore";
import { Table } from "./list-catgAtrr/Table";
import { PaginationState, useStableUrlPagination } from "@/src/shared/table/pagination";
import { TableProvider } from "@/src/shared/table/core";
import { APP_ROUTES } from "@/src/shared/routes";
import { ColumnSizingState, RowSelectionState } from "@tanstack/react-table";

interface Props { pagination: PaginationState }

export const ListCatgAttr = ({ pagination }: Props) => {

    const filters = useStore(v => v.categoryAttrsFilters);

    const pag = useStableUrlPagination(pagination, filters, APP_ROUTES.ATTRIBUTES.CATEGORY)

    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});

    const { categoryAttrs, meta, updateData, actionType, invalidationReason } = useCategoryAttrs(pag, filters);


    //Limpiamos al desmontar
    useEffect(() => {
        return () => {
            const { setCategoryAttrsFilters, setCategoryAttrsSelectedIds } = useStore.getState();
            // Los filtros de seleccion
            setCategoryAttrsFilters({ fil: { selection: { type: "all" } } });
            // los ides seleccionados
            setCategoryAttrsSelectedIds([]);
        }
    }, []);





    return (
        <TableProvider
            columns={columnDef} data={categoryAttrs}
            meta={{
                pagination: pag,
                metaPagination: meta,
                updateData,
                // custom
                actionType,invalidationReason
            }}
            stateOptions={{
                columnResizeMode: "onChange",
                enableColumnResizing: true,
                enableRowSelection: actionType !== "view",
            }}
            state={{
                columnVisibility: visibilityByAction[actionType],
                rowSelection, columnSizing
            }}
            stateAction={{ setRowSelection, setColumnSizing }}
        >
            <ManagerAttribute />
            <Table />
        </TableProvider>
    )
}
