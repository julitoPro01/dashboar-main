import { DeleteCatgAttrModal, ListCatgAttrs, SelectCategoryModal } from "@/src/features/attributes/category-attributes/list";
import { CATEGORY_ATTR_PAGINATION_OPTIONS } from "@/src/features/attributes/category-attributes/constants";
import { normalizePaginationParams, PaginationQuery } from "@/src/shared/table/pagination";


interface Props { searchParams: PaginationQuery }

export default async function AttributesCategoryPage({ searchParams }: Props) {

    const query = await searchParams;

    const { state, ...pag } = normalizePaginationParams(query,CATEGORY_ATTR_PAGINATION_OPTIONS);

    return (
        <div className="flex flex-col h-full">


            {/* <ManagerAttribute/> */}

            <ListCatgAttrs pagination={pag} />

            <SelectCategoryModal />

            <DeleteCatgAttrModal/>
        </div>
    )
}
