"use client"
import { CiMenuKebab } from "react-icons/ci"

interface Props {
    title: string;
    onActivateEditing?: () => void;
    isEditing: boolean;
    onDelete?: () => void;
    onAddAttribute?: () => void
}

export const DropMenu = ({ title, onActivateEditing, isEditing, onDelete, onAddAttribute }: Props) => {

    return (
        <div className=" px-6 py-4 border-y border-gray-300 text-zinc-700 flex items-center justify-between">
            <span className="font-semibold py-2"> {title} </span>
            {
                isEditing ?
                    <p className="text-sm text-blue-700 font-medium">
                        ⚠️ Modo edición activado
                    </p>
                    :
                    <button
                        type="button"
                        className=" relative group transition-all duration-200 p-2 focus:overflow-visible overflow-hidden flex flex-row hover:bg-white gap-2 rounded-lg border border-transparent hover:border-zinc-200 text-start">
                        <span>
                            <CiMenuKebab />
                        </span>
                        <div
                            className="w-40 absolute shadow-lg top-10 right-0  p-2 bg-white border border-zinc-400 rounded-lg flex flex-col ">
                            {
                                onActivateEditing &&
                                <span
                                    onClick={onActivateEditing}
                                    className="hover:bg-zinc-100 p-2 rounded-lg text-sm">
                                    Editar
                                </span>
                            }
                            {
                                onDelete &&
                                <span
                                    onClick={onDelete}
                                    className="hover:bg-zinc-100 p-2 rounded-lg text-sm">
                                    Eliminar permanente
                                </span>
                            }

                            {
                                onAddAttribute &&
                                <span
                                    onClick={onAddAttribute}
                                    className="flex flex-row gap-2 hover:bg-zinc-100 p-2 rounded-lg text-sm">
                                    Agregar atributo
                                </span>
                            }
                        </div>
                    </button>
            }

        </div>
    )
}


