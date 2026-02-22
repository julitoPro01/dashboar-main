import { UpsertProductForm } from "@/src/features/product/type/upsertProductForm.type";
import { CategoryResponse } from "@/src/interfaces/category";
import clsx from "clsx";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
    mainCategories: CategoryResponse[];
    onSelectCategory: (id: number) => void;
}

export const SelectMainCategory = ({ mainCategories, onSelectCategory }: Props) => {

    const { formState: { errors }, watch, clearErrors } = useFormContext<UpsertProductForm>()

    const selectedCategories = watch("selectedCategories");
    const selectedMainCategory = selectedCategories.find(v => !v.parentId)

    useEffect(() => {

        if (selectedCategories.length > 0) {
            clearErrors("selectedCategories")
        }

    }, [selectedCategories])


    return (
        <>

            <div className="border border-gray-200 rounded-lg ">
                {/* Título/descripción (opcional) */}
                <div className="p-6">
                    <label className="block text-sm font-medium text-gray-700">
                        Selecciona una categoría principal*
                    </label>
                </div>

                {/* Botones de categorías */}
                <div className="flex flex-wrap gap-2 p-6 pt-0">
                    {mainCategories.map(category => (
                        <button
                            type="button"
                            key={category.id}
                            onClick={() => onSelectCategory(category.id)}
                            className={clsx(
                                "px-3 py-1.5 rounded-full border text-sm font-medium transition-all cursor-pointer",
                                {
                                    // Estado normal
                                    "border-gray-300 bg-white text-gray-700 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700":
                                        selectedMainCategory?.id !== category.id,

                                    // Estado seleccionado
                                    "border-indigo-600 bg-indigo-600 text-white shadow-sm":
                                        selectedMainCategory?.id === category.id
                                }
                            )}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Mensaje de error */}
                {errors.selectedCategories && (
                    <div className="px-6 pb-3">
                        <p className="text-sm text-red-600">
                            {errors.selectedCategories.message}
                        </p>
                    </div>
                )}

                {/* Ruta seleccionada */}
                {selectedCategories.length > 0 && (
                    <div className="border-t border-gray-100 px-6 py-3 bg-gray-50 rounded-b-lg">
                        <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-700">Ruta seleccionada:</span>
                            <span className="ml-2 text-indigo-600 font-medium">
                                {selectedCategories.map(v => v.name).join(" › ")}
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </>

    )
}
