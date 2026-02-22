import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { UpsertVariantForm } from "../../../type/upsertVariantForm.type";
import { FORM_STYLES } from "@/src/constants";
import { productStatusConfig } from "../../../utils";


export const PriceField = () => {

    const { register, formState: { errors, dirtyFields } } = useFormContext<UpsertVariantForm>();

    const isError = errors.price;
    const isDirty = dirtyFields.price;

    return (
        <div>
            <div className="flex gap-2">
                <label className={FORM_STYLES.label + " " + FORM_STYLES.isRequired}>Precio</label>
            </div>
            <input
                type="number"
                step={0.01}
                className={clsx(FORM_STYLES.base, {
                    [FORM_STYLES.states.dirty]: isDirty && !isError,
                    [FORM_STYLES.states.error]: isError,
                    [FORM_STYLES.states.normal]: !isDirty && !isError
                })}
                {...register("price",
                    {
                        required: "El precio es requerido",
                        min: { value: 0.01, message: "El precio debe ser mayor a 0.01" }, max: { value: 1000000, message: "El precio no puede exceder 50,000" },
                        valueAsNumber: true
                    })}
            />
            {errors.price && <p className={FORM_STYLES.labelError}>{errors.price.message}</p>}
        </div>)
}


export const DiscountField = () => {

    const { register, formState: { dirtyFields, errors } } = useFormContext<UpsertVariantForm>();

    const isDirty = dirtyFields.discount;
    const isError = errors.discount?.message;

    return (
        <div>
            <div className="flex gap-2">
                <label className={FORM_STYLES.label}>Descuento</label>
            </div>
            <input
                type="number"
                className={clsx(FORM_STYLES.base, {
                    [FORM_STYLES.states.error]: !!isError,
                    [FORM_STYLES.states.dirty]: !isError && isDirty,
                    [FORM_STYLES.states.normal]: !isError && !isDirty
                })}
                {...register(`discount`,
                    {
                        min: { value: 0, message: "El descuento no es válido" }, max: { value: 100, message: "El descuento no puede exceder 100%" },
                        setValueAs: (v) => {
                            const num = Number(v);
                            return isNaN(num) ? 0 : num; // Convertir NaN a 0
                        },
                    }
                )}
            />
            {isError && <p className={FORM_STYLES.labelError}>{isError}</p>}

        </div>
    )
}


export const StockQuantityField = () => {
    const { register, formState: { dirtyFields, errors } } = useFormContext<UpsertVariantForm>();

    const isDirty = dirtyFields.stockQuantity;
    const isError = errors.stockQuantity?.message;

    return (
        <div>
            <div className="flex gap-2">
                <label className={FORM_STYLES.label + " " + FORM_STYLES.isRequired}>Stock </label>
            </div>
            <input
                type="number"
                className={clsx(FORM_STYLES.base, {
                    [FORM_STYLES.states.error]: !!isError,
                    [FORM_STYLES.states.dirty]: !isError && isDirty,
                    [FORM_STYLES.states.normal]: !isError && !isDirty
                })}
                {...register("stockQuantity", {
                    required: "El stock es requerido",
                    valueAsNumber: true,
                    min: { value: 0, message: "El stock debe ser igual o mayor a 0" }, max: { value: 1000000, message: "El stock no puede exceder 20,000" }
                })}
            />
            {isError && <p className={FORM_STYLES.labelError}>{isError}</p>}

        </div>
    )
}

//TODO: No se esta usando - Implementar validación con StockQuantity
export const MinStockField = () => {
    const { register, formState: { dirtyFields, errors } } = useFormContext<UpsertVariantForm>();

    const isDirty = dirtyFields.minStock;
    const isError = errors.minStock?.message;

    return (
        <div>
            <div className="flex gap-2">
                <label className={FORM_STYLES.label}>Stock Mínimo </label>
            </div>
            <input
                type="number"
                className={clsx(FORM_STYLES.base, {
                    [FORM_STYLES.states.error]: !!isError,
                    [FORM_STYLES.states.dirty]: !isError && isDirty,
                    [FORM_STYLES.states.normal]: !isError && !isDirty
                })}
                {...register("minStock", {
                    valueAsNumber: true,
                    min: { value: 0, message: "El stock mínimo debe ser igual o mayor a 0" }, max: { value: 100000, message: "El stock no puede exceder 10,000" }
                })}
            />
            {isError && <p className={FORM_STYLES.labelError}>{isError}</p>}
        </div>
    )
}

interface Props {
    variantStatuses: any[] //TODO: -----
}

export const SelectStatusFiedl = ({ variantStatuses }: Props) => {
    const { register, formState: { errors, dirtyFields } } = useFormContext<UpsertVariantForm>();

    const isDirty = dirtyFields.recordStatusId;
    const isError = errors.recordStatusId;

    return (
        <div>
            <label className={FORM_STYLES.label + " " + FORM_STYLES.isRequired}>Estado del producto</label>
            <select
                className={clsx(FORM_STYLES.base,
                    {
                        [FORM_STYLES.states.error]: isError,
                        [FORM_STYLES.states.dirty]: !isError && isDirty,
                        [FORM_STYLES.states.normal]: !isError && !isDirty
                    })}

                {...register("recordStatusId", {
                    required: "El estado es requerido",
                    min: { value: 1, message: "El estado no es válido" },
                    valueAsNumber: true
                })}
            >
                <option className="text-gray-500" value={0}>--- Seleccionar ---</option>
                {
                    variantStatuses.map(val => (
                        <option key={val.id} value={val.id}>
                            {productStatusConfig[val.name].label}
                        </option>
                    ))
                }
            </select>
            {errors.recordStatusId && <p className={FORM_STYLES.labelError}>{errors.recordStatusId.message}</p>}
        </div>
    )
}



