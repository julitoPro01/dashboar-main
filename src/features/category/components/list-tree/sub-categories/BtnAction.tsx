import { FiPlusSquare } from "react-icons/fi"
import { IoMdMore } from "react-icons/io";

interface Props {
    onClick?: () => void;
}
export const BtnAddCategory = ({ onClick }: Props) => {

    return (
        <button className="px-1 text-lg text-text-muted hover:text-primary rounded-md"
            onClick={onClick}>
            <FiPlusSquare />
        </button>
    )
}

export const BtnMoreActions = ({onClick}:Props) => {
    return (
        <button className="px-1 text-lg text-text-muted hover:text-primary rounded-md"
            // onClick={({ clientX, clientY }) => onOpenFloatingPanel(clientX, clientY, "more")}>
            onClick={onClick}>
            <IoMdMore />
        </button>
    )
}