import { FaCheck } from "react-icons/fa";

interface Props {
    onClick: () => void, isSelected: boolean, label: string;
    bulletStyle?: string;
    activeBullet?: boolean;
    checkIconType?:React.ReactNode;
}
export const SelectableItem  = ({ onClick, isSelected, label, checkIconType, activeBullet = false, bulletStyle = "border border-gray-400" }: Props) => {
    return (
        <button className="flex items-center w-full rounded-lg gap-2 px-3 py-2 hover:bg-hover cursor-default"
            onClick={onClick}>
            {activeBullet && <span className={`w-2 h-2 rounded-full ${bulletStyle}`} />}
            <span>{label}</span>
            {isSelected && <span className="ml-auto text-blue-400"> {checkIconType || <FaCheck />} </span>}
        </button>
    )
}   