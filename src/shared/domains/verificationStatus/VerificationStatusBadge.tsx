import { VERIFICATION_STATUS_LABEL, VERIFICATION_STATUS_STYLE } from "./constants";
import { VerificationStatusDb } from "./type";

interface VerificationBadgeProps {
    status: VerificationStatusDb;
}


export const VerificationStatusBadge = ({
    status,
}: VerificationBadgeProps) => {
    return (
        <span
            className={`inline-flex w-fit items-center rounded-md px-2 py-0.5 text-xs font-medium ${VERIFICATION_STATUS_STYLE[status]}`}
        >
            {VERIFICATION_STATUS_LABEL[status]}
        </span>
    );
};