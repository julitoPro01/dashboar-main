"use client";
import { IMAGE_STYLE } from "@/src/constants";
import { ImageDetailsResponse } from "@/src/interfaces/products";
import { useStore } from "@/src/store/useStore"

interface Props {
    imagesDetails: ImageDetailsResponse[]
}

export const ImageDetails = ({ imagesDetails }: Props) => {

    const setModal = useStore(v => v.setModalTypeProductDetails);


    return (
        <section className=" space-y-2">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">Imágenes</h2>

                <button
                    onClick={() => setModal({ type: "image-details", open: true })}
                    className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
                >
                    Editar
                </button>
            </div>

            <div className="flex flex-wrap gap-4">
                {/* {imagesDetails.map((image) => (
                    
                ))} */}

                <div
                    className=" group  rounded-lg border border-gray-200 bg-white p-2 shadow-sm transition hover:shadow-md "       >
                    {/* Imagen */}
                    <div className={`relative overflow-hidden rounded-md bg-gray-100 ${IMAGE_STYLE.preview}`}>
                        <img
                            src="/assets/notfound.jpg"
                            alt={`Imagen del producto ${2}`}
                            className={`transition-transform duration-300 group-hover:scale-105 ${IMAGE_STYLE.image}`}
                        />

                        {true && (
                            <span className=" absolute left-2 top-2 rounded bg-blue-600 px-2 py-0.5 text-xs font-medium text-white shadow ">
                                Principal
                            </span>
                        )}
                    </div>

                    {/* Meta info */}
                    <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
                        <span>Orden</span>
                        <span className="font-medium text-gray-900">
                            {1}
                        </span>
                    </div>
                </div>
            </div>

        </section>
    )
}
