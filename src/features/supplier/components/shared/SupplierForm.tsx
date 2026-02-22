import { FieldErrors, FormState, UseFormRegister, } from "react-hook-form"
import { FORM_STYLES } from "@/src/constants";
import clsx from "clsx";
import { FaLocationDot } from "react-icons/fa6";
import { LogoUpload } from "./field-supplier/Logo.Upload";
import { RelacionModeSelect } from "./field-supplier/RelacionMode.select";
import { SUPPLIER_CAPABILITIES_LABELS } from "../../shared/capability.constans";
import { UpsertSupplierForm } from "../../shared/upsertSupplierForm.type";


interface Props {
    register: UseFormRegister<UpsertSupplierForm>;
    errors: FieldErrors<UpsertSupplierForm>;
    dirty?: FormState<UpsertSupplierForm>['dirtyFields'];
}

export const SupplierForm = ({ register, errors, dirty }: Props) => {
    return (
        <div className="p-8 space-y-6" id="create-supplier">
            <div className="space-y-4">

                <label className="block">
                    <span className={`${FORM_STYLES.label} ${FORM_STYLES.isRequired}`}>
                        Nombre del Proveedor
                    </span>
                    <input
                        className={clsx(FORM_STYLES.base, {
                            [FORM_STYLES.states.normal]: !errors.name && (!dirty || !dirty.name),
                            [FORM_STYLES.states.dirty]: !errors.name && (dirty && dirty.name),
                            [FORM_STYLES.states.error]: errors.name
                        },)}
                        placeholder="Ej: Industrias Globales S.A."
                        type="text"
                        {...register("name")}
                    />
                    {errors.name && <span className={FORM_STYLES.labelError} > {errors.name.message} </span>}
                </label>

                <label className="block">
                    <span className={`${FORM_STYLES.label} ${FORM_STYLES.isRequired}`}>
                        Dirección Fiscal
                    </span>
                    <div className="relative flex items-center">

                        <span className="absolute left-3 text-gray-400 pointer-events-none">
                            <FaLocationDot />
                        </span>
                        <input
                            className={clsx(FORM_STYLES.base, "ps-10", {
                                [FORM_STYLES.states.normal]: !errors.address && (!dirty || !dirty.address),
                                [FORM_STYLES.states.dirty]: !errors.address && (dirty && dirty.address),
                                [FORM_STYLES.states.error]: errors.address
                            })}
                            placeholder="Calle 123, Ciudad de Lima, CP 01000"
                            type="text"
                            {...register("address")}
                        />
                    </div>
                    {errors.address && <span className={FORM_STYLES.labelError} > {errors.address.message} </span>}
                </label>
            </div>

            <div className="space-y-5">
                {/* Description Section */}
                <label className="block">
                    <span className={`${FORM_STYLES.label} ${FORM_STYLES.isRequired}`}>
                        Descripción
                    </span>
                    <textarea
                        className={clsx(FORM_STYLES.base, "h-30 resize-none", {
                            [FORM_STYLES.states.normal]: !errors.description && (!dirty || !dirty.description),
                            [FORM_STYLES.states.dirty]: !errors.description && (dirty && dirty.description),
                            [FORM_STYLES.states.error]: errors.description
                        })}
                        placeholder="Breve descripción de los productos o servicios ofrecidos por este proveedor..."
                        {...register("description")}
                    ></textarea>
                    {errors.description && <span className={FORM_STYLES.labelError} > {errors.description.message} </span>}
                </label>

                {/* TODO: PARA SUPER-ADMIN */}
                <RelacionModeSelect register={register} errorMsg={errors.relationMode?.message} dirty={dirty?.relationMode} />

                <div>
                    <span className={`${FORM_STYLES.label} ${FORM_STYLES.isRequired}`}>Capacidades</span>
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
                    {errors.capabilities && <span className={FORM_STYLES.labelError} > {errors.capabilities.message} </span>}
                    <p className="text-xs text-text-muted mt-2" >Seleccione las opciones que apliquen.</p>
                </div>

            </div>
            <LogoUpload />
        </div>
    )
}
