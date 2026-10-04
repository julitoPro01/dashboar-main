"use client";

import { CountSystemProperties, ListSystemProperties } from "./list-properties/ListSystemPropeties";
import { ListCustomProperties } from "./list-properties/ListCustomProperties";
import { OriginalLongDescription } from "@/src/store/productSlice";


interface Props {
    originalLong: OriginalLongDescription;
}

export const ListProperties = (props: Props) => {


    return (
        <div className="overflow-hidden border-t border-border-input">
            <div
                className="border-b border-border-input px-4 py-3">
                <div className="flex gap-2">

                    <span className="text-sm font-semibold text-primary">
                        Propiedades
                    </span>

                    <CountSystemProperties />

                </div>
                <p className="mt-2 text-[12px] text-amber-500">
                    Las propiedades del sistema contienen las características principales del
                    producto. Agrega únicamente información complementaria que no esté definida
                    en ellas.
                </p>
            </div>
            {/* PROPIEDADES DEL SYSTEMA */}
            <ListSystemProperties />

            {/* PROPIEDADES PERSONALIZADAS */}

            <ListCustomProperties {...props} />

        </div>
    );
};


