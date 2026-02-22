"use client";

import { BiPlus } from "react-icons/bi";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useBasicForm } from "@/src/hooks";
import { useStore } from "@/src/store/useStore";
import { BtnAction, Form } from "./main-categories";
import { addCategory, updateCategory } from "@/src/action";
import { CategoryStatusBadgeConfig } from "../constants";
import { categoryStatusGroup } from "../utils";
import { CategoryResponse, UpsertCategory } from "@/src/interfaces/category";
import { ToastError, ToastSuccess } from "@/src/components/ui";


type Category = {
    isDirty: boolean;
    id: number,
    name: string,
    recordStatusId: number
}

interface Props {
    categoryStatus: any[];
    mainCategories: CategoryResponse[];
    user: { name: string, id: number }
}


//TODO: Implementar la función de filtrar por estados y las acciones por estado. 

export const MainCategories = ({ categoryStatus, mainCategories, user }: Props) => {

    const setMainCategory = useStore(v => v.setMainCategory);
    const mainCategory = useStore(v => v.mainCategory);
    const lastMainUpdate = useStore(v => v.historyCategory.lastMainUpdate);
    const setCleanStateCategory = useStore(v => v.setCleanStateCategory);

    const [categories, setCategories] = useState<Category[]>([]);
    const { state, handleChange, resetForm } = useBasicForm({ name: "", selectedId: 0 });

    // Agregamos campo temporal
    const onAddCatgDirty = () => {

        const fieldDirty: CategoryResponse = {
            id: categories.length + 1,
            name: "",
            slug: "",
            recordStatusId: 0
        }
        setCategories(v => [...v, { ...fieldDirty, isDirty: true }]);

    }
    // Activamos el editor de campor
    const onActiveUpdate = (name: string, id: number) => {
        resetForm({ ...state, name })
        setCategories(val => val.map(v => v.id === id ? { ...v, isDirty: true } : v));
    }
    // Actualizamos
    const UpdateCategory = async (name: string, id: number, recordStatusId: number) => {

        const { draft, pendingStatus, publicStatus } = categoryStatusGroup(categoryStatus);

        const isPublic = publicStatus.some(v => v.id === recordStatusId);

        const newStatusId = isPublic
            ? pendingStatus.id
            : recordStatusId

        const updateState: UpsertCategory = {
            name, slug: name.replaceAll(" ", "-"), recordStatusId: newStatusId
        }

        const res = await updateCategory({
            data: updateState,
            id,
            childrenStatusId: pendingStatus.id,
            audi: { updateBy: user.name, updateById: user.id }
        });
        if (res.ok) {
            const data = res.data!;

            setCategories(val => val.map(v => v.id === id ?
                {
                    id: data.id,
                    name: data.name,
                    recordStatusId: data.recordStatusId,
                    isDirty: false
                } : v));

            if (state.selectedId === data.id)
                setMainCategory({
                    id: data.id,
                    name: data.name,
                    recordStatusId: data.recordStatusId
                })

            toastSuccess("update")
        } else {
            toastError("update")
        }

        resetForm({ ...state, name: "" });
        setCategories(val => val.filter(v => !v.isDirty));
    }
    // Creamos
    const AddCategory = async (name: string, id: number) => {
        const pendingStatusId = categoryStatus.find(v => v.name === "DRAFT")!.id
        const addState: UpsertCategory = {
            name, slug: name.replaceAll(" ", "-"), recordStatusId: pendingStatusId
        };

        const res = await addCategory(addState, { createdBy: user.name, createdById: user.id });

        if (res.ok) {
            const data = res.data!;
            setCategories(val => val.map(v => v.id === id ? {
                id: data.id,
                name: data.name,
                recordStatusId: data.recordStatusId,
                isDirty: false
            } : v));


            toastSuccess("create")
        } else {
            toastError("update")
        }

        resetForm({ ...state, name: "" });
        setCategories(val => val.filter(v => !v.isDirty));

    }
    // Seleccionamos
    const selectCategory = (category: Category, id: number) => {
        resetForm({ name: "", selectedId: id });
        const { isDirty, ...catg } = category
        setMainCategory(catg)
    }
    // Unica acción para GUARDAR
    const onSubmit = (categoryName: string, catgId: number, recordStatusId: number) => {
        const newName = state.name.trim();
        const existsCategory = !!categoryName;
        // Si existe, lo actualizamos
        if (existsCategory && !!newName) {
            if (newName !== categoryName)
                UpdateCategory(newName, catgId, recordStatusId)
            else
                setCategories(val => val.map(v => v.id === catgId ? { ...v, isDirty: false } : v));

        }
        // Si no existe, pero, si hay nuevo valor, lo creamos
        else if (!!newName) {
            AddCategory(newName, catgId)
        }
        // Eliminamos si no existe y no hay nuevo valor
        else if (!existsCategory && !newName) {
            setCategories(val => val.filter(v => v.id !== catgId));
        }
        // No hacemos nada
        else {
            setCategories(val => val.map(v => v.id === catgId ? { ...v, isDirty: false } : v));
        }
    }

    // Actualizamos
    // Escuchamos los cambios del historial 
    useEffect(() => {
        const history = lastMainUpdate;
        if (!history || !mainCategory) return;
        // si el historial actualizado es igual a la categoría principal seleccionado y el estado es distindo = true
        const isUpdateSelectedStatusId = (history.id === mainCategory.id)

        if (isUpdateSelectedStatusId) {
            // Actualizamos el estado de la lista
            setCategories(val => val.map(v => v.id === history.id ? { ...v, recordStatusId: history.recordStatusId } : v))
            setMainCategory(history)
            console.log("update main")
        }
        // Actualizamos la categoría principal seleccionada
    }, [lastMainUpdate])


    useEffect(() => {

        setCategories(mainCategories.map(v => ({ ...v, isDirty: false })).sort((a, b) => a.recordStatusId - b.recordStatusId))
        if (mainCategory) {
            setCleanStateCategory()
        }

    }, [mainCategories])

    return (
        <div className=" flex flex-col h-full  overflow-auto bg-white scrollbar-thin relative">

            <div className=" flex items-center bg-slate-100  ps-4 py-4 sticky top-0 left-0 z-1">
                <div className="truncate flex gap-4 flex-1 items-center">
                    <span className="pe-4 truncate">Categorias</span>
                </div>
                <button className="cursor-pointer ml-auto text-gray-500 hover:text-gray-900 pe-2"
                    onClick={onAddCatgDirty}>
                    <BiPlus size={25} />
                </button>
            </div>

            <ul className="flex relative flex-col text-gray-500 space-y-1 py-2  h-full ">
                {
                    categories.map((v, i) => {
                        const status = categoryStatus.find(s => s.id === v.recordStatusId);
                        const color = status ? CategoryStatusBadgeConfig[status.name] : undefined

                        return (
                            <li key={v.id}
                                className={clsx("flex items-center group py-2 cursor-pointer", {
                                    "hover:bg-slate-100": !v.isDirty && state.selectedId !== v.id,
                                    "bg-slate-100 text-black": state.selectedId === v.id && !v.isDirty,
                                    "bg-slate-100": v.isDirty,
                                })}
                                onClick={() => selectCategory(v, v.id)}
                            >
                                <div className={clsx("flex w-full items-end truncate gap-3 px-1 pr-2 h-full", {
                                    "bg-white": v.isDirty
                                })}>
                                    <span className={`pl-2 font-normal relative ${color ? color.text : "text-gray-700"}`}>
                                        {i + 1}
                                    </span>
                                    {
                                        v.isDirty
                                            ? <Form
                                                onChange={(value) => { handleChange("name", value) }}
                                                onSubmit={() => { onSubmit(v.name, v.id, v.recordStatusId) }}
                                                fieldName={state.name}
                                            />
                                            : <span className={`font-semibold text-lg truncate`}>
                                                {v.name}
                                            </span>
                                    }
                                </div>

                                {
                                    !v.isDirty &&
                                    <BtnAction handleUpdateCategory={() => onActiveUpdate(v.name, v.id)}
                                        isSelected={false} />
                                }
                            </li>
                        )
                    })
                }
            </ul>

        </div>
    )
}


const toastSuccess = (type: "update" | "create") => {
    const title = type === "create"
        ? "Nueva categoría agregada"
        : "Categoría actualizado"

    ToastSuccess({
        title: title,
        activeBtnClose: true,
    }, { duration: 10000 });
}

const toastError = (type: "update" | "create") => {
    const title = type === "create"
        ? "Error al agregar"
        : "Error al actualizar"

    const descr = type === "create"
        ? "No fue posible crear la categoría."
        : "No fue posible actualizar la categoría."
    ToastError({
        title,// "Error al agregar",
        description: descr,// "No se pudo conectar al servidor.",
        activeBtnClose: true,
    }, { duration: 8000 });

}