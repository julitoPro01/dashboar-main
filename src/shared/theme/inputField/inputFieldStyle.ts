export const INPUT_FIELD_STYLE = {
  base: "block w-full border rounded-lg px-4 py-3 text-sm bg-surface-light text-base font-medium text-text-muted dark:text-white focus:shadow-sm focus:outline-none transition-all placeholder:text-text-subtle",
  basic: "block w-full px-4 border py-3 text-sm bg-surface-light text-base font-medium text-text-muted dark:text-white focus:shadow-sm focus:outline-none transition-all placeholder:text-text-subtle",
  baseDisabled: "block w-full border rounded-lg px-4 py-3 text-sm bg-surface text-base font-medium text-text-muted dark:text-white focus:shadow-sm focus:outline-none transition-all placeholder:text-text-subtle",
  basicDisabled: "block w-full border  px-4 py-3 text-sm bg-surface text-base font-medium text-text-muted dark:text-white focus:shadow-sm focus:outline-none transition-all placeholder:text-text-subtle",
  states: {
    normal: "border-border-input focus:border-slate-400 focus:shadow-slate-400",
    dirty: "border-blue-400 dark:border-[#60a5fa] focus:shadow-blue-200 focus:dark:shadow-[#60a5fa]",
    error: "border-error  focus:shadow-red-300 focus:dark:shadow-red-400",
  },
  label: "text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2 block",
  // labelNode: "text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1.5 block",
  isRequired: "text-gray-700 after:content-['*'] after:ml-0.5 after:text-error-strong",
  labelError: "text-xs text-error-strong mt-1",
  
  baseSelect: "block w-full border rounded-lg px-4 py-3 text-sm bg-surface-light text-base font-medium  focus:shadow-sm focus:outline-none transition-all",
  placeholder:"placeholder:text-text-subtle",
  value:"text-text-muted dark:text-white"
} as const;


export const INPUT_FIELD_FILTER_STYLE = {
  label: "text-xs text-text-muted mb-1",
  base: "border w-full rounded-md px-3 py-2 text-sm h-9 bg-surface-light dark:text-white focus:shadow outline-none placeholder:text-gray-400",
  states: {
    error: "border-red-400  focus:shadow-red-200 focus:dark:shadow-red-400",
    normal: "border-border-input focus:border-slate-400 focus:shadow-slate-300",
  },

}