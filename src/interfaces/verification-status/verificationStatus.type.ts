import { VerificationStatusType } from "@/src/generated/prisma/enums";

//-------
export type VERIFICATION_STATUS_TYPE = VerificationStatusType;
export type VERIFICATION_STATUS_TYPE_LABEL = "approved" |
    "pending" |
    "under-review" |
    "rejected" |
    "suspended" |
    "archived" |
    "draft"
//------------

export interface VerificationStatus {
    id: number;
    name: VerificationStatusType;
    description?: string | null;
}
