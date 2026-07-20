import { CATEGORY_ATTR_SORTBY_ACCEPT_ONLY, CatgAttrList, SelectCategoryModal } from "@/src/features/attributes";
import { normalizePaginationParams, type PaginationQuery } from "@/src/shared/table";


interface Props { searchParams: PaginationQuery }

export default async function AttributesCategoryPage({ searchParams }: Props) {

    const query = await searchParams;

    const {state,...pag} = normalizePaginationParams(query, { sortBy_acceptOnly:CATEGORY_ATTR_SORTBY_ACCEPT_ONLY, default_sortBy: "order" });

    return (
        <div className="flex flex-col h-full">


            {/* <ManagerAttribute/> */}
            
            <CatgAttrList pagination={pag} />

            <SelectCategoryModal/>

        </div>
    )
}
