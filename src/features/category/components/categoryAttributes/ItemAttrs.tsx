
interface Props {
    attr: any;
    isSelected: boolean;
    onSelect: () => void;
}

export const ItemAttrs = ({ attr, isSelected, onSelect }: Props) => {
    return (
        <div
            className={`
                relative cursor-pointer hover:shadow-md shadow-orange-100 hover:border-orange-300 transition-all p-3 max-w-xs min-w-25  justify-between border  rounded-md bg-white shadow-sm
                ${isSelected ? "border-orange-300" : ""} 
                `}
            onClick={onSelect}
        >
            <div className="flex flex-col">
                <span className="font-medium text-gray-800">
                    {attr.name}
                </span>
                {attr.description && (
                    <span className="text-sm text-gray-500">
                        {attr.description}
                    </span>
                )}
            </div>

            <span
                className={`px-2 py-1 absolute -top-4 right-2 rounded bg-white font-semibold  text-sm
                     ${attr.isActive ? "text-green-500" : "text-red-500"}`}
            >
                {attr.isActive ? "Activo" : "Inactivo"}
            </span>
        </div>
    )
}
