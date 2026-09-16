import { RECORD_STATUS_LABEL, RECORD_STATUS_STYLE } from "./constans";
import { RecordStatusDb } from "./type";

interface RecordStatusBadgeProps {
  status: RecordStatusDb;
}

export const RecordStatusBadge = ({
  status,
}: RecordStatusBadgeProps) => {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-md px-2 py-0.5 text-xs font-medium ${RECORD_STATUS_STYLE[status]}`}
    >
      {RECORD_STATUS_LABEL[status]}
    </span>
  );
};