import { VERIFICATION_STATUS_TYPE, VERIFICATION_STATUS_TYPE_LABEL } from "@/src/interfaces/verification-status";

/**
 * POR DEFECTO Y EN DB
 */
export const VERIFICATION_STATUS_ID = {
    APPROVED: 1,
    PENDING_REVIEW: 2,
    UNDER_REVIEW: 3,
    REJECTED: 4,
    SUSPENDED: 5,
    ARCHIVED: 6,
    DRAFT: 7
} as const;


export const VERIFICATION_STATUS_MAP: Record<VERIFICATION_STATUS_TYPE, VERIFICATION_STATUS_TYPE_LABEL> = {
    APPROVED: "approved",
    PENDING_REVIEW: "pending",
    UNDER_REVIEW: "under-review",
    REJECTED: "rejected",
    SUSPENDED: "suspended",
    ARCHIVED: "archived",
    DRAFT: "draft",
} as const;