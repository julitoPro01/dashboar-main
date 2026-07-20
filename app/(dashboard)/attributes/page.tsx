import { auth } from "@/auth.config";
import { ATTRIBUTE_SORTBY_ACCEPT_ONLY, AttributeList, DeleteAttributeModal, EditAttributeModal, RowFloatingActions } from "@/src/features/attributes";
import { type PaginationQuery, normalizePaginationParams } from "@/src/shared/table";


export default async function AttributesPage({ searchParams }: { searchParams: PaginationQuery }) {

    const query = await searchParams;

    const norPage = normalizePaginationParams(query, { includeState: true, parseState: true, sortBy_acceptOnly: ATTRIBUTE_SORTBY_ACCEPT_ONLY });

    const session = await auth()
    const user = session!.user;

    return (
        <div className="flex flex-col h-full">

            <AttributeList pagination={norPage} />

            <RowFloatingActions />

            <DeleteAttributeModal />

            <EditAttributeModal updatedBy={user.name} updatedById={+user.id} />
        </div>
    )
}