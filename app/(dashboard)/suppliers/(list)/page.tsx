import { SORTBY_ACCEPT_ONLY } from "@/src/features/suppliers/constants";
import { ListSuppliers } from "@/src/features/suppliers/list";

import { normalizePaginationParams, PaginationQuery } from "@/src/shared/table/pagination";

interface Props { searchParams: PaginationQuery }

export default async function SuppliersPage({ searchParams }: Props) {

    const query = await searchParams;
    const norPage = normalizePaginationParams(query, {
        sortBy_acceptOnly: SORTBY_ACCEPT_ONLY, includeState: true, parseState: true,
    });
    return (
        <ListSuppliers pagination={norPage} />
    );
}


