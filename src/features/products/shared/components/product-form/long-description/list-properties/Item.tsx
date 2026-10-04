import { Button } from "@/src/shared/components/btn"
import { ProductProperty } from "@/src/store/productSlice"
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

interface ItemProps {
    property: ProductProperty;
    onDel?: () => void;
    onEdit?: () => void;
}

export const Item = ({ property, onDel, onEdit }: ItemProps) => {
    return (
        <li
            className="
                flex items-start justify-between gap-4
                px-4 py-3
                border-b border-border-subtle last:border-b-0
            "
        >
            <div className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-text">
                    {property.label}
                </span>

                <div className="mt-1 flex items-start gap-2">
                    <span
                        className="
                            relative min-w-0 pl-4
                            whitespace-pre-wrap wrap-break-word
                            text-sm leading-5 text-text-muted

                            before:absolute
                            before:left-0
                            before:top-2.5
                            before:h-1
                            before:w-1
                            before:-translate-y-1/2
                            before:rounded-full
                            before:bg-text-subtle
                        "
                    >
                        {property.value || "Sin definir"}
                    </span>
                </div>


            </div>
            {property.isCustom && (
                <div className="flex flex-col items-center gap-1 ml-auto">
                    <Button
                        variant="basic"
                        padding="px-2 py-1"
                        onClick={onEdit}
                    >
                        <FaRegEdit />
                    </Button>

                    <Button
                        variant="basic"
                        padding="px-2 py-1"
                        onClick={onDel}
                    >
                        <RiDeleteBin6Line />
                    </Button>
                </div>
            )}
        </li>
    );
};