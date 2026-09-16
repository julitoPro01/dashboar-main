import { getProductForm } from "@/src/action/product";
import { EditProduct } from "@/src/features/products/edit";
import { BackTo } from "@/src/shared/components/btn";
import { ErrorServer } from "@/src/shared/components/error";
import { APP_ROUTES } from "@/src/shared/routes";

interface Props { params: Promise<{ publicId: string }> }


export default async function EditPage({ params }: Props) {

    const { publicId } = await params;

    const res = await getProductForm({ publicId });
    
    if (!res.ok)
        return <div className="py-8">
            <ErrorServer Title="No se pudieron cargar los datos requeridos. Intenta nuevamente más tarde." onAction={true} />
        </div>

    return (
        <div className='pt-6 pb-20 relative'>
            <div className="pb-10 relative">

                <BackTo fallbackTo={APP_ROUTES.PRODUCTS.INDEX} label='Volver a productos' />

                <div className=' flex flex-col md:flex-row md:items-end justify-between gap-4'>

                    <div>
                        <h1 className="text-3xl text-text font-black tracking-tight">
                            Actualizar producto
                        </h1>
                        <p className="mt-2 text-text-muted">
                            Agregue información detallada, categorías y medios para este artículo.
                            </p>
                    </div>
                    
                </div>

            </div>

            <EditProduct data={res.data} />

        </div>
    );
}