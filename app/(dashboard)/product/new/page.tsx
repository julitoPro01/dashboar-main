import { auth } from '@/auth.config';
import { getCategories, getSupplierOptions } from '@/src/action';
import { ErrorServer } from '@/src/components/ui';
import { CreateProduct } from '@/src/features/product';

export default async function ProductPage() {

  const [suppliers, categories] = await Promise.all([getSupplierOptions(), getCategories({ mains: true, typeProductCategory: true })]);

  const session = await auth();
  const user = session!.user;


  return (
    <div className="flex flex-col items-center gap-6 py-10 px-10 min-w-md ">
      {
        (!suppliers.ok  || !categories.ok)
          ?
          <div className="p-4">
            <ErrorServer Title="No se pudieron cargar los datos requeridos. Intenta nuevamente más tarde." onAction={true} />
          </div>
          :
          <>
            <h1 className="">
              ¡Suma un nuevo producto!
            </h1>
            <p className="text-gray-500 px-4 -mt-2">Comparte algo increíble con tus clientes</p>

            <div className=" max-w-4xl w-full p-10 bg-white text-gray-700 rounded-2xl">

              <CreateProduct
                productFormData={{
                  suppliers: suppliers.data!,
                  mainCategories: categories.data!                }}
                user={{ id: +user.id, name: user.name }}
              />

            </div>
          </>
      }
    </div>
  );
}