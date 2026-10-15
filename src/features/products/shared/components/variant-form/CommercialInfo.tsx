
"use client";

import { IoCardOutline } from "react-icons/io5";
import { IdentifiersFields } from "./commercil-info/IdentifiersFields";
import { PricingFields } from "./commercil-info/PricingFields";
import { PriceCalculationCard } from "./commercil-info/PriceCalculationCard";


export const CommercialInfo = () => {

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
            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                {/* #1 */}
                <IdentifiersFields/>
                {/* #2 */}
                <PricingFields/>

            </div>

            {/* Price calculation */}
            <PriceCalculationCard />

        </section>
    );
};


