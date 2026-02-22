"use client"
import { getProducts } from "@/src/action";
import { PaginationBasic } from "@/src/domains/pagination";
import { ProductTableFilters } from "@/src/interfaces/products";
import { useStore } from "@/src/store/useStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

interface Props {
    queryPagination: PaginationBasic;
}

export const ProductTable = ({ queryPagination }: Props) => {

    const setPagination = useStore(v => v.setProductPagination);

    const { filters, pag } = useStore(useShallow((v) => ({
        filters: v.productFilters,
        pag: v.productPagination
    })));

    useEffect(() => {
        setPagination(queryPagination)
    }, [queryPagination, setPagination])


    const pagination = pag.pagination;

    if (!pag.isActive) return null;

    return <Table filters={filters} pagination={pagination} />
}

interface TableProps {
    pagination: PaginationBasic;
    filters: ProductTableFilters;
}
const Table = ({ pagination, filters }: TableProps) => {

    const {data:res,isFetching,error } = useProductQuery(pagination, filters);
    console.log(res?.data,isFetching)
    return (
        <></>
    )
}



export function useProductQuery(pag: PaginationBasic, filt: ProductTableFilters) {
    return useQuery({
        queryKey: ['products', pag, filt],
        queryFn: () => getProducts(filt, pag),
        staleTime: 60 * 1000,
        refetchOnWindowFocus: true,
        placeholderData: keepPreviousData,
    });
}