"use client";

import { DiscountField, PriceField, SelectStatusFiedl, StockQuantityField } from "./Fields";
import { SeccionImage } from "./SeccionImage";
import { AttributesField } from "./AttributesField";
import { BtnAction } from "./BtnAction";
import { SelectTags } from "./SelectTags";

interface Props {
  variantStatuses: []
}

export const VariantForm = ({ variantStatuses }: Props) => {


  return (

    <div className="p-4 space-y-4">

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4" >
        <PriceField />

        <DiscountField />

        <StockQuantityField />

      </div>

      <SelectStatusFiedl variantStatuses={variantStatuses} />

      <SeccionImage />

      <AttributesField />

      <SelectTags/>
      <hr className="border-gray-300" />
      <BtnAction />
    </div>
  )
}





