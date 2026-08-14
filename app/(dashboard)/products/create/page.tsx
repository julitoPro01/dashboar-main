import { auth } from '@/auth.config';
import { getCategories } from '@/src/action/category';
import { CreateProduct } from '@/src/features/products/create';
import { BackTo } from '@/src/shared/components/BackTo';
import { ErrorServer } from '@/src/shared/components/error';

export default async function ProductPage() {

    // const [suppliers, categories] = await Promise.all([getSupplierOptions(), getCategories({ mains: true, typeProductCategory: true })]);

    // const session = await auth();
    // const user = session!.user;

    // if (!suppliers.ok || !categories.ok)
    //     return <div className="py-4">
    //         <ErrorServer Title="No se pudieron cargar los datos requeridos. Intenta nuevamente más tarde." onAction={true} />
    //     </div>;


    return (
        <div className='pt-6 pb-20 relative'>
            <div className="pb-6 relative">
                <BackTo />

                <div className=' flex flex-col md:flex-row md:items-end justify-between gap-4'>

                    <div>
                        <h1 className="text-3xl text-text font-black tracking-tight">
                            Nuevo producto
                        </h1>
                        <p className="mt-2 text-text-muted">Agregue información detallada, categorías y medios para su nuevo artículo del catálogo</p>
                    </div>
                    <div className='flex whitespace-nowrap'>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase">
                            <span className="size-2 rounded-full bg-emerald-500"></span>
                            Estado: Borrador
                        </div>
                    </div>
                </div>
                {/* <CreateProduct productFormData={{
                suppliers: [],
                mainCategories: categories.data!
                }}
                user={{ id: +user.id, name: user.name }} /> */}

            </div>
            
            <CreateProduct/>

        </div>
    );
}