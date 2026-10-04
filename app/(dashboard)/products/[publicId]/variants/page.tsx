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


  return (
    <div>

      <ListVariants variants={res.data.variants} />
        
      <SyncBaseProductStore product={res.data.product} />
    </div>
  );
}