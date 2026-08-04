"use client";

import { getPreviewProductDetails } from "@/src/action";
import { useStore } from "@/src/store/useStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DynamicModal } from "@/src/shared/components/modal";
import { errorMessages } from "@/src/shared/messages";
import { PreviewProductDetailsResponse } from "../../../details/types";


export const PreviewProductDetails = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [details, setDetails] = useState<PreviewProductDetailsResponse>();
    const [loading, setLoading] = useState({ ok: false, isError: false })
    // const prevSelectedId = useRef<number | undefined>(undefined);

    const selectedProductId = useStore(v => v.selectedProduct?.to === "modal" ? v.selectedProduct.id : undefined);
    const setSelectedProduct = useStore(v => v.setSelectedProduct);

    const onCloseModal = () => {
        // Deseleccionamos y cerramos el modal
        setSelectedProduct(undefined);
        setModalOpen(false);
    };

    useEffect(() => {

        if (selectedProductId) {
            setLoading({ ok: true, isError: false });
            getPreviewProductDetails({ id: selectedProductId })
                .then(v => {
                    if (v.ok) {
                        setDetails(v.data!)
                        setLoading({ ok: false, isError: false });

                    } else
                        setLoading({ ok: false, isError: true });
                })
        }

    }, [selectedProductId]);

    useEffect(() => {

        // Abrimos modal
        if (selectedProductId) {
            setModalOpen(true);
            // prevSelectedId.current = selectedProductId;
        }

    }, [selectedProductId])


    return (
        <DynamicModal
            title={
                loading.ok
                    ? "Cargando..." : !loading.isError ? details?.name ?? "" : errorMessages.loading.title}
            open={modalOpen} onClose={onCloseModal} >
            {
                (details && !loading.isError) ?
                    <div className="p-4 space-y-4 text-sm">
                        {/* Estados */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <span className="text-xs text-gray-500">Estado</span>
                                <div className="font-medium">{details.status}</div>
                            </div>

                            <div>
                                <span className="text-xs text-gray-500">
                                    Estado de verificación
                                </span>
                                <div className="font-medium">{details.verificationStatus}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <span className="text-xs text-gray-500">Proveedor</span>
                                <div className="font-medium">{details.supplier}</div>
                            </div>

                            <div>
                                <span className="text-xs text-gray-500">
                                    Categoría
                                </span>
                                <div className="font-medium">{details.mainCategory}</div>
                            </div>
                        </div>

                        {/* Descripciones */}
                        <div>
                            <span className="text-xs text-gray-500">Descripción corta</span>
                            <p className="mt-1">{details.shortDescription}</p>
                        </div>

                        {details.longDescription && (
                            <div>
                                <span className="text-xs text-gray-500">Descripción larga</span>
                                <p className="mt-1 whitespace-pre-line">
                                    {details.longDescription}
                                </p>
                            </div>
                        )}
                        {/* Imagenes */}
                        <div>
                            <h3 className="text-sm font-semibold mb-2">Imagenes</h3>
                            {details.images.length > 0
                                ?
                                <div className="space-y-2 p-6 flex max-w-full justify-start overflow-y-hidden overflow-x-auto scrollbar-thin gap-4 bg-slate-50 rounded-lg">

                                    {details.images.map((v) => (
                                        <div key={v.id} className="mt-1 flex flex-col items-start gap-2">
                                            <div className="w-40 h-40 rounded-lg border border-dashed border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50">
                                                <img src={"/public/assets/notfound.jpg"} alt={"Nueva imagen"} className="object-contain w-full h-full" />
                                            </div>
                                            <span className="text-xs bg-green-500 text-white px-4 rounded-lg" > Es imagen principal </span>
                                            <span className="text-xs bg-orange-500 text-white px-4 rounded-lg " > orden: 1 </span>
                                        </div>
                                    ))}
                                </div>
                                :
                                <span className="text-gray-400"> Las imagenes aún no han sido definidas </span>
                            }
                        </div>

                        {/* Variantes */}
                        <div>
                            <h3 className="text-sm font-semibold mb-2">Variantes</h3>

                            <div className="space-y-2">
                                {details.variants.map((variant) => (
                                    <div
                                        key={variant.id}
                                        className="border rounded-md p-3 grid grid-cols-2 lg:grid-cols-5 gap-2"
                                    >
                                        <div>
                                            <span className="text-xs text-gray-500">SKU</span>
                                            <div>{variant.sku}</div>
                                        </div>

                                        <div>
                                            <span className="text-xs text-gray-500">Estado</span>
                                            <div>{variant.status}</div>
                                        </div>

                                        <div>
                                            <span className="text-xs text-gray-500">Stock</span>
                                            <div>{variant.stockQuantity}</div>
                                        </div>

                                        <div>
                                            <span className="text-xs text-gray-500">Precio</span>
                                            <div>${variant.price}</div>
                                        </div>

                                        <div>
                                            <span className="text-xs text-gray-500">Descuento</span>
                                            <div>{variant.discount}%</div>
                                        </div>
                                    </div>
                                ))}
                                {details.variants.length < 1 && <span className="text-gray-400"> Las variantes aún no han sido definidas </span>}
                            </div>
                        </div>

                        <Link href={`/product/${details.publicId}`}
                            onClick={() => {
                                onCloseModal()
                            }}
                            className="text-blue-500 hover:text-blue-600"> Ver detalle completa </Link>
                    </div>
                    :
                    <span className="px-4 text-red-500"> {loading.isError && errorMessages.loading.description} </span>
            }
        </DynamicModal>
    )
}
