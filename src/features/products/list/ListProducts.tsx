"use client"

import { useStore } from "@/src/store/useStore";
import { APP_ROUTES } from "@/src/shared/routes";
import { columns } from "./table/Columns";
import { Table } from "./table/Table";
import { PaginationState, useStableUrlPagination } from "@/src/shared/table/pagination";
import { TableProvider } from "@/src/shared/table/core";
import { useProducts } from "../shared/hooks";

interface Props {
    pagination: PaginationState;
}

export const ListProduct = ({ pagination }: Props) => {

    const filters = useStore(v => v.productFilters);

    const pag = useStableUrlPagination(pagination, filters, APP_ROUTES.PRODUCTS.INDEX)

    const { products, meta } = useProducts(pag, { categoryId: 1 });


    return (
        <TableProvider columns={columns} data={products}
            meta={{ pagination: pag, metaPagination: meta }}
            stateOptions={{ enableColumnResizing: true, columnResizeMode: "onChange" }}>
            <Table />
        </TableProvider>
    )
}

