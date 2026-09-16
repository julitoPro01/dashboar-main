
import { FloatingWrapper } from "@/src/shared/components/floating";
import { SelectableItem } from "@/src/shared/components/items";
import { RECORD_STATUS_LABEL, RECORD_STATUS_OPTIONS, RECORD_STATUS_STYLE } from "@/src/shared/domains/recordStatus";
import { CellTitle } from "@/src/shared/table/core";
import { AppliedFilterLabel, OpenFilterButton, useRecordStatusFilter } from "@/src/shared/table/filters";

export const RecordStatus = () => {

    const { value, isActive, handleChange, handleClose, handleOpen } = useRecordStatusFilter();

    return (
        <>

            <CellTitle title="Estado" >
                <OpenFilterButton
                    active={isActive}
                    onClick={handleOpen}
                />
            </CellTitle>

            {!isActive && value && <AppliedFilterLabel label={RECORD_STATUS_LABEL[value]} onClick={() => handleChange()} />}

            <FloatingWrapper open={isActive} onClose={handleClose} >
                <div className="p-2 w-40" >

                    <SelectableItem
                        label="Todos"
                        onClick={() => handleChange()}
                        isSelected={!value}
                        activeBullet
                    />
                    {
                        RECORD_STATUS_OPTIONS.map(v => (
                            <SelectableItem
                                key={v.value}
                                label={v.label}
                                onClick={() => handleChange(v.value)}
                                isSelected={v.value === value}
                                activeBullet
                                bulletStyle={RECORD_STATUS_STYLE[v.value]}
                            />
                        ))
                    }
                </div>
            </FloatingWrapper>

        </>
    )
}

