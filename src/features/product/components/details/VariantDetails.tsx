import { ProductVariantDetailsResponse } from "@/src/interfaces/products"

interface Props{
    variantsDetials:ProductVariantDetailsResponse[]
}

export const VariantDetails = ({variantsDetials}: Props) => {
    return (
        <section className="space-y-2">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">Variantes</h2>

                <button
                    // onClick={onEditCategory}
                    className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
                >
                    Editar
                </button>
            </div>

            <div className="space-y-4">
                {variantsDetials
                    .sort((a, b) => a.displayOrder - b.displayOrder)
                    .map(variant => (
                        <div
                            key={variant.id}
                            className="border rounded-md p-4 space-y-3"
                        >
                            {/* Header */}
                            <div className="flex flex-wrap justify-between gap-2">
                                <div>
                                    <p className="font-medium">
                                        SKU: <span className="font-mono">{variant.sku}</span>
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Estado: {variant.recordStatus}
                                        {variant.isMainVariant && " · Variante principal"}
                                    </p>
                                </div>

                                <div className="text-right text-sm">
                                    <p>Stock: {variant.stockQuantity}</p>
                                    {variant.minStock !== null && (
                                        <p className="text-gray-500">
                                            Mín: {variant.minStock}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex gap-4 text-sm">
                                <span>
                                    Precio: <b>S/. {variant.price.toFixed(2)}</b>
                                </span>
                                {variant.discount > 0 && (
                                    <span className="text-red-600">
                                        Descuento: {variant.discount}%
                                    </span>
                                )}
                            </div>

                            {/* Tags */}
                            {variant.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                    {variant.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="px-2 py-0.5 bg-gray-100 rounded text-sm"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Variant attributes */}
                            {variant.attributesDetails.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {variant.attributesDetails.map(attr => (
                                        <div
                                            key={attr.categoryAttributeId}
                                            className="flex justify-between text-sm border rounded px-2 py-1"
                                        >
                                            <span className="text-gray-500">{attr.key}</span>
                                            {
                                                attr.value
                                                    ? <span className="font-medium">{attr.value}</span>
                                                    : <span className="italic">{"No definido"}</span>
                                            }                                            </div>
                                    ))}
                                </div>
                            )}

                            {/* Variant images */}
                            {variant.imagesDetails.length > 0 && (
                                <div className="flex gap-2 overflow-x-auto">
                                    {variant.imagesDetails.map(img => (
                                        <img
                                            key={img.id}
                                            src={img.url}
                                            alt="variant"
                                            className="w-20 h-20 object-cover rounded border"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </section>
    )
}
