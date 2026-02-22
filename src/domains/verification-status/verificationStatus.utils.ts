
import { VERIFICATION_STATUS_TYPE, VERIFICATION_STATUS_TYPE_LABEL } from "@/src/interfaces/verification-status";
import { VERIFICATION_STATUS_MAP } from "./verificationStatus.constants";

/**
 * 
 * @param required VERIFICATION_STATUS_TYPE[]
 * @param status "approved" | "pending" | "under-review" | "rejected" | "suspended" | "archived" | "draft"
 * @returns 
 */

export const parseVerificationStatus = (
    required: VERIFICATION_STATUS_TYPE[], status?: string
): VERIFICATION_STATUS_TYPE | undefined => {
    if (!status) return undefined;

    if (required.length === 0) {
        const obj = Object.entries(VERIFICATION_STATUS_MAP).find(v => {
            if (v[1] === status) return v
        });

        return (obj ? obj[0] : undefined) as VERIFICATION_STATUS_TYPE | undefined
    } else {

        const filter = Object.entries(VERIFICATION_STATUS_MAP).filter((v: any[]) => {
            if (required.includes(v[0])) return v
        })

        const obj = filter.find(v => {
            if (v[1] === status) return v
        });

        return (obj ? obj[0] : undefined) as VERIFICATION_STATUS_TYPE | undefined
    }
};

// --------------------------------
/**
 * 
 * @param status VERIFICATION_STATUS_TYPE
 * @returns VERIFICATION_STATUS_TYPE_LABEL
 */

export const serializeVerificationStatus = (status?: VERIFICATION_STATUS_TYPE): VERIFICATION_STATUS_TYPE_LABEL | undefined => {
    if (!status) return undefined;
    return VERIFICATION_STATUS_MAP[status];
};