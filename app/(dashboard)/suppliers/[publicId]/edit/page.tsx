import { auth } from "@/auth.config";
import { getSupplier } from "@/src/action";
import { SupplierEdit } from "@/src/features/suppliers/edit";
import { ErrorServer } from "@/src/shared/components/error";

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

        <div className="flex flex-col flex-1 justify-center py-6 gap-6">
            {/* <BackTo /> */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-text-strong">
                        Editar Proveedor
                    </h1>
                    <p className="text-sm text-text-muted mt-1">
                        Actualice la información para gestionar su red de suministro.
                    </p>
                </div>

            </div>
            <SupplierEdit user={{ name: user.name, id: +user.id }}
                supplier={res.data!} />
        </div>
    );
}