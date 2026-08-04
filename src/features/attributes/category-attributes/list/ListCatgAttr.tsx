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

    const filters = useStore(v => v.categoryAttrFilters);

    const pag = useStableUrlPagination(pagination, filters, APP_ROUTES.ATTRIBUTES.CATEGORY)

    const cleanSelectionFilter = useStore(v => v.setCategoryAttrFilters);
    const cleanSelectionIds = useStore(v => v.resetCategoryAttrSelectedIds);

    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});

    const { categoryAttrs, meta, updateData, actionType } = useCategoryAttrs(pag, filters);


    //Limpiamos los ides seleccionados al desmontar
    useEffect(() => {
        return () => {
            cleanSelectionIds();
            cleanSelectionFilter({ fil: { selection: { type: "all" } } })
        }
    }, [])


    return (
        <TableProvider
            columns={columnDef} data={categoryAttrs}
            meta={{ pagination: pag, metaPagination: meta, updateData }}
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
            <Table actionType={actionType} />
        </TableProvider>
    )
}
