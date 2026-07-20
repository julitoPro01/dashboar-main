"use client";
import { INPUT_FIELD_STYLE } from "@/src/shared/theme/inputField/inputFieldStyle";
import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface Props {
    name: UseFormRegisterReturn<"name">;
    shortDescription: UseFormRegisterReturn<"shortDescription">;
    longDescription: UseFormRegisterReturn<"longDescription">;
}

export const InfoBasicForm = ({ name, shortDescription, longDescription }: Props) => {
    return (
        <section className='rounded-xl border border-border bg-surface p-6 shadow-sm '>
            <h3 className='text-lg font-bold mb-6 flex items-center gap-2 text-text'>
                <span className='text-primary'><IoMdInformationCircleOutline /></span>
                Información básica
            </h3>
            <div className="space-y-5">
                <div >
                    <label className={clsx(INPUT_FIELD_STYLE.label,INPUT_FIELD_STYLE.isRequired)}>Nombre del producto</label>
                    <input
                        className={clsx(INPUT_FIELD_STYLE.base, {
                            [INPUT_FIELD_STYLE.states.normal]: true
                        })}
                        type="text"
                        placeholder="e.g. Sonic Pro Wireless Headphones"
                        {...name}
                    />
                </div>

                <div >
                    <label className={clsx(INPUT_FIELD_STYLE.label,INPUT_FIELD_STYLE.isRequired)}>Descripción corta</label>
                    <input
                        className={clsx(INPUT_FIELD_STYLE.base, {
                            [INPUT_FIELD_STYLE.states.normal]: true
                        })} 
                        type="text"
                        placeholder="Resumen de una oración para los resultados de la búsqueda"
                        {...shortDescription}
                        />
                </div>

                <div >
                    <label className={INPUT_FIELD_STYLE.label}>Descripción larga</label>
                    <textarea className={clsx(INPUT_FIELD_STYLE.base, {
                        [INPUT_FIELD_STYLE.states.normal]: true
                    })}
                    placeholder="Ingrese especificaciones detalladas del producto, características y beneficios..." rows={8}
                    {...longDescription}
                    ></textarea>
                </div>
            </div>
        </section>
    )
}
