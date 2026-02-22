"use client";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SupplierTableFilter } from "@/src/interfaces/supplier";
import { getSuppliers } from "@/src/action";
import { useStore } from "@/src/store/useStore";
import { serializeRecordStatus } from "@/src/domains/record-status";
import { useDelayedLoadingState } from "@/src/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { PaginationBasic } from "@/src/domains/pagination";
import { DynamicReactTable, TablePagination } from "@/src/components/table";
import { RowItemBody, RowItemHeader } from "./table/RowItem";
import { RECORD_STATUS_TYPE } from "@/src/interfaces/record-status"
import { columnDef } from "./table/CreateColumn";

const basePath = "/suppliers"

type Props = {
    queryPagination: PaginationBasic<RECORD_STATUS_TYPE>;
}

export const SupplierList = ({ queryPagination }: Props) => {

    const { query, filters } = useStore(useShallow(
        v => ({
            query: v.supplierPagination,
            filters: v.supplierFilter
        })));

    const setSupplPag = useStore(v => v.setSupplierPagination);

    //Actualizamos la pagínación
    useEffect(() => {
        setSupplPag({ ...queryPagination, state: queryPagination.state });
    }, [setSupplPag, queryPagination])


    if (!query.isActive) return null;

    return (
        <TableReact pagination={query.pagination} filters={filters} />
    )
}


interface TableProps {
    pagination: PaginationBasic<RECORD_STATUS_TYPE>;
    filters: SupplierTableFilter;
}


const TableReact = ({ pagination, filters }: TableProps) => {
    //-----------
    const selected = useStore(v => v.selectedSupplier);

    const setFloatMenu = useStore(v => v.setFloatingPanel);
    const setSelect = useStore(v => v.setSelectSupplier);

    const onSelect = useCallback((cx: number, cy: number, id: number, publicId: string) => {
        setFloatMenu({ cx, cy, open: true });
        setSelect(id, publicId);
    }, [setFloatMenu, setSelect])
    //-------------------

    const setLoadingSupplierState = useStore(v => v.setLoadingSupplierState);
    const setPagination = useStore(v => v.setSupplierPagination);

    const [columnSizing, setColumnSizing] = useState({});

    //------------------------
    const { data: response, isFetching, error } = useSuppliersQuery(pagination, filters);

    const suppliers = response?.data?.suppliers;
    const meta = response?.data?.meta;
    const isError = (!response?.ok || error) ? true : false;
    const recordStatusLabel = serializeRecordStatus(pagination.state);
    //------------------------

    const table = useReactTable({
        data: suppliers ?? [],
        columns: columnDef,
        getCoreRowModel: getCoreRowModel(),

        enableColumnResizing: true,
        onColumnSizingChange: setColumnSizing,
        columnResizeMode: "onChange",

        state: {
            columnSizing,
            pagination: { pageIndex: pagination.page, pageSize: pagination.pageSize }
        },
    })

    useDelayedLoadingState({ isFetching, isError, setState: setLoadingSupplierState, delay: 1000, });

    const headerList = useMemo(
        () => table.getHeaderGroups().map(group => <RowItemHeader key={group.id} group={group} />),
        [table, columnSizing]
    );

    return (
        <>
            <DynamicReactTable
                totalSize={table.getCenterTotalSize()}
                HeaderList={headerList} >
                
                    {
                        table.getRowModel().rows.map(row => <RowItemBody key={row.id} selectedId={selected.id} onSelect={onSelect} row={row} />)
                    }
                    
            </DynamicReactTable>

            {
                meta &&
                <TablePagination
                    queryPagination={{ ...pagination, state: recordStatusLabel }}
                    metaPagination={meta}
                    basePath={basePath}
                    setPagination={(pag) => setPagination({ ...pag } as PaginationBasic<RECORD_STATUS_TYPE>)}
                />
            }
        </>
    )
}


export function useSuppliersQuery(
    pagination: PaginationBasic<RECORD_STATUS_TYPE>, filters: SupplierTableFilter
) {
    return useQuery({

        queryKey: [
            'suppliers', pagination, filters
        ],
        queryFn: () => getSuppliers(pagination, filters),
        staleTime: 60 * 1000,
        refetchOnWindowFocus: true,
        placeholderData: keepPreviousData,
    });
}