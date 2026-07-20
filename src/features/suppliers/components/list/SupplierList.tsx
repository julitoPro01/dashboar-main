"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSuppliers } from "@/src/action";
import { useStore } from "@/src/store/useStore";
import { useCallback, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { columnDef } from "./table/ColumnDef";
import { SupplierTableFilter } from "../../types";
import { useDelayedFetchState } from "@/src/shared/hooks";
import { BodyRow, DynamicReactTable, HeaderRow, type PaginationBasic, TablePagination, TableProvider, useStableUrlPagination, useTableContext } from "@/src/shared/table";
import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { APP_ROUTES } from "@/src/shared/routes";

interface Props {
    pagination: PaginationBasic;
}
export const SupplierList = ({ pagination }: Props) => {

    const setFetchStatus = useStore(v => v.setFetchStatus);
    const filters = useStore(v => v.supplierFilter);

    const pag = useStableUrlPagination(pagination, filters, APP_ROUTES.SUPPLIERS.INDEX)
    const { data, isFetching, isError } = useSuppliersQuery(pag, filters);
    const suppliers = data?.data?.suppliers ?? [];
    const meta = data?.data?.meta;

    useDelayedFetchState({
        isFetching, errorMsg: isError || !data?.ok, setState: setFetchStatus, delay: 1000,
    });

    return (
        <TableProvider columns={columnDef} data={suppliers}

            meta={{ pagination: pag, metaPagination: meta }}
            options={{
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

    const onOpenMenu = useCallback(({ cx, cy, id, publicId }: Select) => {
        setFloatMenu({ cx, cy, open: true, type: FLOATING_PANEL_TYPE.SUPPLIER });
        setSelect(id, publicId);
    }, [setFloatMenu, setSelect])

    const columnSizing = table.getState().columnSizing;
    const headerList = useMemo(
        () => table.getHeaderGroups().map(group => <HeaderRow key={group.id} group={group} />),
        [table, columnSizing]
    );

    const meta = table.options.meta?.metaPagination;
    const pag = table.options.meta?.pagination;

    return <>
        <DynamicReactTable
            totalSize={table.getCenterTotalSize()}
            HeaderRows={headerList} >

            {
                table.getRowModel().rows.map(row => <BodyRow
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
            <TablePagination pagination={pag} metaPagination={meta} />
        }
    </>
}

type Select = { cx: number, cy: number, id: number, publicId?: string }

function useSuppliersQuery(
    pagination: PaginationBasic, filters: SupplierTableFilter
) {
    return useQuery({

        queryKey: QUERY_KEYS.suppliers.list(pagination, filters),
        queryFn: () => getSuppliers(pagination, filters),
        staleTime: 60 * 1000,
        refetchOnWindowFocus: true,
        placeholderData: keepPreviousData,
    });
}