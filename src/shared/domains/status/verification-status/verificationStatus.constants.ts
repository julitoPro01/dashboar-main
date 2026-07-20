import { VerificationStatusDb, VerificationStatusValue } from "./type";

/**
 * POR DEFECTO Y EN DB
 */
export const VERIFICATION_STATUS_ID = {
    DRAFT: 1,
    IN_REVIEW: 2,
    APPROVED: 3,
    REJECTED: 4,
    SUSPENDED: 5,
    ARCHIVED: 6,
} as const;


export const VERIFICATION_STATUS: Record<VerificationStatusDb, VerificationStatusValue> = {
    DRAFT: "draft",
    IN_REVIEW: "in_review",
    REJECTED: "rejected",
    APPROVED: "approved",
    SUSPENDED: "suspended",
    ARCHIVED: "archived",
} as const;