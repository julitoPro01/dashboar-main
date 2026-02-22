import { FORM_STYLES } from "@/src/constants";
import { UpsertProductForm } from "@/src/features/product/type/upsertProductForm.type";
import clsx from "clsx"
import { useFormContext } from "react-hook-form";



export const NameField = () => {

    const { register, formState: { errors, dirtyFields } } = useFormContext<UpsertProductForm>();

    const isDirty = dirtyFields.name;
    const isError = errors.name;

    return (
        <div>
            <label className={FORM_STYLES.label}>Nombre* </label>
            <input
                className={clsx(
                    FORM_STYLES.base,
                    {
                        [FORM_STYLES.states.error]: isError,

                        [FORM_STYLES.states.dirty]: !isError && isDirty,

                        [FORM_STYLES.states.normal]: !isError && !isDirty
                    }
                )}
                {...register("name")}
            />

            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>
    )
}


export const ShortDescriptionField = () => {
    const { register, formState: { errors, dirtyFields } } = useFormContext<UpsertProductForm>()

    const isDirty = dirtyFields.shortDescription;
    const isError = errors.shortDescription;

    return (
        <div>
            <label className={FORM_STYLES.label}>Descripción corta*</label>
            <input
                className={clsx(FORM_STYLES.base,
                    {
                        [FORM_STYLES.states.error]: isError,
                        [FORM_STYLES.states.dirty]: !isError && isDirty,
                        [FORM_STYLES.states.normal]: !isError && !isDirty
                    })}
                {...register("shortDescription")}
            />
            {errors.shortDescription && <p className="text-xs text-red-500 mt-1">{errors.shortDescription.message}</p>}

        </div>
    )
}


export const LongDescriptionField = () => {
    const { register, formState: { dirtyFields } } = useFormContext<UpsertProductForm>()

    const isDirty = dirtyFields.longDescription;

    return (
        <div >
            <label className={FORM_STYLES.label}>Descripción larga</label>
            <textarea
                className={clsx(FORM_STYLES.base, {
                    [FORM_STYLES.states.normal]: !isDirty,
                    [FORM_STYLES.states.dirty]: isDirty
                })}
                {...register("longDescription")}
            />
        </div>
    )
}

interface SelectSupplierProps {
    suppliers: {name:string,id:number,capability:string}[];
}
export const SelectSupplierField = ({ suppliers }: SelectSupplierProps) => {
    const { register, formState: { errors, dirtyFields } } = useFormContext<UpsertProductForm>()

    const isDirty = dirtyFields.supplierId;
    const isError = errors.supplierId;

    return (
        <div>
            <div >
                <label className={FORM_STYLES.label}>Proveedor*</label>
            </div>
            <select
                className={clsx(FORM_STYLES.base,
                    {
                        [FORM_STYLES.states.error]: isError,
                        [FORM_STYLES.states.dirty]: !isError && isDirty,
                        [FORM_STYLES.states.normal]: !isError && !isDirty
                    })}
                {...register("supplierId", { setValueAs: v => v === "" ? undefined : Number(v) })}
            >
                <option className="text-gray-500" value={0}>--- Seleccionar ---</option>
                {
                    suppliers.map(val => (
                        <option key={val.id} value={val.id}>
                            {val.name} {val.capability}
                        </option>
                    ))
                }
            </select>
            {errors.supplierId && <p className="text-xs text-red-500 mt-1">{errors.supplierId.message}</p>}
        </div>
    )
}

// interface SelectStatusProps {
//     productStatuses: ProductStatus[];
// }
// export const SelectStatusField = ({ productStatuses }: SelectStatusProps) => {

//     const { register, formState: { errors, dirtyFields } } = useFormContext<UpsertProductForm>()

//     const isDirty = dirtyFields.statusId;
//     const isError = errors.statusId;

//     return (
//         <div>
//             <label className={FORM_STYLES.label}>Estado del producto*</label>
//             <select
//                 className={clsx(FORM_STYLES.base,
//                     {
//                         [FORM_STYLES.states.error]: isError,
//                         [FORM_STYLES.states.dirty]: !isError && isDirty,
//                         [FORM_STYLES.states.normal]: !isError && !isDirty
//                     })}

//                 {...register("statusId", { setValueAs: v => v === "" ? undefined : Number(v) })}
//             >
//                 <option className="text-gray-500" value={0}>--- Seleccionar ---</option>
//                 {
//                     productStatuses.map(val => (
//                         <option key={val.id} value={val.id}>
//                             {productStatusConfig[val.name].label}
//                         </option>
//                     ))
//                 }
//             </select>
//             {errors.statusId && <p className="text-xs text-red-500 mt-1">{errors.statusId.message}</p>}
//         </div>
//     )
// }

