import { AttributeSlice } from "./attributeSlice";
import { CategorySlice } from "./categorySlice";
import { ProductSlice } from "./productSlice";
import { SupplierSlice } from "./supplierSlice";
import { UiSlice } from "./uiSlice";
import { VariantSlice } from "./variantSlice";

export type Store =
    UiSlice &
    CategorySlice &
    VariantSlice &
    ProductSlice &
    SupplierSlice &
    AttributeSlice;