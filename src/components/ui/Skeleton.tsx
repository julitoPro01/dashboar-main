import clsx from "clsx";

export function Skeleton({ className, rounded = "rounded-md" }:{className?:string,rounded?:string}) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden bg-slate-300 dark:bg-slate-700",
        rounded,
        className
      )}
    >
      <div className="absolute inset-0 animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
    </div>
  );
}
