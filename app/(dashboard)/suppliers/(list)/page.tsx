import { SORTBY_ACCEPT_ONLY, SupplierList } from "@/src/features/suppliers";
import { type PaginationQuery, normalizePaginationParams } from "@/src/shared/table";

interface Props { searchParams: PaginationQuery }


export default async function SuppliersPage({ searchParams }: Props) {

    const query = await searchParams;
    const norPage = normalizePaginationParams(query, {
        sortBy_acceptOnly: SORTBY_ACCEPT_ONLY, includeState: true, parseState: true,
    });
    return (
        <SupplierList pagination={norPage} />
    );
}


