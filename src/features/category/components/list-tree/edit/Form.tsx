import { useBasicForm } from "@/src/shared/hooks";
import { INPUT_FIELD_STYLE } from "@/src/shared/theme/inputField/inputFieldStyle"
import clsx from "clsx"
import { CiImageOn } from "react-icons/ci"
import { useBootDataStore } from "@/src/store/useBootDataStore";
import { FormEvent, useEffect, useState } from "react";
import { inputMsg } from "@/src/shared/messages";
import { RECORD_STATUS_TRANSITIONS, RecordStatusDb, serializeRecordStatusLabel } from "@/src/shared/domains/status";
import { Button } from "@/src/shared/components/btn";
import { CategoryEditResponse } from "../../../types";
import { createSlug, getDirtyValues } from "@/src/shared/utils";

import { useUpdateSub } from "../hooks/useUpdateSub";

interface Props {
    onCloseModal: () => void;
    data: CategoryEditResponse;
    isAvailableForActive: boolean;
    status: RecordStatusDb;
    isParentArchivate: boolean
}

export const Form = ({ onCloseModal, data, isAvailableForActive, status, isParentArchivate }: Props) => {

    const recordStatus = useBootDataStore(v => v.bootRecordStatuses);

    const isParent = !data.parentId;
    const updateSub = useUpdateSub(data.id, isParent)

    const [slug, setSlug] = useState(data.slug)

    const { state, handleChange, isError, hasDirty, hasError, isValidate, resetForm } = useBasicForm({
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        recordStatusId: data.recordStatusId
    }, schema);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (isValidate()) {
            const values = getDirtyValues(data, { ...state, slug });
            await updateSub(values, () => {
                onCloseModal()
            })
        };

    }

    // Generar Slug
    useEffect(() => {
        setSlug(createSlug(state.name))
    }, [state.name])


    const statusTransitions = recordStatus.filter(v => {
        if (isAvailableForActive) {
            return RECORD_STATUS_TRANSITIONS.DRAFT.includes(v.name)
        }
        else if (isParentArchivate) {
            return v.name === "ARCHIVED";
        }
        else {
            return RECORD_STATUS_TRANSITIONS[status].includes(v.name)
        }
    })

    return (
        <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-8 py-6">
                {/* NAME*/}
                <div>
                    <label className={`${INPUT_FIELD_STYLE.label} ${INPUT_FIELD_STYLE.isRequired}`}>Nombre</label>
                    <input type="text"
                        className={clsx(INPUT_FIELD_STYLE.base, {
                            [INPUT_FIELD_STYLE.states.normal]: !isError.name,
                            [INPUT_FIELD_STYLE.states.error]: isError.name
                        })}
                        placeholder="Ejp. Electronics"
                        value={state.name}
                        onChange={({ target: { value } }) => handleChange("name", value)}
                    />
                    {isError.name && <span className={INPUT_FIELD_STYLE.labelError} >{isError.name}</span>}
                </div>

                {/* SLUG */}
                <div>
                    <label className={`${INPUT_FIELD_STYLE.label}`}>Slug</label>
                    <input type="text"
                        disabled={true}
                        className={clsx(INPUT_FIELD_STYLE.baseDisabled, INPUT_FIELD_STYLE.states.normal)}
                        placeholder="Slug"
                        value={slug ?? ""}
                    />
                </div>
                {/* DESCRIPTION */}
                <div className="md:col-span-2">
                    <label className={INPUT_FIELD_STYLE.label}>Descripción</label>
                    <textarea className={clsx(INPUT_FIELD_STYLE.base, INPUT_FIELD_STYLE.states.normal)}
                        rows={3}
                        placeholder="Introduzca una descripción detallada de la categoría."
                        value={state.description ?? ""}
                        onChange={({ target: { value } }) => handleChange("description", value)}
                    >
                    </textarea>
                </div>
                {/* STATUS */}
                <div className="md:col-span-2">
                    <label className={`${INPUT_FIELD_STYLE.label} ${INPUT_FIELD_STYLE.isRequired}`}>Estado</label>
                    <select
                        className={clsx(INPUT_FIELD_STYLE.base, INPUT_FIELD_STYLE.states.normal)}
                        value={state.recordStatusId}
                        onChange={({ target: { value } }) => handleChange("recordStatusId", +value)}
                    >
                        <option value={0} className="text-text-muted" > --Seleccionar--</option>
                        {statusTransitions.map(v =>
                            <option key={v.id} value={v.id} >{serializeRecordStatusLabel(v.name)}</option>
                        )}
                    </select>
                    {isError.recordStatusId && <span className={INPUT_FIELD_STYLE.labelError} >{isError.recordStatusId}</span>}
                </div>

                {/* IMAGE */}
                <div className="flex flex-col md:col-span-2 ">
                    <span className={`${INPUT_FIELD_STYLE.label}`}>Imagen</span>
                    <div className="relative group cursor-pointer border-2  border-border-input rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors bg-surface-light">
                        <div className="w-20 h-20 rounded-lg  shadow-sm flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-700">
                            <CiImageOn className="text-3xl" />
                            {/* <span className="material-symbols-outlined text-slate-400 group-hover:text-primary text-3xl">image</span> */}
                            {/* <!-- <img src="https://placeholder.pics/svg/200" data-alt="Category placeholder preview with abstract shapes" className="h-full w-full object-cover"> --> */}
                            {/* <img src="/assets/notfound.jpg" alt="Category placeholder preview with abstract shapes" className="h-full w-full object-cover" /> */}
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Haz clic para subir o arrastra y suelta.</p>
                            <p className="text-[10px] text-slate-400">PNG, JPG up to 2MB</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="px-8 py-5 bg-background border-t border-border-subtle flex justify-end gap-3">
                <button
                    onClick={() => resetForm(data)}
                    disabled={!hasDirty}
                    className="disabled:text-text-subtle disabled:hover:bg-transparent px-6 py-2.5 mr-auto rounded-lg text-sm font-medium text-text hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    Deshacer cambios
                </button>
                <button className="px-6 py-2.5 rounded-lg font-medium text-text-muted hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    type="button"
                    onClick={onCloseModal}>
                    Cancel
                </button>
                <Button
                    disabled={!hasDirty || hasError}
                    variant="primary"
                    type="submit"
                >
                    Guardar cambios
                </Button>
            </div>

        </form>)
}

const schema = {
    name: (v: string) => (v.trim().length < 3 ? inputMsg.minLength({ min: 3 }) : v.trim().length > 100 ? inputMsg.maxLength({ max: 100 }) : true),
    recordStatusId: (id: string) => +id !== 0 ? true : inputMsg.required()
}