import { getProductDetails } from "@/src/action";
import { ErrorServer } from "@/src/components/ui";
import { ModalEditForm, ProductDetails, CategoryDetails, AttributeDetails, ImageDetails, VariantDetails } from "@/src/features/product";

interface Props {
  params: { publicId: string }
}

export default async function DetailsPage({ params }: Props) {

  const { publicId } = await params;

  const [productDetails] = await Promise.all([getProductDetails({ publicId })]);

  if (!productDetails.ok) return (
    <div className="p-4  min-w-3xl">
      <ErrorServer Title="No se pudieron cargar los datos requeridos. Intenta nuevamente más tarde." onAction={true} />
    </div>
  )


  return (
    <div className="p-6  min-w-xl">
      <div className="w-full space-y-6 text-sm text-gray-800" >
        <ProductDetails productDetails={productDetails.data!.productDetails} />

        <CategoryDetails categoriesDetials={productDetails.data!.categoriesDetails} />

        <AttributeDetails attributesDetails={productDetails.data!.attributesDetails} />

        <ImageDetails imagesDetails={productDetails.data!.imagesDetails} />

        <VariantDetails variantsDetials={productDetails.data!.variantsDetails} />
      </div>

      <ModalEditForm productDetailsData={productDetails.data!} />
    </div>
  );
}