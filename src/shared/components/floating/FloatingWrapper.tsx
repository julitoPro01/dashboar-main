
interface Props {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    positionX?: "left-0" | "right-0";
    positionY?: "top-full" | "bottom-full";
    size?: 'sm' | 'md' | 'lg' | 'xl' | "4xl",

}

const SIZE = (size: string) => `max-w-${size}`;

export const FloatingWrapper = ({ children, open, onClose, positionX = "left-0", positionY = "top-full", size="md" }: Props) => {
    return open ? <>
        <div className=" fixed inset-0 z-40" onClick={onClose} />

        <div className={`overflow-auto absolute ${positionY} ${positionX} z-100 mt-1 ${SIZE(size)} text-sm font-normal rounded-xl border border-border dark:border-border-strong bg-surface-overlay shadow-xl`}>
            {children}
        </div>
    </> : null

}
