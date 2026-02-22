
import { normalizePaginationQuery, PaginationQuery } from "@/src/domains/pagination";
import { parseVerificationStatus } from "@/src/domains/verification-status";
import { LoadingProduct } from "@/src/features/products";

interface Props {
  searchParams: PaginationQuery
}

export default async function ProductsPage({ searchParams }: Props) {

  const query = await searchParams;

  const normalizeQuery = normalizePaginationQuery(query);

  const { page, pageSize, order, sortBy, state } = normalizeQuery;
  const verifStatus = parseVerificationStatus(["APPROVED", "DRAFT", "PENDING_REVIEW", "REJECTED", "SUSPENDED", "UNDER_REVIEW"], state);


  //  <div className="p-4">
  //         <ErrorServer Title="No se pudieron cargar los datos requeridos. Intenta nuevamente más tarde." onAction={true} />
  //       </div>

  return (
    <div className="flex flex-col  h-full w-full">
      <LoadingProduct />

      {/* <PreviewProductDetails /> */}

      {/* <FloatingMenuProduct/> */}
    </div>
  );
}


