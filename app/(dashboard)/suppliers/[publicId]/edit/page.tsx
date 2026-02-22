import { auth } from "@/auth.config";
import { getSupplier } from "@/src/action";
import { ErrorServer } from "@/src/components/ui";
import { SupplierEdit } from "@/src/features/supplier";

interface Props {
    params: { publicId: string }
}

export default async function EditPage({ params }: Props) {

    const { publicId } = await params;
    const res = await getSupplier({ to: "form", publicId });

    const session = await auth();
    const user = session!.user

    if (!res.ok)
        return <div className="py-8">
            <ErrorServer Title="No se pudieron cargar los datos requeridos. Intenta nuevamente más tarde." onAction={true} />
        </div>

    return (
        // <div className="flex flex-col items-center gap-6 py-10 px-10 min-w-md ">
        <div className="flex flex-1 justify-center py-10 ">
            <div className="w-full max-w-200 flex flex-col bg-surface rounded-xl shadow-sm border border-border-subtle overflow-hidden">
                {/* header */}
                <div className="px-8 py-6 border-b border-border-subtle flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-text-strong">
                            Editar Proveedor
                        </h1>
                        <p className="text-sm text-text-muted mt-1">
                            Actualice la información para gestionar su red de suministro.
                        </p>
                    </div>
                </div>
                {/* body */}
                {/* <RegisterSupplier user={{ name: user.name, id: +user.id }} /> */}
                <SupplierEdit user={{ name: user.name, id: +user.id }}
                    supplier={res.data!} />
            </div>
            {/* {
                    <div className="p-4">
                        <ErrorServer Title="No se pudieron cargar los datos requeridos. Intenta nuevamente más tarde." onAction={true} />
                    </div>
                } */}

        </div>
    );
}