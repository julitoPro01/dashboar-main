import clsx from "clsx";
import { FiSearch } from "react-icons/fi";
import { Button } from "../../components/btn";
import { IoClose } from "react-icons/io5";
import { FIELD_STYLE } from "../../form";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  minSearchChars?:number,
  placeholder?: string;
  className?:string
}
export const SearchInput = ({onClear,onChange,value,minSearchChars=3,placeholder, className=""}:Props) => {

    const valid = value.trim().length === 0 || value.trim().length >= minSearchChars

    return (
        <div className={`relative flex-1 flex items-center ${className}`}>

            {value.trim().length > 0
                ? <Button className="absolute right-1.5" variant="ghostDanger" padding="p-0.5" onClick={onClear} ><IoClose size={22} /></Button>
                : <label htmlFor="f-company" className={"absolute right-2 text-text-muted"} ><FiSearch size={20} /></label>
            }

            <input
                id="f-company"
                type="search"
                className={clsx(FIELD_STYLE.base, "pe-8 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none ", 
                    FIELD_STYLE.borderSize[1],
                    FIELD_STYLE.roundedSize.lg,
                    FIELD_STYLE.text,
                    FIELD_STYLE.textSize.sm,
                    FIELD_STYLE.size.sm,
                    FIELD_STYLE.placeholder,
                    {
                    [FIELD_STYLE.status.normal]: valid,
                    [FIELD_STYLE.status.error]: !valid,
                })}
                placeholder={placeholder ?? "Buscar... (min. 3)"}
                value={value}
                onChange={({ target }) => onChange(target.value)}
            />
        </div>
    )
}