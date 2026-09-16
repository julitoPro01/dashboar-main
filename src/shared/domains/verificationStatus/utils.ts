

/**
 * 
 * @param required VERIFICATION_STATUS_TYPE[]
 * @param status "approved" | "pending" | "under-review" | "rejected" | "suspended" | "archived" | "draft"
 * @returns 
 */

import { VerificationStatusDb, VerificationStatusValue } from "./type";
import { VERIFICATION_STATUS } from "./constants";

export const parseVerificationStatus = (
    required: VerificationStatusDb[], verif?: string
): VerificationStatusDb | undefined => {
    if (!verif) return undefined;

    if (required.length === 0) {
        const obj = Object.entries(VERIFICATION_STATUS).find(v => {
            if (v[1] === verif) return v
        });

        return (obj ? obj[0] : undefined) as VerificationStatusDb | undefined
    } else {

        const filter = Object.entries(VERIFICATION_STATUS).filter((v: any[]) => {
            if (required.includes(v[0])) return v
        })

        const obj = filter.find(v => {
            if (v[1] === verif) return v
        });

        return (obj ? obj[0] : undefined) as VerificationStatusDb | undefined
    }
};

// --------------------------------
/**
 * 
 * @param status VerificationStatusDb
 * @returns VerificationStatusValue | undefined
 */

export const serializeVerificationStatus = (status?: VerificationStatusDb): VerificationStatusValue | undefined => {
    if (!status) return undefined;
    return VERIFICATION_STATUS[status];
};