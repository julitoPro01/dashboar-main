
"use client";

import { Input } from "@/src/shared/form";
import { IoCardOutline } from "react-icons/io5";

interface VariantCommercialInfoProps {
    sku?: string;
    barcode?: string;
    price?: number;
    discount?: number;
}

export const CommercialInfo = ({
    sku = "PRD-A8K3F8",
    barcode = "",
    price = 59.90,
    discount = 10,
}: VariantCommercialInfoProps) => {

    const discountAmount = price * (discount / 100);
    const finalPrice = price - discountAmount;

    return (
        <section className="space-y-6">

            {/* Section header */}
            <h3 className="flex items-center gap-3 text-text font-semibold">
                <IoCardOutline
                    size={18}
                    className="text-primary"
                />

                <span>
                    2. Información comercial y precios
                </span>
            </h3>

            {/* Identifiers */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">

                <Input
                    readOnly
                    value={""}
                    placeholder="PRD-8KL783"
                    label="SKU"
                    roundedSize="sm"
                    labelOption={{ type: "top-floating", description: "Identificador universal único" }}
                />


                <Input
                    readOnly
                    value={""}
                    placeholder="775123456789"
                    label="Código de barras"
                    roundedSize="sm"
                    labelOption={{ type: "top-floating", description: "Opcional · EAN / UPC / GTIN" }}

                />
                <div className="col-span-2"></div>
                <Input
                    readOnly
                    value={""}
                    placeholder="50.00"
                    label="Precio base regular"
                    labelOption={{ type: "top-floating", }}
                    roundedSize="sm"
                    fieldIcon={"S/"}
                    fieldClass="ps-8"
                />

                <Input
                    readOnly
                    value={""}
                    placeholder="10"
                    label="Descuento aplicado"
                    iconPosition="right"
                    fieldIcon="%"
                    roundedSize="sm"
                    labelOption={{ type: "top-floating" }}
                />
            </div>


            {/* Price calculation */}
            <div className="rounded-md border border-border-subtle bg-bg-soft-blue px-4 py-3 text-sm">
                <div className="flex items-center justify-between">
                    <span className="text-text-muted">
                        Descuento calculado
                    </span>

                    <span className="font-medium text-error-strong">
                        −S/ {discountAmount.toFixed(2)}
                    </span>
                </div>

                <div className="mt-2 border-t border-border-strong pt-2">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-text">
                            Precio final al cliente
                        </span>

                        <span className="text-base font-semibold text-primary">
                            S/ {finalPrice.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

        </section>
    );
};
