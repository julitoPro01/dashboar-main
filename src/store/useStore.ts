import { create } from "zustand";
import { categorySlice, CategorySlice } from "./categorySlice";
import { VariantSlice, variantSlice } from "./variantSlice";
import { UiSlice, uiSlice } from "./uiSlice";
import { BootDataSlice, bootDataSlice } from "./bootDataSlice";
import { ProductSlice, productSlice } from "./productSlice";
import { supplierSlice, SupplierSlice } from "./supplierSlice";

export const useStore = create<UiSlice & CategorySlice & VariantSlice & BootDataSlice & ProductSlice & SupplierSlice>((...a) => ({
    ...uiSlice(...a),
    ...categorySlice(...a),
    ...variantSlice(...a),
    ...bootDataSlice(...a),
    ...productSlice(...a),
    ...supplierSlice(...a)
}));    