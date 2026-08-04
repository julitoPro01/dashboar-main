import { FloatingWrapper } from "@/src/shared/components/floating"
import { SelectableItem } from "@/src/shared/components/items"
import { RECORD_STATUS_LABEL, RECORD_STATUS_STYLES } from "@/src/shared/domains/status"
import { CellTitle } from "@/src/shared/table/core"
import { AppliedFilterLabel, OpenFilterButton, useRecordStatusFilter } from "@/src/shared/table/filters"
import { useBootDataStore } from "@/src/store/useBootDataStore"

export const RecordStatus = () => {

    const recStatus = useBootDataStore(v => v.bootRecordStatuses);

    const { value, isActive, handleChange, handleClose, handleOpen } = useRecordStatusFilter();

    return (
        <>

            <CellTitle title="Estado" >
                <OpenFilterButton
                    active={isActive}
                    onClick={handleOpen}
                />
            </CellTitle>

            {!isActive && !!value && <AppliedFilterLabel label={RECORD_STATUS_LABEL[value]} onClick={() => handleChange()} />}

            <FloatingWrapper open={isActive} onClose={handleClose} >
                <div className="p-2 w-40" >

                    <SelectableItem
                        label="Todos"
                        onClick={() => handleChange()}
                        isSelected={!value}
                        activeBullet
                    />
                    {
                        recStatus.map(v => (
                            <SelectableItem
                                key={v.id}
                                label={RECORD_STATUS_LABEL[v.name]}
                                onClick={() => handleChange(v.name)}
                                isSelected={v.name === value}
                                activeBullet
                                bulletStyle={RECORD_STATUS_STYLES[v.name].colorBg400}
                            />
                        ))
                    }
                </div>
            </FloatingWrapper>

        </>)
}
