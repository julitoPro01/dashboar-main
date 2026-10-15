import { VariantForm } from "@/src/features/products/types";
import { getAvailableStatuses, RECORD_STATUS_ID, RECORD_STATUS_LABEL } from "@/src/shared/domains/recordStatus";
import { Select } from "@/src/shared/form";
import { useStore } from "@/src/store/useStore";
import { useFormContext, useFormState } from "react-hook-form";

export const RecordStatus = () => {

    const recordStatus = useStore(v => v.variantRecordStatus);

    const { register, control } = useFormContext<VariantForm>();
    const { errors, dirtyFields } = useFormState({ control, name: "operationStatus" });


    const statusOptions = getAvailableStatuses(recordStatus).map(v => ({
        value: RECORD_STATUS_ID[v],
        label: RECORD_STATUS_LABEL[v]
    }));

    return (
        <div className="grid grid-cols-3 gap-4 items-center rounded-md border border-border-subtle bg-bg-soft-blue px-3 py-2.5">
            <div className="col-span-1">
                <span className="block text-sm font-semibold text-primary">
                    Estado del registro
                </span>

                <span className="block text-xs text-text-muted">
                    Control de ciclo de vida interno
                </span>
            </div>
            <div className="col-span-2">
                <Select
                    isValueSelected={true}
                    fieldSize="sm"
                    options={statusOptions}
                    roundedSize="sm"
                    fieldClass="bg-surface-black"
                    positionError="floating"
                    error={errors.operationStatus?.recordStatusId?.message}
                    isDirty={dirtyFields.operationStatus?.recordStatusId}
                    {...register("operationStatus.recordStatusId", { valueAsNumber: true })}
                />
            </div>
        </div>
    )
}
