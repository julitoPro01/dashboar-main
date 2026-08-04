type BadgeVariant = "default" | "info" | "success" | "warning" | "darkInfo" | "surface";

const variants: Record<BadgeVariant, string> = {
  default: "bg-slate-100 text-slate-600",
  info: "bg-blue-100 text-blue-600",
  success: "bg-green-100 text-green-600",
  warning: "bg-yellow-100 text-yellow-600",
  darkInfo:" text-slate-500 dark:text-blue-300 bg-slate-100 dark:bg-blue-900/30",
  surface:"inline-flex items-center rounded-md border border-border bg-surface text-xs font-medium text-foreground"
};

export const Badge = ({ children, variant = "default" }: {
  children: React.ReactNode;
  variant?: BadgeVariant;
}) => {
  return (
    <span className={`text-xs font-semibold  px-2.5 py-0.5 rounded-md ${variants[variant]}`}>
      {children}
    </span>
  );
};