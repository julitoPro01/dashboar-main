
"use client";

import { Input } from "@/src/shared/form";
import { Control, FieldErrors, useFormContext, useFormState, useWatch } from "react-hook-form";
import { IoCardOutline } from "react-icons/io5";
import { VariantForm } from "../../../types";


export const CommercialInfo = () => {


    const { register, control } = useFormContext<VariantForm>();

    const {errors} = useFormState({control,name:"commercialInfo"})

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
                    placeholder="PRD-8KL783"
                    label="SKU"
                    roundedSize="sm"
                    labelOption={{ type: "top-floating", description: "Identificador universal único" }}
                    {...register("commercialInfo.sku")}
                />


                <Input
                    readOnly
                    placeholder="775123456789"
                    label="Código de barras"
                    roundedSize="sm"
                    labelOption={{ type: "top-floating", description: "Opcional · EAN / UPC / GTIN" }}
                    {...register("commercialInfo.barCode")}
                />
                <div className="col-span-2"></div>

                <Input
                    type="number"
                    min={0}
                    step={0.01}

                    placeholder="50.00"
                    label="Precio base regular"

                    labelOption={{ type: "top-floating", required: true }}
                    roundedSize="sm"
                    fieldIcon={"S/"}
                    fieldClass="ps-8"
                    error={errors.commercialInfo?.basePrice?.message}
                    {...register("commercialInfo.basePrice", { valueAsNumber: true })}
                />

                <Input
                    type="number"
                    max={100}
                    min={0}
                    placeholder="0"
                    label="Descuento aplicado"
                    iconPosition="right"
                    fieldIcon="%"
                    roundedSize="sm"
                    labelOption={{ type: "top-floating" }}
                    error={errors.commercialInfo?.discount?.message}
                    {...register("commercialInfo.discount", {
                        setValueAs: (value) => {
                            if (value === "") return undefined;

                            const number = Number(value);

                            return Number.isNaN(number) ? undefined : number;
                        },
                    })}
                />
            </div>

            {/* Price calculation */}
            <PriceCalculation control={control} errors={errors}/>

        </section>
    );
};


const PriceCalculation = ({ control, errors }: { control: Control<VariantForm>, errors:FieldErrors<VariantForm> }) => {

    const errorPrice = errors.commercialInfo?.basePrice?.message;
    const errorDiscount = errors.commercialInfo?.basePrice?.message;

    const price = useWatch({
        control,
        name: "commercialInfo.basePrice",
    }) ;

    const discount = useWatch({
        control,
        name: "commercialInfo.discount",
    });

    const hasPrice = Number.isFinite(price);
    const hasDiscount = Number.isFinite(discount);

    //-----
    const isFree = hasPrice &&
        (
            price === 0 ||
            (hasDiscount && discount === 100)
        );

    //----------
    const discountAmount =
        !errorPrice &&
            !errorDiscount &&
            hasPrice &&
            hasDiscount
            ? price! * (discount! / 100)
            : 0;

    const finalPrice =
        !errorPrice && hasPrice
            ? price! - discountAmount
            : null;

    return (
        <div className="rounded-md border border-border-subtle bg-bg-soft-blue px-4 py-3 text-sm">
            <div className="flex items-center justify-between">
                <span className="text-text-muted">
                    Descuento calculado
                </span>

                <span className="font-medium text-error-strong">
                    {hasPrice && hasDiscount
                        ? `−S/ ${discountAmount.toFixed(2)}`
                        : "—"}
                </span>
            </div>

            <div className="mt-2 border-t border-border-strong pt-2">
                <div className="flex items-center justify-between">
                    <span className="font-semibold text-text">
                        Precio final al cliente
                    </span>

                    <span className="text-base text-primary">
                        {isFree ? (
                            <span className="inline-flex items-baseline gap-1.5">
                                <span className="text-xs text-text-muted">
                                    S/ 0.00
                                </span>

                                <span className="font-semibold">
                                    Gratis
                                </span>
                            </span>
                        ) : finalPrice !== null ? (
                            <span>
                                S/ {formatPrice(finalPrice)}
                            </span>
                        ) : (
                            <span className="font-semibold">
                                —
                            </span>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
};

const formatPrice = (value: number) =>
    new Intl.NumberFormat("es-PE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);