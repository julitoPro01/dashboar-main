"use client";

import { getCategories } from "@/src/action";
import { CategoryResponse } from "@/src/interfaces/category";
import { CategoryDetailsResponse } from "@/src/interfaces/products";
import { useStore } from "@/src/store/useStore"
import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {
    categoriesDetials: CategoryDetailsResponse[];
}

//TODO: Implementar isLoading
export const CategoryDetails = ({ categoriesDetials }: Props) => {

    const setModal = useStore(v => v.setModalTypeProductDetails);

    const [isActive, setIsActive] = useState(false);
    const [mainCategories, setMainCategories] = useState<CategoryResponse[]>([]);
    const mainCategory = categoriesDetials.find(v => !v.parentId)!;

    const onCancel = () => {
        setIsActive(false)
    };

    const onSelect = (id: number) => {
        setModal({ type: "category-details", open: true, id });
    }

    useEffect(() => {

        if (isActive) { }

        getCategories({ mains: true, typeProductCategory: true })
            .then(v => {
                if (v.ok) {
                    setMainCategories(v.data!)
                }
            })

        return () => {
        }
    }, [isActive])


    return (
        <section className="space-y-2">

            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">Categoría</h2>
                {
                    !isActive
                        ? <button
                            className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
                            onClick={() => setIsActive(true)}
                        >
                            Editar
                        </button>
                        : <button
                            className="px-3 py-1.5 text-xs font-medium rounded-md border border-red-300 bg-white text-red-700 hover:bg-gray-50 transition"
                            onClick={onCancel}
                        >
                            Cancelar
                        </button>
                }

            </div>

            <p className="text-gray-600">
                {categoriesDetials.map(v => v.name).join(" > ")}
            </p>

            {
                isActive &&
                <div className="bg-white border border-gray-300 rounded-md">
                    <div className="p-6">
                        <label className="block text-sm font-medium text-gray-700">
                            Selecciona una categoría principal
                        </label>
                    </div>

                    {/* Botones de categorías */}
                    <div className="flex flex-wrap gap-2 p-6 pt-0">
                        {mainCategories.map(category => (
                            <button
                                type="button"
                                key={category.id}
                                onClick={() => onSelect(category.id)}
                                className={clsx(
                                    "px-3 py-1.5 rounded-full border text-sm font-medium transition-all cursor-pointer",
                                    {
                                        "border-gray-300 bg-white text-gray-700 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700":
                                            mainCategory.id !== category.id,
                                        // Estado seleccionado
                                        "border-indigo-600 bg-indigo-600 text-white shadow-sm":
                                            mainCategory.id === category.id
                                    }
                                )}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                </div>
            }
        </section>
    )
}
