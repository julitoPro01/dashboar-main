const SIZE = {
    sm: "w-52",
    md: "w-72",
    lg: "w-96",
    xl: "w-[32rem]",
} as const;

interface Props {
    children: React.ReactNode;
    open: boolean;
    onClose?: () => void;
    positionX?: "left-0" | "right-0" | "left-full" | { custom: string };
    positionY?: "top-full" | "bottom-full" | "top-0" | { custom: string };
    size?: keyof typeof SIZE,
    overlay?: boolean;
    className?: string;
}


export const FloatingWrapper = ({ children, open, onClose,
    positionX = "left-0", positionY = "top-full", size = "md",
    overlay = true, className = ""
}: Props) => {

    const y = typeof positionY === "object" ? positionY.custom : positionY;
    const x = typeof positionX === "object" ? positionX.custom : positionX;

    return open ? <>
        {overlay && <div className=" fixed inset-0 z-40" onClick={onClose} />}

        <div className={`overflow-auto absolute scrollbar-thin scrollbar-track-transparent  scrollbar-thumb-bg-select 
            ${y} 
            ${x}
             z-50
            ${SIZE[size]}
             ${className}
             `}>
            {children}
        </div>
    </> : null

}
