import { auth } from "@/auth.config";
import { AttributeTabs, CreateAttributeModal } from "@/src/features/attributes/layout";

export default async function LayoutPage({ children }: { children: React.ReactNode }) {

    const session = await auth();
    const user = session!.user;

    return (
        <>
            <div className="flex flex-col w-full ">

                {/* Header */}
                <div className="gap-4 py-6">
                    {/* Title */}
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold tracking-tight text-text-strong">
                            Gestión de atributos
                        </h1>
                        <p className="text-sm text-text-muted">
                            Administra atributos globales y su asignación a categorías
                        </p>
                    </div>
                </div>

                <AttributeTabs />

                {/* //MODAL */}
                <CreateAttributeModal createdById={+user.id} createdBy={user.name} />
            </div>
            {children}
        </>
    );
}