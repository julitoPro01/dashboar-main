import { normalizePaginationQuery, PaginationQuery } from "@/src/domains/pagination";
import { parseRecordStatus } from "@/src/domains/record-status";
import { Details, FloatingMenu, LoadingSupplier, SupplierList, TopMenu } from "@/src/features/supplier";

interface Props {
    searchParams: PaginationQuery
}

export default async function SuppliersPage({ searchParams }: Props) {

    const query = await searchParams;

    const normalizeQuery = normalizePaginationQuery(query, { sortBy_acceptOnly: ["created_at", "name", "order"] });

    const { page, pageSize, order, state, sortBy } = normalizeQuery;
    const recordStatus = parseRecordStatus(state);


    return (
        <div className="flex flex-col  h-full w-full">

            <LoadingSupplier />

            <TopMenu />
            <div className="bg-surface border border-border rounded-t-xl shadow-card overflow-hidden flex flex-col flex-1  ">
                <SupplierList queryPagination={{ page, pageSize, order, state: recordStatus, sortBy }} />
            </div>

            <FloatingMenu/>
            {/* Modal */}
            <Details/>
        </div>
    );
}


