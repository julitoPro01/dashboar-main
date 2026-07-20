import { create } from "zustand";
import { categorySlice } from "./categorySlice";
import { variantSlice } from "./variantSlice";
import { uiSlice } from "./uiSlice";
import { productSlice } from "./productSlice";
import { supplierSlice } from "./supplierSlice";
import { attributeSlice } from './attributeSlice/attributeSlice';
import type { Store } from "./Store.type";

export const useStore = create<Store>((...a) => ({
    ...uiSlice(...a),
    ...categorySlice(...a),
    ...variantSlice(...a),
    ...productSlice(...a),
    ...supplierSlice(...a),
    ...attributeSlice(...a)
}));    