import { FieldErrors, FormState, UseFormRegister, } from "react-hook-form"
import clsx from "clsx";
import { FaLocationDot } from "react-icons/fa6";
import { LogoUpload } from "./field-supplier/Logo.Upload";
import { RelacionModeSelect } from "./field-supplier/RelacionMode.select";
import { SUPPLIER_CAPABILITIES_LABELS } from "../../shared/capability.constans";
import { UpsertSupplierForm } from "../../types/upsertSupplierForm.type";
import { INPUT_FIELD_STYLE } from "@/src/shared/theme/inputField";
import { IoInformation, IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlineStorefront } from "react-icons/md";

interface Props {
    register: UseFormRegister<UpsertSupplierForm>;
    errors: FieldErrors<UpsertSupplierForm>;
    dirty?: FormState<UpsertSupplierForm>['dirtyFields'];
}

export const SupplierForm = ({ register, errors, dirty }: Props) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-6" id="create-supplier">

            <div className="px-8 py-6 bg-surface rounded-xl shadow-sm border border-border-subtle space-y-5">

                <div className="flex items-center gap-3 pb-3 border-b border-border">
                    <IoInformationCircleOutline size={22} className="text-primary" />
                    <h3 className="text-lg font-semibold text-text">
                        Información básica
                    </h3>

                </div>

                <div>
                    <label className={clsx(INPUT_FIELD_STYLE.label, INPUT_FIELD_STYLE.isRequired)}>Nombre del proveedor</label>
                    <input
                        className={clsx(INPUT_FIELD_STYLE.base, {
                            [INPUT_FIELD_STYLE.states.normal]: !errors.name && (!dirty || !dirty.name),
                            [INPUT_FIELD_STYLE.states.dirty]: !errors.name && (dirty && dirty.name),
                            [INPUT_FIELD_STYLE.states.error]: errors.name
                        },)}
                        placeholder="Ej: Industrias Globales S.A."
                        type="text"
                        {...register("name")}
                    />
                    {errors.name && <span className={INPUT_FIELD_STYLE.labelError} > {errors.name.message} </span>}
                </div>

                <div>
                    <label className={`${INPUT_FIELD_STYLE.label} ${INPUT_FIELD_STYLE.isRequired}`}>
                        Dirección Fiscal
                    </label>
                    <div className="relative flex items-center">

                        <span className="absolute left-3 text-gray-400 pointer-events-none">
                            <FaLocationDot />
                        </span>
                        <input
                            className={clsx(INPUT_FIELD_STYLE.base, "ps-10", {
                                [INPUT_FIELD_STYLE.states.normal]: !errors.address && (!dirty || !dirty.address),
                                [INPUT_FIELD_STYLE.states.dirty]: !errors.address && (dirty && dirty.address),
                                [INPUT_FIELD_STYLE.states.error]: errors.address
                            })}
                            placeholder="Calle 123, Ciudad de Lima, CP 01000"
                            type="text"
                            {...register("address")}
                        />
                    </div>
                    {errors.address && <span className={INPUT_FIELD_STYLE.labelError} > {errors.address.message} </span>}
                </div>
                {/* Description Section */}
                <div>
                    <label className={`${INPUT_FIELD_STYLE.label} ${INPUT_FIELD_STYLE.isRequired}`}>
                        Descripción
                    </label>
                    <textarea
                        className={clsx(INPUT_FIELD_STYLE.base, "h-30 resize-none", {
                            [INPUT_FIELD_STYLE.states.normal]: !errors.description && (!dirty || !dirty.description),
                            [INPUT_FIELD_STYLE.states.dirty]: !errors.description && (dirty && dirty.description),
                            [INPUT_FIELD_STYLE.states.error]: errors.description
                        })}
                        placeholder="Breve descripción de los productos o servicios ofrecidos por este proveedor..."
                        {...register("description")}
                    ></textarea>
                    {errors.description && <span className={INPUT_FIELD_STYLE.labelError} > {errors.description.message} </span>}
                </div>

                <LogoUpload />


            </div>

            <div className=" px-8 py-6 bg-surface rounded-xl shadow-sm border border-border-subtle space-y-5">

                <div className="flex items-center gap-3 pb-3 border-b border-border">
                    <MdOutlineStorefront size={22} className="text-primary" />
                    <h3 className="text-lg font-semibold text-text">
                        Comercial
                    </h3>
                </div>

                {/* TODO: PARA SUPER-ADMIN */}
                <RelacionModeSelect register={register} errorMsg={errors.relationMode?.message} dirty={dirty?.relationMode} />

                <div>
                    <span className={`${INPUT_FIELD_STYLE.label} items-end`}>
                        <span className={`${INPUT_FIELD_STYLE.isRequired} text-slate-600 dark:text-slate-300`}>Capacidades</span>
                        <span className="text-xs text-text-muted px-2 font-normal" >Seleccione las opciones que apliquen.</span>
                    </span>

                    <div className="flex flex-wrap gap-3">
                        {Object.entries(SUPPLIER_CAPABILITIES_LABELS).map(([value, label], i) => (
                            <div key={value} className="relative">
                                <input
                                    className={"peer sr-only "}
                                    value={value}
                                    type="checkbox"
                                    id={`cap-${value}`}
                                    {...register(`capabilities`)} />
                                <label htmlFor={`cap-${value}`} className="flex items-center px-4 py-2 rounded-full text-text-muted border border-border-input bg-surface-light text-sm font-medium cursor-pointer hover:border-blue-400 transition-all select-none
                            select-peer" >
                                    {label}
                                </label>
                            </div>
                        ))}
                    </div>
                    {errors.capabilities && <span className={INPUT_FIELD_STYLE.labelError} > {errors.capabilities.message} </span>}

                </div>
            </div>
        </div>
    )
}
