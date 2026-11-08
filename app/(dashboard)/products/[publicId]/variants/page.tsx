import { getVariants } from "@/src/action/variant";
import { VariantFiltersSearchParams } from "@/src/features/products/types";
import { ListVariants, normalizeFiltersParams, SyncBaseProductStore, Title, VariantQuickFilters } from "@/src/features/products/variants";
import { BackTo } from "@/src/shared/components/btn";
import { ErrorServer } from "@/src/shared/components/error";
import { getErrorMessage } from "@/src/shared/messages";
import { APP_ROUTES } from "@/src/shared/routes";
import { normalizePaginationParams, PaginationQuery, SORT_BY_PARAMS } from "@/src/shared/table/pagination";

interface Props {
  params: Promise<{ publicId: string }>
  searchParams: Promise<VariantFiltersSearchParams & PaginationQuery>
}


export default async function VariantPage({ params, searchParams }: Props) {

  const { publicId } = await params;
  const { page, pageSize, order, sortBy, status } = await searchParams;

  const currentStatus = normalizeFiltersParams(status);

  const pagination = normalizePaginationParams({ page, pageSize, order, sortBy }, { acceptOnlySortBy: [SORT_BY_PARAMS.displayorder] })

  const res = await getVariants({ publicId, filters: { status: currentStatus }, pagination });

  if (!res.ok)
    return <div className="py-4">
      <ErrorServer Title={getErrorMessage(res.errorType).description} onAction={true} />
    </div>


  const { product, variants, counts, meta } = res.data;

  return (
    <div className="flex flex-col h-full pt-4">

      <BackTo label="Volver a listas de productos" fallbackTo={APP_ROUTES.PRODUCTS.INDEX} />

      <Title
        productName={product.name}
        totalVariants={counts.draft + counts.active + counts.inactive}
        activeVariants={counts.active}
        sku={product.sku}
      />
      <br />
      <VariantQuickFilters status={currentStatus} counts={counts} />

      <ListVariants variants={variants} pagination={pagination} metaPagination={meta} />

      <SyncBaseProductStore product={product} />
    </div>
  );
}
