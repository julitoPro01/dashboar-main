import { dateFormatter } from "../../utils";

export const DateColumn = ({ createdAt, updatedAt }: { createdAt: Date, updatedAt: Date | null }) => (
  <div className="flex flex-col items-end leading-tight">

    <span>
      {dateFormatter.format(createdAt)}
    </span>

    {updatedAt && (
      <span className="text-xs text-slate-400 dark:text-slate-400">
        Editado: {dateFormatter.format(updatedAt)}
      </span>
    )}

  </div>
);