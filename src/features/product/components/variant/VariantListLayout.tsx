"use client"

import { useStore } from "@/src/store/useStore";

interface Props {
    hasVariants: boolean;
    children:  React.ReactNode;
}


export const VariantListLayout = ({ hasVariants, children }: Props) => {

    const isVariantListEditing = useStore(v => v.isVariantListEditing);
    const setAddVariantModalOpen = useStore(v => v.setUpsertVariantModalOpen);
    const setVariantListEditing = useStore(v => v.setVariantListEditing);


    return (
        <div className="w-full  ">

            {/* Header */}
            <div className="flex items-center justify-between text-gray-700 px-4 py-3 border-b bg-slate-200 rounded-lg">
                <h3 className="text-sm font-semibold ">
                    Variantes
                </h3>
                {hasVariants ?
                    <span className="">3 variantes definidas</span>
                    :
                    <span>
                        Aún no hay variantes definidas.
                        <br />
                        <span className="text-sm text-gray-400">
                            Agrega la primera para comenzar.
                        </span>
                    </span>
                }

                <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-600 transition"
                    onClick={() => setAddVariantModalOpen({ modalOpen: true, type:"create" })}
                >
                    ➕ Nueva variante
                </button>
            </div>

            {/* Body */}
            <div className="p-6 text-gray-500">

                {hasVariants &&
                    <div className="flex flex-col gap-8 py-5">
                        {children}
                    </div>
                }
            </div>

            {/* Footer */}
            {
                hasVariants &&
                <div className="flex justify-between items-center px-4 py-3 bg-slate-200 rounded-lg border-b text-sm">

                    {
                        !isVariantListEditing ?
                            <>
                                <span className="text-sm text-gray-600">
                                    Modo edición desactivado
                                </span>
                                <button
                                    type="button"
                                    disabled={!hasVariants}
                                    className={` inline-flex items-center gap-1 rounded-md px-3 py-1.5  font-medium text-white transition ${hasVariants
                                        ? "bg-orange-500 hover:bg-orange-600"
                                        : "bg-orange-300 cursor-not-allowed"
                                        } `}
                                    onClick={() => setVariantListEditing(true)}
                                >
                                    ✏️ Editar lista
                                </button>
                            </>
                            :
                            <>
                                <span className=" text-gray-600">
                                    Cambios pendientes
                                </span>

                                <div className="flex gap-2">
                                    <button className=" text-gray-600 hover:underline"
                                        onClick={() => setVariantListEditing(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button className="bg-green-500 text-white px-3 py-1.5 rounded-md">
                                        Guardar cambios
                                    </button>
                                </div>
                            </>
                    }


                </div>
            }
        </div>)
}
