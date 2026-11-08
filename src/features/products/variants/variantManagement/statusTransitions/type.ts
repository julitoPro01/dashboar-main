export interface StatusProps {
    variantId: number,
    sku: string,
    productId: number,
    onCloseModal: () => void
    successAction: () => void;
}
