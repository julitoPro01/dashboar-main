import { auth } from "@/auth.config";
import { ListAttribute, DeleteAttributeModal, EditAttributeModal, RowFloatingActions } from "@/src/features/attributes/attribute-definition/list";
import { ATTRIBUTE_NORMALIZE_PAGINATION } from "@/src/features/attributes/attribute-definition/constants/filters";
import { normalizePaginationParams, PaginationQuery } from "@/src/shared/table/pagination";


export default async function AttributesPage({ searchParams }: { searchParams: PaginationQuery }) {

    const query = await searchParams;

    const norPage = normalizePaginationParams(query,ATTRIBUTE_NORMALIZE_PAGINATION);

    const session = await auth()
    const user = session!.user;

    return (
        <div className="flex flex-col h-full">

            <ListAttribute pagination={norPage} />

            <RowFloatingActions />

            <DeleteAttributeModal />

            <EditAttributeModal updatedBy={user.name} updatedById={+user.id} />
        </div>
    )
}