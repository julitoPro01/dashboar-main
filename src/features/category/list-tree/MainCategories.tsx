"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { FaRegFolder } from "react-icons/fa";
import { MdOutlineSubdirectoryArrowRight, MdPostAdd } from "react-icons/md";


import { useStore } from "@/src/store/useStore";
import { Button } from "@/src/shared/components/btn";
import { APP_ROUTES, setQueryParams, withQueryParams } from "@/src/shared/routes";
import { CategoryResponse } from "../types";
import { useCreateMainCategory } from "../shared/hooks";
import { SortByButton } from "./main-categories/SortByButton";
import { CreateCategoryForm } from "../shared/components";
import { useBasicForm } from "@/src/shared/form";


interface Props {
    mainCategories: CategoryResponse[];
    user: { name: string, id: number }
}


export const MainCategories = ({ mainCategories, user }: Props) => {

    const setSelect = useStore(v => v.setSelectMainCategory);
    const selected = useStore(v => v.selectedMainCategory);

    const [categories, setCategories] = useState<CategoryResponse[]>([]);

    const [isActiveForm, setIsActiveForm] = useState(false);

    const { createCategory, isPending } = useCreateMainCategory(user);

    const { state, handleChange, onSubmit, resetForm, hasError } = useBasicForm({ name: "" },
        {
            name: (v) => v.trim().length > 2
        }, {
        async onSubmit({ name }) {
            const res = await createCategory(name)

            if (res.ok) {
                const val = res.data!;
                setCategories(v => [...v, {
                    id: val.id,
                    publicId: val.publicId,
                    name: val.name,
                    recordStatus: val.recordStatus.name,
                    level: val.level,
                    path: val.path,
                    hasChildren: false,
                    hasAttributes: false
                }])
                handleActiveForm(false)
            }
        }
    });

    const handleSortBy = () => {

        const search = new URLSearchParams(window.location.search);
        const order = search.get("order")?.toLowerCase() === "asc" ? "desc" : "asc";

        setQueryParams(withQueryParams(APP_ROUTES.CATEGORIES.INDEX, { order }));

        setCategories(v => [...v.sort((a, b) => {
            return order === "desc"
                ? b.recordStatus.localeCompare(a.recordStatus, "es", { sensitivity: "base", numeric: true })
                : a.recordStatus.localeCompare(b.recordStatus, "es", { sensitivity: "base", numeric: true });
        })])
    }
  

    const handleActiveForm = (isActive: boolean = true) => {
        if (!isActive)
            resetForm()
        setIsActiveForm(isActive)
    }

    const handleSelect = (ctg: CategoryResponse) => {
        setSelect({
            id: ctg.id,
            path: ctg.path,
            recordStatus: ctg.recordStatus,
            name: ctg.name,
            hasChildren: ctg.hasChildren,
            publicId: ctg.publicId,
            level: ctg.level,
            hasAttributes: ctg.hasAttributes
        })
    }

    useEffect(() => {
        setCategories(mainCategories)
    }, [mainCategories]);

    // --- PENDIENTE A LOS CAMBIOS - ACTUALIZACION DE LA LISTA
    useEffect(() => {

        if (selected?.sync === "update") {
            setCategories(v => v.map(v => v.id === selected.id ? {
                ...v,
                name: selected.name,
                recordStatus: selected.recordStatus,
                hasChildren: selected.hasChildren,
                hasAttributes: selected.hasAttributes
            } : v));

            setSelect({ ...selected, sync: undefined })

        }
        else if (selected?.sync === "delete") {
            setCategories(v => v.filter(v => v.id !== selected.id));
            setSelect(undefined)
        }
    }, [selected])


    return (
        <div className=" flex flex-col h-full scrollbar-hide overflow-auto  relative">

            <div className=" flex items-center gap-2 border-b border-border px-4 py-4 sticky top-0 left-0 z-1 bg-surface h-20">
                <div className="truncate flex gap-4 flex-1 items-center">
                    <span className="text-text font-bold truncate">Categorias</span>
                </div>
                <Button variant="basic" onClick={() => handleActiveForm()}>
                    <MdPostAdd size={20} />
                </Button>

                <SortByButton onToogle={handleSortBy} />
            </div>

            <ul className="flex relative flex-col space-y-1 px-4 py-2  h-full ">
                {isActiveForm &&
                    <li className="flex items-center gap-2 pl-1 py-1">
                        <CreateCategoryForm
                            onClose={() => handleActiveForm(false)}
                            onChange={(value) => handleChange("name", value)}
                            onSubmit={onSubmit}
                            value={state.name}
                            isSubmitting={isPending}
                            disabled={hasError} />
                    </li>
                }
                {
                    categories.map((v, i) => {

                        return (
                            <li key={v.id}
                                className={clsx("flex items-center justify-between py-2 px-2 rounded-lg transition-colors select-none cursor-pointer",
                                    selected?.id === v.id ? "bg-bg-select text-text" : "hover:bg-hover text-text-muted")}
                                onClick={() => handleSelect(v)}
                            >
                                <div className={clsx("flex w-full items-center text-sm truncate gap-3 h-full ")}>

                                    {v.hasChildren
                                        ? <span className="text-lg text-amber-500"><FaRegFolder /></span>
                                        : <span className="text-lg text-text-subtle"><MdOutlineSubdirectoryArrowRight /></span>
                                    }

                                    <span className={`font-semibold truncate`}>
                                        {v.name}
                                    </span>
                                </div>
                                < div className={`size-2 rounded-full`} />

                            </li>
                        )
                    })
                }
            </ul>

        </div>
    )
}


