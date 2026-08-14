//TODO: ELIMINAR
const base = "block w-full border rounded-lg text-sm bg-surface-light text-base font-medium text-text-muted dark:text-white focus:shadow-sm focus:outline-none transition-all placeholder:text-text-subtle"

export const INPUT_FIELD_STYLE = {
  description:"text-xs font-medium text-text-muted",
  inputIcon:"absolute top-1/2 -translate-y-1/2 left-3  text-gray-400 pointer-events-none",

  skeleton: "w-full rounded-lg px-4 py-3 text-sm relative overflow-hidden bg-slate-100/80 dark:bg-surface-light border border-border-input text-transparent select-none",
  skeletonLabel:"text-sm font-normal text-text-subtle mb-2 block select-none text-transparent",
  shimmer:" absolute inset-0 animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white dark:via-white/5 to-transparent",

  base: {sm:base + " px-4 py-3", lg:base +" p-4",xs:base + " px-3 py-2"},
  basic: "block w-full px-4 border py-3 text-sm bg-surface-light text-base font-medium text-text-muted dark:text-white focus:shadow-sm focus:outline-none transition-all placeholder:text-text-subtle",
  label: "text-sm font-semibold text-slate-600 tracking-wide dark:text-slate-300 block",
  
  baseDisabled: "block w-full border rounded-lg px-4 py-3 text-sm bg-surface text-base font-medium text-text-muted dark:text-white focus:shadow-sm focus:outline-none transition-all placeholder:text-text-subtle",
  basicDisabled: "block w-full border  px-4 py-3 text-sm bg-surface text-base font-medium text-text-muted dark:text-white focus:shadow-sm focus:outline-none transition-all placeholder:text-text-subtle",

  states: {
    normal: "border-border-input focus:border-slate-400 focus:shadow-slate-400",
    dirty: "border-blue-400 dark:border-[#60a5fa] focus:shadow-blue-200 focus:dark:shadow-[#60a5fa]",
    error: "border-error  focus:shadow-red-300 focus:dark:shadow-red-400",
  },

  isRequired: " after:content-['*'] after:ml-0.5 after:text-error-strong",
  labelError: "text-xs text-error-strong mt-1",

  baseSelect: "block w-full border rounded-lg px-4 py-3 text-sm bg-surface-light text-base font-medium  focus:shadow-sm focus:outline-none transition-all",
  placeholder: "placeholder:text-text-subtle",
  value: "text-text-muted dark:text-white"

} as const;


export const INPUT_FIELD_FILTER_STYLE = {
  label: "text-xs text-text-muted mb-1",
  base: "border w-full rounded-md px-3 py-3 text-sm h-9 bg-surface-light dark:text-white focus:shadow focus:outline-none placeholder:text-text-subtle",
  states: {
    error: "border-red-400  focus:shadow-red-200 focus:dark:shadow-red-400",
    normal: "border-border-input focus:border-slate-400 focus:shadow-slate-300",
  },

}