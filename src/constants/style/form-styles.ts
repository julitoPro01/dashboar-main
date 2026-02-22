export const FORM_STYLES = {
  base: "mt-1 w-full border rounded rounded-lg px-4 py-3 text-sm bg-surface-light dark:text-white focus:shadow-sm focus:outline-none transition-all placeholder:text-text-subtle",
  states: {
    normal: "border-border-input focus:border-slate-400 focus:shadow-slate-400",
    dirty: "border-blue-400 dark:border-[#60a5fa] focus:shadow-blue-200 focus:dark:shadow-[#60a5fa]",
    error: "border-error  focus:shadow-red-300 focus:dark:shadow-red-400",
  },
  label: "text-sm font-semibold text-text mb-1.5 block",
  isRequired: "text-gray-700 after:content-['*'] after:ml-0.5 after:text-error-strong",
  labelError: "text-xs text-error-strong mt-1"
} as const;


export const FORM_FILTER_STYLE = {
  label: "text-xs text-text-muted mb-1",
  base: "border w-full rounded-md px-3 py-2 text-sm h-9 bg-surface-light dark:text-white focus:shadow outline-none placeholder:text-gray-400",
  state: {
    error: "border-red-400  focus:shadow-red-200 focus:dark:shadow-red-400",
    normal: "border-border-input focus:border-slate-400 focus:shadow-slate-300",
  },

}