"use client";

import { TYPE_PRODUCT_DETAILS } from "@/src/store/productSlice";
import { useStore } from "@/src/store/useStore";
import { useEffect } from "react";
import { AttributeEditForm, CategoryEditForm, ImageEditForm, ProductEditForm } from "./modal-editForm";
import { ProductDetailsResponse } from "@/src/interfaces/products";
import { DynamicModal } from "@/src/components/modal";

const MODAL_TITLES: Record<TYPE_PRODUCT_DETAILS, string> = {
    'product-details': 'Editar Producto',
    'image-details': 'Gestionar Imágenes',
    'category-details': 'Editar Categorías',
    'attribute-details': 'Gestionar Atributos',
};

const SIZE: Record<string, string> = {
    "image-details": ""
}

interface Props {
    productDetailsData: ProductDetailsResponse
}

export const ModalEditForm = ({ productDetailsData }: Props) => {

    const modal = useStore(v => v.modalTypeProductDetails);
    const setProductDetails = useStore(v => v.setProductDetailsData);
    const setModal = useStore(v => v.setModalTypeProductDetails);

    const renderModalContent = () => {
        switch (modal.type) {
            case 'product-details':
                return <ProductEditForm />;

            case 'image-details':
                return <ImageEditForm />;

            case 'category-details':
                return <CategoryEditForm />;

            case 'attribute-details':
                return <AttributeEditForm />;

            default:
                return <p>Contenido no disponible</p>;
        }
    };

    useEffect(() => {
        setProductDetails(productDetailsData)

        return () => {
            setProductDetails()
        }
    }, [productDetailsData])


    return (
        <DynamicModal
            title={modal.type ? MODAL_TITLES[modal.type] : ""}
            modalOpen={modal.open}
            onCloseModal={() => setModal({ type: modal.type, open: false })}
            size={modal.type !== "image-details" ? "lg" : "4xl"}
        >
            {renderModalContent()}
        </DynamicModal>
    )
}


