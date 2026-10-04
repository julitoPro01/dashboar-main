"use client"
import { Button } from "@/src/shared/components/btn"
import clsx from "clsx";
import { inputMsg } from "@/src/shared/messages";
import { IoClose } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { useEffect } from "react";
import { RiDragMove2Fill } from "react-icons/ri";
import { UpsertAttributeForm } from "../../../types";
import { DATA_TYPE_OPTIONS } from "../../../constants/dataTypeLabel";
import { FaUndo } from "react-icons/fa";
import {FIELD_STYLE, type BasicFormReturn } from "@/src/shared/form";
import { DragDropProvider } from "@dnd-kit/react";
import { moveDragEnd } from "@/src/shared/sortable";
import { useSortable } from "@dnd-kit/react/sortable";


interface Props {
    form: BasicFormReturn<UpsertAttributeForm>
}

export const Fields = ({ form }: Props) => {

    const { handleChange, isDirty, isError, state } = form;

    const isSupports = state.dataType === "COLOR" || state.dataType === "SELECT" || state.dataType === "MULTISELECT";

    const handleAddValues = () => {
        const value = state.value.trim();
        if (!value) return;

        handleChange("values", [...state.values, {
            value,
            displayOrder: state.values.length + 1,
            id: -(state.values.length + 1),
        }])
        handleChange("value", "");
    }

    const handleDelValues = (value: string) => {
        const newValues = state.values.filter(v => v.value !== value)
            .map((v, i) => ({ ...v, displayOrder: i + 1 }));
        handleChange("values", newValues)
    }

    const handleDragEnd = moveDragEnd(state.values, (values) => {
        const moved = values.map((v, i) => ({ ...v, displayOrder: i + 1 }))
        handleChange("values", moved);
    })


    useEffect(() => {
        handleChange("isSupportValues", isSupports);
    }, [isSupports])



    return (

        <div className="flex flex-col gap-5 px-8 py-6" >
            <div>
                <label className={clsx(FIELD_STYLE.label, FIELD_STYLE.validation["*"])} >Atributo</label>
                <input type="text"
                    className={clsx(FIELD_STYLE.base, {
                        [FIELD_STYLE.status.normal]: !isDirty.name && !isError.name,
                        [FIELD_STYLE.status.dirty]: isDirty.name && !isError.name,
                        [FIELD_STYLE.status.error]: isError.name
                    }
                    )}
                    onChange={({ target: { value } }) => handleChange("name", value)}
                    value={state.name}
                    placeholder="Min. 3 caracteres"
                />
                {isError.name && <span className={FIELD_STYLE.validation.errorMsg} > {inputMsg.required()} </span>}
            </div>

            <div>
                <label className={clsx(FIELD_STYLE.label)} >Descripción</label>
                <textarea
                    className={clsx(FIELD_STYLE.base,
                        {
                            [FIELD_STYLE.status.normal]: !isDirty.description,
                            [FIELD_STYLE.status.dirty]: isDirty.description
                        }
                    )}
                    rows={3}
                    onChange={({ target: { value } }) => handleChange("description", value)}
                    value={state.description ?? ""}
                    placeholder="Descripción"
                />
            </div>

            <div>
                <label className={clsx(FIELD_STYLE.label, FIELD_STYLE.validation["*"])} >Tipo de dato</label>
                <select
                    className={clsx(FIELD_STYLE.base,
                        {
                            [FIELD_STYLE.status.normal]: !isDirty.dataType && !isError.dataType,
                            [FIELD_STYLE.status.dirty]: isDirty.dataType && !isError.dataType,
                            [FIELD_STYLE.status.error]: isError.dataType
                        },
                    )}
                    onChange={({ target: { value } }) => { handleChange("dataType", value as any) }}
                    value={state.dataType ?? ""}
                >
                    <option value={""} className="text-text-subtle" > Seleccionar </option>
                    {DATA_TYPE_OPTIONS.map(v => (<option key={v.value} value={v.value} >{v.label}</option>))}
                </select>
                {isError.dataType && <span className={FIELD_STYLE.validation.errorMsg} > {inputMsg.required()} </span>}

            </div>

            {
                isSupports &&
                <div className="p-6 rounded-lg bg-surface-elevated dark:bg-surface-light">

                    <div className="flex justify-between mb-3">
                        <div className="flex justify-between mb-3">
                            <label>
                                <span className="text-text">
                                    Agregar valores predefinidos
                                </span>
                                <p className="text-xs text-text-muted mt-1">
                                    Opcional. Úsalo para atributos con una lista de opciones, como color o talla.
                                </p>
                            </label>
                        </div>
                        <Button variant="basic" size="sm" onClick={() => form.onUndo()}
                            title="Deshacer cambios"
                            ariaLabel="Establecer valor original"
                            disabled={!form.isDirty.values}
                        >
                            <FaUndo />
                        </Button>

                    </div>

                    <div className="flex ">
                        <input className={`${FIELD_STYLE.base}
                         ${FIELD_STYLE.status.normal} rounded-l-lg `}
                            // disabled={!state.isSystemDefault}
                            type="text"
                            placeholder="Ej. Rojo"
                            value={state.value}
                            onChange={e => handleChange("value", e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddValues();
                                }
                            }}
                        />
                        <Button variant="basic" select="basic" size="sm"
                            className="bg-surface-overlay border border-l-0 border-border-input rounded-r-lg px-3" rounded="none"
                            // disabled={!state.isSystemDefault}
                            onClick={handleAddValues}
                        >
                            <IoMdAdd size={22} />
                        </Button>

                    </div>
                    <br />
                        <DragDropProvider onDragEnd={handleDragEnd}>
                        <div className=" flex flex-wrap gap-3">
                            {state.values.map((v,i) => (
                                
                                <SortableItem
                                key={v.id}
                                index={i}
                                id={v.id}
                                value={v.value}
                                displayOrder={v.displayOrder}
                                // isSystemDefault={state.isSystemDefault}
                                onDelValue={() => handleDelValues(v.value)}
                                />
                            ))}
                        </div>
                            </DragDropProvider>
                </div>
            }
            <div className="space-x-5">
                <span className={clsx(FIELD_STYLE.label, FIELD_STYLE.validation["*"])} >Estado</span>

                <div className="flex gap-2">
                    <Button onClick={() => handleChange("isActive", true)}
                        active={state.isActive}
                        variant="select" rounded="full">Activo</Button>
                    <Button onClick={() => handleChange("isActive", false)}
                        active={!state.isActive}
                        variant="select" rounded="full">Inactivo</Button>
                </div>
            </div>


        </div>

    )
}

type SortableProps = {index:number, id: number, value: string, displayOrder: number, onDelValue: () => void }
const SortableItem = ({ id, index, onDelValue, displayOrder, value }: SortableProps) => {

    const { ref, handleRef} = useSortable({id,index});

    return (
        <div
            className={clsx(
                "group flex items-center gap-2 rounded-lg border px-2 py-1 transition-colors",
                "border-border-select bg-primary-light/10"
            )}
            ref={ref}
        >
            {/* Orden */}
            <span
                className="flex px-1 items-center justify-center rounded-full text-xs font-semibold text-text-muted"
            >
                {displayOrder}
            </span>
            <div className="border h-full border-border bg-surface" />
            {/* Arrastrar */}
            <button
                type="button"
                className={`disabled:cursor-no-drop cursor-grab active:cursor-grabbing text-text-secondary hover:text-primary transition-colors`}
                ref={handleRef}
            >
                <RiDragMove2Fill size={16} />
            </button>

            {/* Valor */}
            <span className="min-w-0 truncate text-text text-sm">
                {value}
            </span>

            {/* Eliminar */}
            <button
                type="button"
                onClick={onDelValue}
                className={`rounded-full p-1 text-red-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-hover`}
            >
                <IoClose size={15} />
            </button>
        </div>

    )
}