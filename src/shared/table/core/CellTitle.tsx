interface Props{
    position?:"start"|"center"|"end",
    reverse?:boolean,
    title:string,
    children?:React.ReactNode,
    className?:string;
}
export const CellTitle=({position="start",reverse=false,title,children, className}:Props)=>{
    return (
        <div className={`flex justify-${position} items-center gap-3 ${ reverse ? "flex-row-reverse":"flex-row"} ${className}`}>
            <span className="font-bold text-xs uppercase truncate text-start">{title}</span>
            {children}
        </div>
    )
}