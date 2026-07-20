"use client"
import { getProducts } from "@/src/action";
import { useStore } from "@/src/store/useStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TableProvider, useStableUrlPagination, type PaginationBasic } from "@/src/shared/table";
import { ProductTableFilters } from "../../types/productTableFilter.type";
import { APP_ROUTES } from "@/src/shared/routes";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { useDelayedFetchState } from "@/src/shared/hooks";
import { columns } from "./table/Columns";
import { Table } from "./table/Table";

interface Props {
    pagination: PaginationBasic;
}

export const ProductList = ({ pagination }: Props) => {

    const setFetchStatus = useStore(v => v.setFetchStatus);
    const filters = useStore(v => v.productFilters);

    const pag = useStableUrlPagination(pagination, filters, APP_ROUTES.PRODUCTS.INDEX)

    const { data, isFetching, isError } = useProductQuery(pag, {categoryId:1});
    const products = data?.data?.products ?? [];
    const meta = data?.data?.meta;

    useDelayedFetchState({
        isFetching, errorMsg: isError || !data?.ok, setState: setFetchStatus, delay: 1000
    });


    return (
        <TableProvider columns={columns} data={products} meta={{ pagination: pag, metaPagination: meta }}
            options={{ enableColumnResizing: true, columnResizeMode: "onChange" }}>
            <Table/>
        </TableProvider>
    )
}


export function useProductQuery(pag: PaginationBasic, filt: ProductTableFilters) {
    return useQuery({
        queryKey: QUERY_KEYS.products.list(pag, filt),
        queryFn: () => getProducts(pag, filt),
        staleTime: 60 * 1000,
        refetchOnWindowFocus: true,
        placeholderData: keepPreviousData,
    });
}