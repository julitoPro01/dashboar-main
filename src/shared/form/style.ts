import { FieldSize, RoundedSize, TextSize, } from "./types";

// ------ ESTRUCTURA - input-------
const BORDER_SIZE = {
    0: "border-none",
    1: "border-1",
    2: "border-2",
} as const;

const ROUNDED_SIZE: Record<RoundedSize, string> = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
    none: "rounded-none",
    left: "rounded-l-lg",
    right: "rounded-r-lg"
} as const;

//------
const TEXT_SIZE: Record<TextSize, string> = { xs: "text-xs", sm: "text-sm", lg: "text-lg", xl: "text-xl", "2xl": "text-2xl" } as const;
//--
const FIELD_SIZE: Record<FieldSize, string> = ({ sm: "px-3 py-2", md: "px-4 py-3", lg: "p-4", xl: "px-5 py-4" });
const FIELD_LABEL = "text-sm font-semibold text-slate-600 tracking-wide dark:text-slate-300 block";
const FIELD_BASE = `
    w-full transition-colors
    focus:shadow-sm focus:outline-none
    bg-surface-light disabled:bg-surface
    text-base text-text-muted font-medium dark:text-white placeholder:text-text-subtle
    `;


//------ ESKELETON--------

export const FIELD_SKELETON = {
    label: "text-sm font-normal text-text-subtle mb-2 block select-none text-transparent",
    input: "w-full rounded-lg px-4 py-3 text-sm relative overflow-hidden bg-slate-100/80 dark:bg-surface-light border border-border-input text-transparent select-none",
    shimmer: "absolute inset-0 animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white dark:via-white/5 to-transparent"
}

// --- input-------
export const FIELD_STATUS = {
    normal: "border-border-input focus:border-slate-400 focus:shadow-slate-400",
    dirty: "border-blue-400 dark:border-[#60a5fa] focus:shadow-blue-200 focus:dark:shadow-[#60a5fa]",
    error: "border-error  focus:shadow-red-300 focus:dark:shadow-red-400",
}

//---- label ---- span
export const FIELD_VALIDATION = {
    ["*"]: "after:content-['*'] after:ml-0.5 after:text-error",
    errorMsg: "text-xs text-error-strong mt-1",
    // warningMsg: "text-xs text-warning-strong mt-1" 
}

const FIELD_ICON = ` absolute top-1/2 -translate-y-1/2 left-3  text-gray-400 pointer-events-none`;

export const FIELD_STYLE = {
    base: FIELD_BASE,
    borderSize: BORDER_SIZE,
    roundedSize: ROUNDED_SIZE,
    textSize: TEXT_SIZE,
    size: FIELD_SIZE,
    label: FIELD_LABEL,
    icon: FIELD_ICON,
    status: FIELD_STATUS,
    validation: FIELD_VALIDATION
}