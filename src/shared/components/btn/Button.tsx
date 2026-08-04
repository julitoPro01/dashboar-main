import clsx from "clsx";
import Link from "next/link";
import { MouseEvent } from "react";

const positions = { start: "justify-start", center: "justify-center", end: "justify-end" };
const base = `
inline-flex items-center gap-2
font-medium
transition-colors duration-200
cursor-pointer
disabled:opacity-65 select-none
disabled:cursor-not-allowed
`

const variants = {
  dynamic: "",
  primary: `bg-primary text-white`,
  secondary: `border border-border-strong text-text `,
  ghost: `text-text`,
  ghostDanger: 'text-red-500',
  outline: `border border-border text-text`,
  danger: `bg-error-strong text-white`,
  tab: `text-text-muted`,
  tabLight: `text-text-muted`,
  select: `
  text-text-muted border border-border-input bg-surface-light
  cursor-pointer select-peer`,
  input: `text-text border border-border-input bg-surface-light`,
  basic: `text-text-muted`
}

const active = "active:text-text/70";

const hover = {
  dynamic: "",
  primary: `hover:bg-primary/80 active:text-white/70`,
  secondary: ` hover:bg-hover ${active}`,
  ghost: `hover:bg-hover ${active}`,
  ghostDanger: `hover:bg-hover ${active}`,
  outline: `hover:bg-hover ${active}`,
  danger: `hover:bg-error`,
  tab: `hover:text-text hover:bg-hover ${active}`,
  tabLight: `hover:text-text-strong hover:bg-active dark:hover:bg-surface-overlay ${active}`,
  select: `hover:border-blue-400 ${active}`,
  input: `thover:bg-hover ${active}`,
  underline: `hover:text-text hover:underline hover:underline-offset-4 hover:decoration-1 ${active}`,
  basic: `hover:text-text ${active}`
}


const sizes = (padding?: string) => ({

  xs: `${padding || "px-3 py-1.5"} text-xs`,
  sm: `${padding || "px-4 py-2"} text-sm`,
  lg: `${padding || "px-5 py-2.5"} text-base`
})

const selected = {
  default: "focus:outline-none focus:ring-2 focus:ring-primary/40 bg-bg-select text-text-select border border-border-select/30 dark:border-border-strong/60",
  tab: "focus:outline-none focus:ring-2 focus:ring-primary/40 bg-bg-select text-text-strong shadow-sm",
  tabLight: "focus:outline-none focus:ring-2 focus:ring-primary/40 bg-primary/35 text-text-strong shadow-sm",
  underline: "focus:text-text-strong text-text-strong underline underline-offset-4 decoration-1",
  basic: "text-text-strong"
}



export interface ButtonProps {
  padding?: string;
  variant?: keyof typeof variants
  select?: keyof typeof selected
  position?: keyof typeof positions
  active?: boolean
  loading?: boolean
  size?: keyof ReturnType<typeof sizes>,
  children: React.ReactNode
  className?: string
  href?: string
  disabled?: boolean
  rounded?: "full" | "md" | "sm" | "xs" | "none"
  onClick?: (e: MouseEvent) => void
  onChange?: (_: string) => void
  onAnimationEnd?: () => void
  checked?: boolean
  id?: string
  type?: "button" | "reset" | "submit"
  formId?: string
  title?: string; ariaLabel?: string
}
export const Button = ({
  variant = "primary",
  size = "sm",
  position = "center",
  children,
  className,
  href,
  disabled, active, select = "default", rounded = "md",
  loading, type = "button", formId,
  title, ariaLabel,
  onClick, id, onAnimationEnd, padding
}: ButtonProps) => {



  const styles = clsx(
    base,
    positions[position],
    variants[variant],
    hover[select === "underline" ? "underline" : variant],
    variant !== "basic" && sizes(padding)[size],
    active && selected[select],
    `rounded-${rounded}`,
    className
  )


  if (href) {

    return (
      <Link href={href} className={styles}
        onClick={onClick}>
        {children}
      </Link>
    )
  }

  if (variant === "select")
    return (
      <div className="relative" onClick={onClick}>
        <input
          className="peer sr-only"
          checked={active}
          type="checkbox"
          id={id}
          readOnly
        />
        <label htmlFor={id} className={styles} >
          {children}
        </label>
      </div>
    )


  return (
    <button type={type}
      form={formId}
      onAnimationEnd={onAnimationEnd}
      onClick={onClick}
      className={styles} disabled={disabled ? true : loading ? true : false}
      title={title} aria-label={ariaLabel}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}

const Spinner = () => (
  <svg
    className="h-4 w-4 animate-spin"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      opacity="0.25"
    />
    <path
      d="M22 12a10 10 0 00-10-10"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

{/* 
<Button>Guardar</Button>

<Button variant="secondary">  Cancelar</Button>

<Button variant="ghost">  Ver más</Button>

<Button variant="danger">  Eliminar</Button>

<Button size="sm">  Pequeño</Button>

<Button href="/atributos">  Ir a atributos</Button> 
*/}