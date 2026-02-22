"use client";

import { ProductDetailsResponse } from "@/src/interfaces/products";
import { useStore } from "@/src/store/useStore";

interface Props {
    productDetails: ProductDetailsResponse;
}

export const ProductDetails = ({ productDetails }: Props) => {

    const setModal = useStore(v=>v.setModalTypeProductDetails);

    const onOpenModal =()=>{
        setModal({type:"product-details",open:true});
    }

    return (
        <>
        <section className="border-b pb-4 flex flex-col gap-3">
            {/* ================= HEADER ================= */}

            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold">{productDetails.name}</h1>
                    <p className="text-gray-500">{productDetails.shortDescription}</p>

                </div>

                <button
                    className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
                    onClick={onOpenModal}
                >
                    Editar producto
                </button>

            </div>

            {/* ================= DESCRIPTION ================= */}
            {productDetails.longDescription && (
                <div>
                    <p className="text-gray-700 whitespace-pre-line">
                        {productDetails.longDescription}
                    </p>
                </div>
            )}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span><b>ID:</b> {productDetails.publicId}</span>
                <span><b>Proveedor:</b> {productDetails.supplier}</span>
                <span><b>Categoría:</b> {productDetails.mainCategory}</span>
                <span><b>Estado:</b> {productDetails.recordStatus}</span>
                <span><b>Verificación:</b> {productDetails.verificationStatus}</span>
            </div>

        </section>

        </>
    );
};


const Info = ({ label, value }: { label: string; value: string }) => (
    <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
    </div>
);
