import clsx from "clsx";
import Link from "next/link";
import type { MouseEvent } from "react";

const alignmentClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
} as const;

const variantClasses = {
  dynamic: "",
  primary: "bg-primary text-white font-medium",
  info: "text-sky-500 dark:text-sky-400 font-medium",
  secondary: "border border-border-strong text-text font-medium",
  ghost: "text-text font-medium",
  ghostDanger: "text-red-500 font-medium",
  outline: "border border-border text-text font-medium",
  danger: "bg-error-strong text-white font-medium",
  tab: "text-text-muted font-medium",
  tabLight: "text-text-muted font-medium",
  select: "text-text-muted border border-border-input bg-surface-light font-medium",
  input: "text-text border border-border-input bg-surface-light font-medium",
  basic: "text-text-muted font-medium",
  confirm: "text-primary dark:text-text-select border border-primary bg-surface-black/70 backdrop-blur-md/70 font-semibold",
} as const;

const activeText = "active:text-text/70";

const hoverClasses = {
  dynamic: "",
  primary: "hover:bg-primary/80 active:text-white/70",
  info: "hover:text-sky-400 dark:hover:text-sky-300",
  secondary: `hover:bg-hover ${activeText}`,
  ghost: `hover:bg-hover ${activeText}`,
  ghostDanger: `hover:bg-hover ${activeText}`,
  outline: `hover:bg-hover ${activeText}`,
  danger: "hover:bg-error",
  tab: `hover:text-text hover:bg-hover ${activeText}`,
  tabLight: `hover:text-text-strong hover:bg-active dark:hover:bg-surface-overlay ${activeText}`,
  select: `hover:border-blue-400 ${activeText}`,
  input: `hover:bg-hover ${activeText}`,
  basic: `hover:text-text ${activeText}`,
  confirm: "hover:bg-primary/10 hover:border-border-select hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-1 focus:ring-primary/30",
} as const;

const selectionClasses = {
  default: "focus:outline-none focus:ring-2 focus:ring-primary/40 bg-bg-select text-text-select border border-border-select/30 dark:border-border-strong/60",
  tab: "focus:outline-none focus:ring-2 focus:ring-primary/40 bg-bg-select text-text-strong shadow-sm",
  tabLight: "focus:outline-none focus:ring-2 focus:ring-primary/40 bg-primary/35 text-text-strong shadow-sm",
  underline: "focus:text-text-strong text-text-strong underline underline-offset-4 decoration-1",
  basic: "text-text-strong",
} as const;

const sizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  lg: "text-base",
} as const;

const radiusClasses = {
  full: "rounded-full",
  md: "rounded-md",
  sm: "rounded-sm",
  xs: "rounded-xs",
  none: "rounded-none",
} as const;

export interface ButtonProps {
  padding?: string;
  variant?: keyof typeof variantClasses;
  select?: keyof typeof selectionClasses;
  position?: keyof typeof alignmentClasses;
  active?: boolean;
  loading?: boolean;
  size?: keyof typeof sizeClasses;
  children: React.ReactNode;
  className?: string;
  href?: string;
  disabled?: boolean;
  rounded?: keyof typeof radiusClasses;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onAnimationEnd?: () => void;
  id?: string;
  type?: "button" | "reset" | "submit";
  formId?: string;
  title?: string;
  ariaLabel?: string;
}

const getButtonClassName = ({
  variant = "basic",
  size = "sm",
  position = "center",
  select = "basic",
  active,
  rounded = "md",
  padding,
  className,
}: Pick<ButtonProps, "variant" | "size" | "position" | "select" | "active" | "rounded" | "padding" | "className">) =>
  clsx(
    "inline-flex items-center gap-2 transition-all duration-200 cursor-pointer select-none disabled:cursor-not-allowed disabled:opacity-65",
    alignmentClasses[position],
    variantClasses[variant],
    select === "underline" ? "hover:text-text hover:underline hover:underline-offset-4 hover:decoration-1" : hoverClasses[variant],
    padding ?? (size === "xs" ? "px-3 py-1.5" : size === "sm" ? "px-4 py-2" : "px-5 py-2.5"),
    sizeClasses[size],
    active && selectionClasses[select],
    radiusClasses[rounded],
    className,
  );

export const Button = ({
  variant,
  size,
  position,
  children,
  className,
  href,
  disabled = false,
  active = false,
  select,
  rounded,
  loading = false,
  type = "button",
  formId,
  title,
  ariaLabel,
  onClick,
  id,
  onAnimationEnd,
  padding,
}: ButtonProps) => {
  const classNameForButton = getButtonClassName({
    variant,
    size,
    position,
    select,
    active,
    rounded,
    padding,
    className,
  });

  if (href) {
    return (
      <Link
        href={href}
        className={classNameForButton}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        aria-disabled={disabled || loading}
        tabIndex={disabled || loading ? -1 : undefined}
        title={title}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      id={id}
      type={type}
      form={formId}
      onAnimationEnd={onAnimationEnd}
      onClick={onClick}
      className={classNameForButton}
      disabled={disabled || loading}
      title={title}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      aria-pressed={active}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
};

const Spinner = () => (
  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
    <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </svg>
);
