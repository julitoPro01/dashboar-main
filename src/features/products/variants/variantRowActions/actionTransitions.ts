import { RECORD_STATUS_VALUE, RecordStatusDb } from "@/src/shared/domains/recordStatus"

const edit: RecordStatusDb[] = [
    RECORD_STATUS_VALUE.DRAFT,
    RECORD_STATUS_VALUE.ACTIVE,
    RECORD_STATUS_VALUE.INACTIVE];

const inventory_channel: RecordStatusDb[] = [
    RECORD_STATUS_VALUE.ACTIVE,
    RECORD_STATUS_VALUE.INACTIVE
]

const setMain: RecordStatusDb[] = [
    RECORD_STATUS_VALUE.ACTIVE
]



export const editActionTransitions = {
    edit,
    setMain,
    inventory: inventory_channel,
    channel: inventory_channel,
}