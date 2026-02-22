import { RECORD_STATUS_TYPE, RECORD_STATUS_TYPE_QUERY_LABEL } from "@/src/interfaces/record-status/recordStatus.type";
import { RECORD_STATUS_QUERY_LABELS } from "./recordStatus.constans";

/**
 * 
 * @param statusLabel RECORD_STATUS_TYPE_QUERY_LABEL
 * @returns RECORD_STATUS_TYPE | undefined
 */

export const parseRecordStatus =(statusLabel?:string):RECORD_STATUS_TYPE | undefined=>{
    if(!statusLabel) return undefined;

    const a = Object.entries(RECORD_STATUS_QUERY_LABELS).find((v)=>(v[1] === statusLabel));

    return (a ? a[0] : undefined) as RECORD_STATUS_TYPE | undefined;
}

// --------------------------------
/**
 * 
 * @param status VERIFICATION_STATUS_TYPE
 * @returns VERIFICATION_STATUS_TYPE_LABEL
 */

export const serializeRecordStatus = (status?: RECORD_STATUS_TYPE): RECORD_STATUS_TYPE_QUERY_LABEL | undefined => {
    if (!status) return undefined;
    return RECORD_STATUS_QUERY_LABELS[status];
};