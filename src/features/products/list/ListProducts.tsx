"use client"

import { useStore } from "@/src/store/useStore";
import { APP_ROUTES } from "@/src/shared/routes";
import { columns } from "./table/Columns";
import { Table } from "./table/Table";
import { PaginationState, useStableUrlPagination } from "@/src/shared/table/pagination";
import { TableProvider } from "@/src/shared/table/core";
import { useProducts } from "../shared/hooks";
import { useState } from "react";
import { ColumnSizingState } from "@tanstack/react-table";

interface Props {
    pagination: PaginationState;
}

export const ListProducts = ({ pagination }: Props) => {

    const filters = useStore(v => v.productFilters);

    const pag = useStableUrlPagination(pagination, filters, APP_ROUTES.PRODUCTS.INDEX)

    const { products, meta } = useProducts(pag, filters);

    const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});

    return (
        <TableProvider columns={columns} data={products}
            meta={{ pagination: pag, metaPagination: meta }}
            stateAction={{ setColumnSizing }}
            state={{ columnSizing }}
            stateOptions={{ enableColumnResizing: true, columnResizeMode: "onChange" }}>
            <Table />
        </TableProvider>
    )
}

