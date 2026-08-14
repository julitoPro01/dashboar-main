import clsx from "clsx";

type Type = "basic" | "default";

type Rounded = "sm" | "md" | "lg" | "xl"


const Style: Record<Type, string> = {
  basic: "absolute inset-0",
  default: "relative overflow-hidden bg-slate-300/80 dark:bg-slate-500/20"
}

interface Props {
  type?: "basic" | "default",
  className?: string, rounded?: Rounded
}



export function Skeleton({ type = "default", className, rounded }: Props) {

  const style = clsx(
    Style[type],
    type === "default" ? `rounded-${rounded ?? "md"}` : "",
    className
  )

  return (
    <div
      className={style}
    >
      <div className="absolute inset-0 animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/40 dark:via-white/5 to-transparent" />
    </div>
  );
}
