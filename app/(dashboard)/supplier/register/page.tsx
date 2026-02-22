import { auth } from "@/auth.config";
import { SupplierRegister } from "@/src/features/supplier";

export default async function RegisterSupplierPage() {

    const session = await auth();
    const user = session!.user

    return (
        // <div className="flex flex-col items-center gap-6 py-10 px-10 min-w-md ">
        <div className="flex flex-1 justify-center py-10 ">
            <div className="w-full max-w-200 flex flex-col bg-surface rounded-xl shadow-sm border border-border-subtle overflow-hidden">
                {/* header */}
                <div className="px-8 py-6 border-b border-border-subtle flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-text-strong">
                            Registro de Proveedor
                        </h1>
                        <p className="text-sm text-text-muted mt-1">
                            Complete la información para gestionar su red de suministro.
                        </p>
                    </div>
                </div>
                {/* body */}
                <SupplierRegister user={{ name: user.name, id: +user.id }} />
            </div>
            {/* {
                <div className="p-4">
                    <ErrorServer Title="No se pudieron cargar los datos requeridos. Intenta nuevamente más tarde." onAction={true} />
                </div>
            } */}

        </div>
    );
}

