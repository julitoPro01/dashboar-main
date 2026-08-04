import { auth } from "@/auth.config";
import { SupplierRegister } from "@/src/features/suppliers/create";

export default async function RegisterSupplierPage() {

    const session = await auth();
    const user = session!.user

    return (
        <div className="flex flex-col flex-1 justify-center py-6 gap-6">
            {/* <BackTo /> */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-text-strong">
                        Registro de Proveedor
                    </h1>
                    <p className="text-sm text-text-muted mt-1">
                        Complete la información para gestionar su red de suministro.
                    </p>
                </div>

            </div>

            <SupplierRegister user={{ name: user.name, id: +user.id }} />
        </div>
    );
}

