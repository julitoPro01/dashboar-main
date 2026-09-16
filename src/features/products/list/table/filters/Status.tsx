import { FloatingWrapper } from "@/src/shared/components/floating"
import { RECORD_STATUS_LABEL, RECORD_STATUS_OPTIONS } from '@/src/shared/domains/recordStatus';
import { VERIFICATION_STATUS_ID_LABEL, VERIFICATION_STATUS_OPTIONS } from "@/src/shared/domains/verificationStatus";
import { Select } from "@/src/shared/form";
import { CellTitle } from "@/src/shared/table/core"
import { AppliedFilterLabel, OpenFilterButton, useRecordStatusFilter } from "@/src/shared/table/filters"
import { useStore } from "@/src/store/useStore";

export const Status = () => {

    const setFilter = useStore(v => v.setProductFilters);
    const verificationId = useStore(v => v.productFilters.verificationStatusId);

    const { value, isActive, handleChange: handleStatusChange, handleClose, handleOpen } = useRecordStatusFilter();

    const handleVerificationChange = (id?: number) => {
        setFilter({ verificationStatusId: id })
    }

    const label = () => {
        let l: string[] = [];

        if (value)
            l.push(RECORD_STATUS_LABEL[value])
        if (verificationId)
            l.push(VERIFICATION_STATUS_ID_LABEL[verificationId])

        return l.join(" - ");
    }

    return (
        <>

            <CellTitle title="Estado" >
                <OpenFilterButton
                    active={isActive}
                    onClick={handleOpen}
                />
            </CellTitle>

            {!isActive && (value || verificationId) && <AppliedFilterLabel label={label()} onClick={() => {
                handleStatusChange()
                handleVerificationChange()
            }} />}

            <FloatingWrapper open={isActive} onClose={handleClose} >

                <div className="p-4 w-60 space-y-2 text-start" >

                    <span className="text-text-muted font-semibold tracking-wider text-xs">Estado</span>
                    <Select
                        fieldSize="sm"
                        placeholder="Todos"
                        value={value}
                        onChange={({ target }) => { handleStatusChange(target.value ? target.value as any : undefined) }}
                        options={
                            RECORD_STATUS_OPTIONS
                        }

                    />

                    <span className="text-text-muted font-semibold tracking-wider text-xs">Verificación</span>
                    <Select
                        fieldSize="sm"
                        placeholder="Todos"
                        value={verificationId}
                        onChange={({ target }) => { handleVerificationChange(target.value ? +target.value : undefined) }}
                        options={VERIFICATION_STATUS_OPTIONS.map(v => ({ label: v.label, value: v.id }))} />

                </div>
            </FloatingWrapper>

        </>)
}
