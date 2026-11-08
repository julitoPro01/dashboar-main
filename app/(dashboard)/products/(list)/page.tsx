import { ListProducts } from "@/src/features/products/base-product/list";
import { PRODUCT_SORTBY_ACCEPT_ONLY } from "@/src/features/products/constants";
import { normalizePaginationParamsOld, PaginationQuery } from "@/src/shared/table/pagination";


interface Props {
  searchParams: Promise< PaginationQuery>
}

export default async function ProductsPage({ searchParams }: Props) {

  const query = await searchParams;
  const norPage = normalizePaginationParamsOld(query, { includeState: true, parseState: true, sortBy_acceptOnly: PRODUCT_SORTBY_ACCEPT_ONLY });


  return (
    <div className="flex flex-col  h-full">

      <ListProducts pagination={norPage} />

      {/* <LoadingSupplier /> */}


      {/* <div className="bg-surface border border-border rounded-t-xl shadow-card overflow-hidden flex flex-col flex-1  "> */}
      {/* <ProductList queryPag={{ page, pageSize, order, verificationStatus: verifStatus, sortBy }} /> */}
      {/* </div> */}

      {/* <FloatingMenu/> */}
      {/* Modal */}
      {/* <Details/> */}
    </div>
  );
}


