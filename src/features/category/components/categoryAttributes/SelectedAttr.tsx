import { IoIosCheckmark, IoIosClose } from "react-icons/io";

interface Props {
    name: string;
    isFilter: boolean;
    isRequired: boolean;
    toProduct: boolean;
}

export const SelectedAttr = ({ name, isFilter, isRequired, toProduct }: Props) => {
    return (
        <div
            className="rounded-md border border-blue-200 text-blue-600 bg-blue-50 px-2 py-0.5 shadow-sm"
        >
            <span >{name}</span>
            <div className=" text-xs">

                <span className="flex items-center"> {isFilter ? <IoIosCheckmark size={20} /> : <IoIosClose size={20} />} <span>filtro aplicado</span>  </span>
                <span className="flex items-center"> {isRequired ? <IoIosCheckmark size={20} /> : <IoIosClose size={20} />} <span>Es obligatorio</span>  </span>
                <span className="flex items-center">
                    <IoIosCheckmark size={20} />
                    {toProduct
                        ? <span> Tipo producto </span>
                        : <span>Tipo variante</span>
                    }
                </span>
            </div>
        </div>
    )
}
