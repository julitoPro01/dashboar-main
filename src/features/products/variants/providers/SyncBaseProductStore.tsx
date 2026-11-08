"use client"

import { useEffect } from "react"
import { useStore } from "@/src/store/useStore"
import { VariantBaseProductResponse } from "../../types";

interface Props {
    product: VariantBaseProductResponse;
}

export const SyncBaseProductStore = ({ product }: Props) => {
    const setBaseProduct = useStore((v) => v.setVariantBaseProduct);
    
    useEffect(() => {
        setBaseProduct({
            id: product.id,
            category: product.category,
            name:product.name,
            sku:product.sku
        });

        return () => {
            setBaseProduct(undefined);
        };
    }, [product, setBaseProduct]);

    return null;
};
