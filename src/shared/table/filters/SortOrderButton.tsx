import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import { MdUnfoldMore } from "react-icons/md";

type SortOrder = "asc" | "desc" | null | undefined;

interface SortButtonProps {
    active: boolean;
    order: SortOrder;
    onToggle: () => void;
    className?: string;
    size?:number
}

export const SortOrderButton = ({ active, order, onToggle, className,size=16 }: SortButtonProps) => {

    return (
        <button onClick={onToggle} className={`${className ?? "hover:text-text-muted py-1"}`}>
            {!active ? (
                <MdUnfoldMore size={size} />
            ) : order === "desc" ? (
                <IoMdArrowDown size={size} />
            ) : order === "asc" ? (
                <IoMdArrowUp size={size} />
            ) : (
                <MdUnfoldMore size={size} />
            )}
        </button>
    );
};