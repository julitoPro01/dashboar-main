import { getVariants } from "@/src/action/variant";
import { ListVariants, SyncBaseProductStore } from "@/src/features/products/variants";
import { ErrorServer } from "@/src/shared/components/error";
import { getErrorMessage } from "@/src/shared/messages";

interface Props { params: Promise<{ publicId: string }> }


export default async function VariantPage({ params }: Props) {

  const { publicId } = await params;

  const res = await getVariants({ publicId });

  if (!res.ok)
    return <div className="py-4">
      <ErrorServer Title={getErrorMessage(res.errorType).description} onAction={true} />
    </div>


  if (res.data.variants.length === 0) {
    return (
      <div className=" my-8 rounded-lg border border-border bg-surface-container-lowest px-6 py-12 text-center">
        <p className="font-medium text-on-surface">No hay variantes para mostrar</p>
        <p className="mt-1 text-sm text-on-surface-variant">Las variantes de este producto aparecerán aquí.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full pt-8">

      <ListVariants variants={res.data.variants} />

      <SyncBaseProductStore product={res.data.product} />
    </div>
  );
}
