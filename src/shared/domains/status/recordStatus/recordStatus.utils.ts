import { PARENT_RESTRICTED_STATUS, RECORD_STATUS, RECORD_STATUS_LABEL, RECORD_STATUS_TRANSITIONS } from "./recordStatus.constans";
import { RecordStatusDb, RecordStatusLabel, RecordStatusValue } from "./type";

/**
 * 
 * @param statusValue 
 * @returns RecordStatusDb | undefined
 */

export const parseRecordStatus = (statusValue?: RecordStatusValue): RecordStatusDb | undefined => {
    if (!statusValue) return undefined;

    const a = Object.entries(RECORD_STATUS).find((v) => (v[1] === statusValue));

    return (a ? a[0] : undefined) as RecordStatusDb | undefined;
}

export const normalizeRecordStatusFromURL = (status?: string | null): RecordStatusValue | undefined => {
    if (!status) return undefined;
    const a = Object.values(RECORD_STATUS).find(v => v === status);
    return a ? a : undefined;
}

// --------------------------------
/**
 * 
 * @param status RecordStatusDb
 * @returns RecordStatus | undefined
 */

export const serializeRecordStatus = (status?: RecordStatusDb): RecordStatusValue | undefined => {
    if (!status) return undefined;
    return RECORD_STATUS[status];
};

// --------------------------------
/**
 * 
 * @param status RecordStatusDb
 * @returns RecordStatusLabel | undefined
 */

export const serializeRecordStatusLabel = (status?: RecordStatusDb): RecordStatusLabel | undefined => {
    if (!status) return undefined;
    return RECORD_STATUS_LABEL[status];
};


export const getAvailableStatuses = (current: RecordStatusDb, parent?: RecordStatusDb):RecordStatusDb[] => {

    const statuses = parent && PARENT_RESTRICTED_STATUS[parent];

    return statuses || RECORD_STATUS_TRANSITIONS[current];

}