// button.style.ts


//TODO: No se esta usando
export const BUTTON_STATE = {
    base: "cursor-pointer transition-all duration-200 select-none",
    disabled: "opacity-50 pointer-events-none",
    loading: "opacity-70 pointer-events-none",
} as const;

//TODO: No se esta usando

export const BUTTON_STYLE = {
    pageAction: `bg-transparent hover:bg-surface-overlay hover:text-text-strong
     p-1.5 rounded-full ${BUTTON_STATE.base}`
}