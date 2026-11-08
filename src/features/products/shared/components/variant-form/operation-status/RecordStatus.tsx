import { VariantForm } from "@/src/features/products/types";
import { RECORD_STATUS_ID, RECORD_STATUS_TRANSITIONS_OPTIONS, RecordStatusDb } from "@/src/shared/domains/recordStatus";
import { useFormContext, useFormState, useWatch } from "react-hook-form";

export const RecordStatus = ({ isEdit = false }: { isEdit?: boolean }) => {

    const recordStatusId = Number(useWatch({ name: "operationStatus.recordStatusId" }));

    // Permitimos selección solo si esta en Borrador
    const isStatusDraft = !isEdit && (recordStatusId === RECORD_STATUS_ID.DRAFT || recordStatusId === RECORD_STATUS_ID.ACTIVE);

    return (
        <div className="space-y-2 rounded-md border border-border-subtle bg-bg-soft-blue px-3 py-2.5">
            <div className="">
                <span className="block text-sm font-semibold text-primary">
                    Estado del registro
                </span>

                <span className="block text-xs text-text-muted">
                    {isEdit ? "Cambia el estado desde las acciones de la variante" : "Control de ciclo de vida interno"}
                </span>
            </div>

            <div className="flex flex-col gap-2">
                {isStatusDraft
                    ? <Select selectedId={recordStatusId} />
                    : <Label statusId={recordStatusId} />
                }
            </div>

        </div>
    )
}


const Select = ({ selectedId }: { selectedId: number }) => {

    const { control, setValue } = useFormContext<VariantForm>();
    const { errors } = useFormState({ control, name: "operationStatus.recordStatusId" });

    const status = RECORD_STATUS_TRANSITIONS_OPTIONS.DRAFT;
    return (
        <>
            {status.map(v => (

                <div className="relative" key={v.id}>
                    <input
                        className={"peer sr-only "}
                        type="radio"
                        id={`statu-${v.value}`}
                        checked={selectedId === v.id}
                        name="recordStatus"
                        value={v.id}
                        onChange={({ target }) => {
                            setValue("operationStatus.recordStatusId", Number(target.value), {
                                shouldValidate: true, shouldDirty: true
                            })
                        }}
                    />
                    <label htmlFor={`statu-${v.value}`} className="flex items-center gap-1 px-3 py-1 rounded-full text-text-muted border border-border-input bg-surface-light text-sm font-medium cursor-pointer hover:border-blue-400 transition-all select-none
                            select-peer" >
                       <span>{v.label}</span> -
                        <span className="text-xs">{v.desc}</span>
                    </label>
                </div>

            ))}

            {errors.operationStatus?.recordStatusId &&
                <span className="text-xs text-error-strong"> {errors.operationStatus.recordStatusId.message} </span>
            }
        </>
    )
}

const Label = ({ statusId }: { statusId: number }) => {

    const recordStatus = (Object.entries(RECORD_STATUS_ID)
        .find(([_, valueId]) => valueId === statusId)?.[0] as RecordStatusDb | undefined) || "DRAFT";

    const selectedStatus = RECORD_STATUS_TRANSITIONS_OPTIONS[recordStatus].find(v => v.value === recordStatus)


    return (
        <div className="ml-auto text-end text-sm bg-bg-soft-blue py-1 px-2 rounded-full border border-border-select">
            <span> {selectedStatus?.label}: </span>
            <span className="text-text-muted"> {selectedStatus?.desc} </span>
        </div>
    )
}