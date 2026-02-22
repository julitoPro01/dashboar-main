"use client";

import { AttributeDetailsResponse } from "@/src/interfaces/attribute";
import { useStore } from "@/src/store/useStore"

interface Props{
    attributesDetails: AttributeDetailsResponse[]
}

export const AttributeDetails = ({attributesDetails}:Props) => {

    const setModal = useStore(v=>v.setModalTypeProductDetails);

    return (
        <section className=" space-y-2">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">Atributos</h2>

                <button
                    onClick={()=>setModal({type:"attribute-details",open:true})}
                    className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
                >
                    Editar
                </button>
            </div>
            {attributesDetails.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {attributesDetails.map(attr => (
                        <div
                            key={attr.categoryAttributeId}
                            className="flex justify-between border rounded-md px-3 py-2 bg-gray-50"
                        >
                            <span className="text-gray-500">{attr.key}</span>
                            {
                                attr.value
                                    ? <span className="font-medium">{attr.value}</span>
                                    : <span className="italic">{"No definido"}</span>
                            }
                        </div>
                    ))}
                </div>
            )}
        </section>)
}
