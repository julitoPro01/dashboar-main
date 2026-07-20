"use client";

import { BiPlus } from "react-icons/bi";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { FaRegFolder } from "react-icons/fa";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { RECORD_STATUS_STYLES } from "@/src/shared/domains/status";
import { useMainCategoryList } from "../hooks/useMainCategoryList";
import { useMainCategoryCache } from "../hooks/useMainCategoryCache";
import { CategoryResponse, MainCategoryItem } from "../../../types";
import { Form } from "./Form";
import { SortByButton } from "./SortByButton";
import { useRefreshSelectedMain } from "../hooks/useRefreshSelectedMain";


interface Props {
    mainCategories: CategoryResponse[];
    user: { name: string, id: number }
}

//TODO: Implementar la función de filtrar por estados y las acciones por estado. 

export const MainCategories = ({ mainCategories, user }: Props) => {

    const [categories, setCategories] = useState<MainCategoryItem[]>([]);

    // Hook para manejar la lógica de agregar categoría raíz, seleccionar categoría y enviar nueva categoría.
    const {
        onSubmit, onChangeName, name,
        onAddDirtyCatg,
        onSelect, selected,
        isSubmitting
    } = useMainCategoryList({ setCategories, user });

    // Hook para escuchar ( actualizar o eliminar) la categoría raíz en la lista después de la acción correspondiente.
    // Actualizar el seleccionado
    useMainCategoryCache({ setCategories });

    useRefreshSelectedMain(mainCategories);

    useEffect(() => {
        setCategories(mainCategories)
    }, [mainCategories]);

    return (
        <div className=" flex flex-col h-full scrollbar-hide overflow-auto  relative">

            <div className=" flex items-center gap-2 border-b border-border px-4 py-4 sticky top-0 left-0 z-1 bg-surface">
                <div className="truncate flex gap-4 flex-1 items-center">
                    <span className="text-text font-bold truncate">Categorias</span>
                </div>
                <button className="cursor-pointer ml-auto text-text-subtle hover:text-primary"
                    onClick={onAddDirtyCatg}>
                    <BiPlus size={25} />
                </button>

                <SortByButton />
            </div>

            <ul className="flex relative flex-col space-y-1 px-4 py-2  h-full ">
                {
                    categories.map((v, i) => {
                        const styleBg = RECORD_STATUS_STYLES[v.recordStatus].colorBg400
                        return (
                            <li key={v.id}
                                className={clsx("flex items-center justify-between py-2 px-2 rounded-lg transition-colors select-none", {
                                    "hover:bg-hover text-text-muted": !v.isDirty && selected?.id !== v.id,
                                    "bg-bg-select text-text": selected?.id === v.id && !v.isDirty,
                                })}
                                onClick={() => onSelect(v)}
                            >
                                <div className={clsx("flex w-full items-center text-sm truncate gap-3 pe-2 h-full ")}>

                                    {v.hasChildren
                                        ? <span className="text-lg text-amber-500 pl-1"><FaRegFolder /></span>
                                        : <span className="text-lg text-text-subtle pl-1"><MdOutlineSubdirectoryArrowRight /></span>
                                    }


                                    {
                                        v.isDirty
                                            ? <Form
                                                onChange={(value) => onChangeName(value)}
                                                onSubmit={() => onSubmit(v.id)}
                                                fieldName={name}
                                                isSubmitting={isSubmitting}
                                            />
                                            : <span className={`font-semibold truncate `}>
                                                {v.name}
                                            </span>
                                    }
                                </div>
                                < div className={`size-2 rounded-full ${styleBg}`} />

                            </li>
                        )
                    })
                }
            </ul>

        </div>
    )
}


