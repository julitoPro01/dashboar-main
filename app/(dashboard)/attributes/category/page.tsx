import { ListCatgAttr, SelectCategoryModal } from "@/src/features/attributes/category-attributes/list";
import { CATEGORY_ATTR_NORMALIZE_PAGINATION } from "@/src/features/attributes/category-attributes/constants";
import { normalizePaginationParams, PaginationQuery } from "@/src/shared/table/pagination";


interface Props { searchParams: PaginationQuery }

export default async function AttributesCategoryPage({ searchParams }: Props) {

    const query = await searchParams;

    const { state, ...pag } = normalizePaginationParams(query,CATEGORY_ATTR_NORMALIZE_PAGINATION);

    return (
        <div className="flex flex-col h-full">


            {/* <ManagerAttribute/> */}

            <ListCatgAttr pagination={pag} />

            <SelectCategoryModal />

        </div>
    )
}
