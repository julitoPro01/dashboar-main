import { getSupplierOptions, getSuppliers } from "@/src/action";
import { ErrorServer } from "@/src/components";
import { CreateSupplierUserForm } from "@/src/features/supplier";

export default async function RegisterSupplierUserPage() {

    const [ suppliers] = await Promise.all([getSupplierOptions()]);

    // const session = await auth()
    // console.log(session?.user)

    return (
        <div className="flex flex-col items-center gap-6 py-10 px-4 h-full overflow-auto scrollbar-thin
                   min-w-md ">
            {
                (!suppliers.ok) &&
                <div className="p-4">
                    <ErrorServer Title="No se pudieron cargar los datos requeridos. Intenta nuevamente más tarde." onAction={true} />
                </div>
            }

            {
                ( suppliers.ok) &&
                <>
                    <h1 className="text-3xl font-semibold my-5 px-4 text-gray-700 border-b pb-2">
                        Agrega un nuevo usuario al negocio
                    </h1>
                    {/* <p className="text-gray-500 px-4 -mt-2">Comparte algo increíble con tus clientes</p> */}

                    <div className="max-w-4xl  w-full p-8 bg-white text-gray-700 rounded-2xl border border-slate-100 shadow-inner shadow-slate-400">

                        <CreateSupplierUserForm
                            suppliers={suppliers.data!}
                        />

                    </div>
                </>
            }

        </div>
    );
}