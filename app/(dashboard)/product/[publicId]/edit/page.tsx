import { auth } from "@/auth.config";
import { getCategories, getProductForm, getSupplierOptions } from "@/src/action";
import { ErrorServer } from "@/src/components/ui";
import { EditProduct } from "@/src/features/product";

interface Props {
    params: { publicId: string }
}


export default async function EditProductPage({ params }: Props) {

    const { publicId } = await params;

    const [suppliers, categories, productForAdminEdit] = await Promise.all([
        getSupplierOptions(),
        getCategories({ mains: true, typeProductCategory: true }),
        getProductForm({ publicId })
    ]);

    const session = await auth()
    const user = session!.user;

    return (
        <div className="flex flex-col items-center gap-6 py-10 px-10 min-w-md ">
            {
                (!suppliers.ok  || !categories.ok || !productForAdminEdit.ok)
                    ?
                    <div className="p-4">
                        <ErrorServer Title="No se pudieron cargar los datos requeridos. Intenta nuevamente más tarde." onAction={true} />
                    </div>
                    :
                    <>
                        <h1 className="text-2xl font-semibold text-slate-800 border-slate-200">
                            ¡Editar producto!
                        </h1>
                        <p className="text-gray-500 px-4 -mt-2">Comparte algo increíble con tus clientes</p>

                        <div className=" max-w-4xl w-full p-10
                              bg-white text-gray-700
                                rounded-2xl
                                ">

                            <EditProduct
                                productFormData={{
                                    suppliers: suppliers.data!,
                                    mainCategories: categories.data!,
                                    productStatuses: []
                                }}
                                user={{ id: +user.id, name: user.name }}
                                productForm={productForAdminEdit.data!}
                            />
                        </div>
                    </>
            }
        </div>
    );
}