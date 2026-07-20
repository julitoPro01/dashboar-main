import clsx from "clsx";
import { INPUT_FIELD_FILTER_STYLE } from "../../theme/inputField";
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  ninSearchChars?:number,
  placeholder?: string;
  className?:string
}
export const SearchInput = ({onClear,onChange,value,ninSearchChars=3,placeholder, className=""}:Props) => {

    const valid = value.trim().length === 0 || value.trim().length >= ninSearchChars

    return (
        <div className={`relative flex-1  rounded-lg bg-white flex items-center ${className}`}>

            {value.trim().length > 0
                ? <label className={"absolute right-2 p-0.5 rounded-md border bg-red-50 border-red-200 text-red-500"} onClick={onClear} ><IoIosClose size={20} /></label>
                : <label htmlFor="f-company" className={"absolute right-2"} ><CiSearch size={18} /></label>
            }

            <input
                id="f-company"
                type="text"
                className={clsx(INPUT_FIELD_FILTER_STYLE.base, "pe-8", {
                    [INPUT_FIELD_FILTER_STYLE.states.normal]: valid,
                    [INPUT_FIELD_FILTER_STYLE.states.error]: !valid,
                })}
                placeholder={placeholder ?? "Buscar... (min. 3)"}
                value={value}
                onChange={({ target }) => onChange(target.value)}
            />
        </div>
    )
}