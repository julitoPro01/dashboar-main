import { IoIosClose } from "react-icons/io";

type LabelProps = {
    onClick: () => void;
    label: string;
}

export const AppliedFilterLabel = ({ label, onClick }: LabelProps) => {
    return (
        <div className="absolute left-0 right-0 -bottom-2.5 flex px-4" title={label}>
            <div className="flex items-center cursor-default max-w-full bg-orange-50 border border-orange-300 rounded-2xl overflow-hidden">

                <button className="shrink-0 font-bold bg-red-400 hover:bg-red-500 rounded-full"
                    onClick={onClick}>
                    <IoIosClose size={20} color="white" />
                </button>
                <span className="truncate text-xs flex-1 text-orange-500 px-2">
                    {label}
                </span>
            </div>
        </div>
    )
}
