"use client";
import { useStore } from "@/src/store/useStore";
import { useCallback, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { BodyRowMemo, DynamicReactTable, HeaderRow, OpenPanelPayload, TableProvider, useTableContext } from "@/src/shared/table/core";
import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice";
import { APP_ROUTES } from "@/src/shared/routes";
import { PaginationState, TablePaginationUrl, useStableUrlPagination } from "@/src/shared/table/pagination";
import { SupplierResponse } from "../types";
import { ColumnSizingState } from "@tanstack/react-table";
import { useSuppliers } from "../shared/hooks";
import { columnDef } from "./table/ColumnDef";


interface Props {
    pagination: PaginationState;
}
export const ListSuppliers = ({ pagination }: Props) => {

    const filters = useStore(v => v.supplierFilter);

    const pag = useStableUrlPagination(pagination, filters, APP_ROUTES.SUPPLIERS.INDEX)

    const { suppliers, meta } = useSuppliers(pag, filters);

    const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});

    return (
        <TableProvider columns={columnDef} data={suppliers}
            stateAction={{ setColumnSizing }}
            state={{columnSizing}}
            meta={{ pagination: pag, metaPagination: meta }}
            stateOptions={{
                enableColumnResizing: true,
                columnResizeMode: "onChange"
            }}
        >
            <Render />
        </TableProvider>
    )
}


const Render = () => {

    const table = useTableContext().table!;

    const { selected, setSelect, setFloatMenu } = useStore(useShallow((v) => ({
        selected: v.selectedSupplier,
        setSelect: v.setSelectSupplier,
        setFloatMenu: v.setFloatingPanel
    })))

    const onOpenMenu = useCallback(({ cx, cy, original: { id, publicId } }: OpenPanelPayload<SupplierResponse>) => {
        setFloatMenu({ cx, cy, open: true, type: FLOATING_PANEL_TYPE.SUPPLIER });
        setSelect(id, publicId);
    }, [setFloatMenu, setSelect])


    const meta = table.options.meta?.metaPagination;
    const pag = table.options.meta?.pagination;

    return <>
        <DynamicReactTable
            totalSize={table.getCenterTotalSize()}
            HeaderRows={table.getHeaderGroups().map(group => <HeaderRow key={group.id} group={group} />)} >

            {
                table.getRowModel().rows.map(row => <BodyRowMemo
                    key={row.id}
                    isSelected={row.original.id === selected.id}
                    row={row}
                    onOpenPanel={onOpenMenu}

                />
                )
            }

        </DynamicReactTable>

        {
            (meta && pag) &&
            <TablePaginationUrl pagination={pag} metaPagination={meta} />
        }
    </>
}
