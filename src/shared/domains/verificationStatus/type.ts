import { VerificationStatus } from "@/src/generated/prisma/client";
import { VerificationStatusType } from "@/src/generated/prisma/enums";

//-------
export type VerificationStatusDb = VerificationStatusType;

export type VerificationStatusValue =
    "approved" |
    "in_review" |
    "rejected" |
    "suspended" |
    "archived" |
    "draft"
//------------

export type VerificationStatusEntity = VerificationStatus;