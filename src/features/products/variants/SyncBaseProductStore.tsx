"use client"

import { useEffect } from "react"
import { VariantBaseProductResponse } from "../types"
import { useStore } from "@/src/store/useStore"

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