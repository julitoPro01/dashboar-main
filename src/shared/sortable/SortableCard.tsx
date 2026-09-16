
interface Props {
    ref: (element: Element | null) => void;
    isDragging?: boolean;
    className?: string;
    children: React.ReactElement | React.ReactElement[];
}

export const SortableCard = ({
    ref, isDragging, className, children
}: Props) => {

    return (
        <article className={`${isDragging ? " opacity-50" : "opacity-100"}
        group relative aspect-square overflow-hidden rounded-2xl
        ${className}`}
            ref={ref}
        >
            {children}
        </article>
    )
}
