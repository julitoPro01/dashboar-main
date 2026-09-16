import { FieldErrors, FormState, UseFormRegister, } from "react-hook-form"
import clsx from "clsx";
import { FaLocationDot } from "react-icons/fa6";
import { LogoUpload } from "./field-supplier/Logo.Upload";
import { RelacionModeSelect } from "./field-supplier/RelacionMode.select";
import { INPUT_FIELD_STYLE } from "@/src/shared/theme/inputField";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlineStorefront } from "react-icons/md";
import { SupplierForm as SupplierFormType } from "../../types";
import { SUPPLIER_CAPABILITIES_LABELS } from "../../constants";
import { FormCard, Input, Textarea } from "@/src/shared/form";

interface Props {
    register: UseFormRegister<SupplierFormType>;
    errors: FieldErrors<SupplierFormType>;
    dirty?: FormState<SupplierFormType>['dirtyFields'];
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

                <Input
                    label="Nombre del proveedor"
                    labelOption={{ type: "top", required: true }}
                    isDirty={dirty?.name}
                    error={errors.name?.message}
                    placeholder="Ej: Industrias Globales S.A."
                    {...register("name")}
                />

                <Input
                    label="Dirección Fiscal"
                    labelOption={{ type: "top", required: true }}
                    isDirty={dirty?.address}
                    error={errors.address?.message}
                    placeholder="Calle 123, Ciudad de Lima, CP 01000"
                    {...register("address")}
                    fieldIcon={<FaLocationDot />}
                />
                {/* Description Section */}
                <Textarea
                    label="Descripción"
                    labelOption={{ type: "top", required: true }}
                    placeholder="Breve descripción de los productos o servicios ofrecidos por este proveedor..."
                    isDirty={dirty?.description}
                    error={errors.description?.message}
                    {...register("description")}
                />

                <LogoUpload />

            </div>

            <FormCard title="Comercial" titleIcon={<MdOutlineStorefront size={22} className="text-primary" />}>

                {/* TODO: PARA SUPER-ADMIN */}
                <RelacionModeSelect register={register} errorMsg={errors.relationMode?.message} dirty={dirty?.relationMode} />

                <div className="space-y-2">
                    <span className={`${INPUT_FIELD_STYLE.label} flex flex-col gap-1`}>
                        <span className={`${INPUT_FIELD_STYLE.isRequired} text-slate-600 dark:text-slate-300`}>Capacidades</span>
                        <span className="text-xs text-text-muted font-normal" >Seleccione las opciones que apliquen.</span>
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
            </FormCard>

        </div>
    )
}
