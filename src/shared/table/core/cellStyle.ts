// celda
const h = "relative px-5 py-4 text-xs tracking-wide  text-text ";
const b = `px-5 py-3  text-text-muted text-sm `;

const index = (isSticky: boolean=true) => ({
    h: `${isSticky ? "sticky left-0 z-20" : ""}  bg-surface/95  px-5 py-4 text-sm font-semibold text-center`,
    b: `${isSticky ? "sticky left-0 z-5" : ""} px-5 py-3 font-semibold  text-center transition-colors duration-200 truncate text-sm`,
    hov_b: "bg-surface/95 group-hover:bg-slate-100 group-hover:dark:bg-slate-800/95 "
})


export const cellStyle = { b, h, index }