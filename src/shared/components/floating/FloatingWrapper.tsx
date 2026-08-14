const SIZE = {
    sm:"max-w-sm",
    md:"max-w-md",
    lg:"max-w-lg",
    xl:"max-w-xl",
    ["4xl"]:"max-w-4xl"
};
interface Props {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    positionX?: "left-0" | "right-0";
    positionY?: "top-full" | "bottom-full";
    size?: keyof typeof SIZE,

}



export const FloatingWrapper = ({ children, open, onClose, positionX = "left-0", positionY = "top-full", size="md" }: Props) => {
    return open ? <>
        <div className=" fixed inset-0 z-40" onClick={onClose} />

        <div className={`overflow-auto absolute 
            ${positionY} 
            ${positionX} z-100 mt-1 
            ${SIZE[size]}
             text-sm font-normal rounded-xl border border-border dark:border-border-strong bg-surface-overlay shadow-xl`}>
            {children}
        </div>
    </> : null

}
