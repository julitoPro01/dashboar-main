import clsx from "clsx";

export function Skeleton({ className, rounded = "rounded-md" }:{className?:string,rounded?:string}) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden bg-slate-200/80 dark:bg-slate-500/50",
        rounded,
        className
      )}
    >
      <div className="absolute inset-0 animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/40 dark:via-white/5 to-transparent" />
    </div>
  );
}
