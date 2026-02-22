import { auth } from "@/auth.config";
import {  getVariants } from "@/src/action";
import { ErrorServer } from "@/src/components/ui";
import { CreateVariant, VariantList } from "@/src/features/product";

interface Props {
  params: { publicId: string }
}

export default async function VariantsPage({ params }: Props) {

  const { publicId } = await params;

  const [ variants] = await Promise.all([ getVariants({ productPublicId: publicId })]);

  const session = await auth();
  const user = session!.user;


  if ( !variants.ok)
    return (
      <div className="p-4  min-w-3xl">
        <ErrorServer Title="No se pudieron cargar los datos requeridos. Intenta nuevamente más tarde." onAction={true} />
      </div>
    )

  return (
    <div className=" py-10 px-10  min-w-3xl">

      <VariantList variants={variants.data!.variantsDetails} />

      <CreateVariant variantStatuses={[]}
        totalItems={variants.data!.variantsDetails.length}
        attributes={variants.data!.attributesDetails}
        productId={variants.data!.productId}
        user={{ name: user.name, id: +user.id }}
      />
    </div>
  )
}
