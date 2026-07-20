import { ManageAttrsButton } from "./ui/ManageAttrsButton";
import { RefreshButton } from "./ui/RefreshButton";

interface Props {
    paths: { id: number; name: string }[];
    categoryId: number;
    attributes: {
        id: number;
        name: string;
        isRequired: boolean;
        isFilter: boolean;
        isVariant: boolean;
        displayOrder: number | null;
    }[];
}

export const AttributeConfig = ({
    attributes, paths, categoryId
}: Props) => {


    return (
        <section className="col-span-12">
            <div className="bg-surface border border-border rounded-xl shadow-card overflow-hidden">

                <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                    <h3 className="font-semibold text-text-strong">
                        Configuración de atributos
                    </h3>
                    <div className="space-x-2">
                        <RefreshButton />
                        <ManageAttrsButton paths={paths} categoryId={categoryId} />
                    </div>
                </div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>
                            <tr className="border-b border-border bg-background">
                                <th className="text-left px-6 py-3 text-xs text-text-muted uppercase">
                                    Nombre
                                </th>
                                <th className="text-center px-6 py-3 text-xs text-text-muted uppercase">
                                    Filtro
                                </th>
                                <th className="text-center px-6 py-3 text-xs text-text-muted uppercase">
                                    Requerido
                                </th>
                                <th className="text-center px-6 py-3 text-xs text-text-muted uppercase">
                                    Variante
                                </th>
                                <th className=" px-6 py-3 text-xs text-text-muted uppercase text-center">
                                    Orden
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                attributes.map(v => (
                                    <tr key={v.id} className="border-b border-border text-text">
                                        <td className="px-6 py-4 ">
                                            {v.name}
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            {v.isFilter ? "✓" : "—"}
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            {v.isRequired ? "✓" : "—"}
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            {v.isVariant ? "✓" : "—"}
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            {v.displayOrder}
                                        </td>
                                    </tr>
                                ))
                            }


                        </tbody>

                    </table>

                </div>
            </div>
        </section>)
}
