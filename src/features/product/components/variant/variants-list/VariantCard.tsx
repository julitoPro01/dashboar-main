import { VariantDetailsResponse } from "@/src/interfaces/products";
import { Action } from "./Action"
import { Info } from "./Info"
import { FORM_STYLES, IMAGE_STYLE } from "@/src/constants"

interface Props {
    variant: VariantDetailsResponse;
    index: number;
    onSelectPrimaryChange: () => void;
    isMainVariant:boolean
}

export const VariantCard = ({ variant, index, onSelectPrimaryChange, isMainVariant }: Props) => {

    return (
        <div className="group w-full relative flex gap-5 p-4 rounded-2xl bg-white border border-gray-50 shadow-sm hover:shadow-lg transition-all duration-150 select-none">
            {/* Índice circular */}
            <div className="absolute -left-4 -top-2 w-10 h-10 rounded-full bg-amber-500 shadow-lg flex items-center justify-center">
                <span className="font-semibold text-black text-lg">{index + 1}</span>
            </div>

            <div className="flex flex-col gap-3">
                {/* Imagen */}
                <div className={IMAGE_STYLE.compact} >
                    <img className={IMAGE_STYLE.image} src={"/assets/notFound.jpg"} />
                </div>
                {/* checkbox */}
                <div >
                    <label
                        className={FORM_STYLES.label + " " + "cursor-pointer select-none flex items-center gap-3"}
                    >
                        <input
                            type="checkbox"
                            checked={isMainVariant}
                            className=" h-4 w-4 rounded border border-gray-300 text-sky-600 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            onChange={onSelectPrimaryChange}
                        />

                        Imagen principal
                    </label>
                </div>
            </div>

            <div className="flex flex-col flex-1 text-sm justify-between">
                {/* Información */}
                <Info
                    price={variant.price}
                    discount={variant.discount!}
                    stock={variant.stockQuantity}
                    minStock={variant.minStock ?? 0}
                    sku={variant.sku!}
                    labelState={"Activo"}
                />

                {/* Etiquetas */}
                {variant.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2 text-xs">
                        {variant.tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-lg whitespace-nowrap"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <Action
                onDetails={() => { }}
                onRemove={() => { }}
                onUpdate={() => { }}
            />
        </div>)
}
