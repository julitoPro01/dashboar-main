import clsx from "clsx";
import { FormInputProps, FieldStatusType } from "./types"
import { SelectHTMLAttributes, useState } from "react";
import { FIELD_STYLE } from "./style";
import { FieldLayout } from "./FieldLayout";
import { IoChevronDown } from "react-icons/io5";



interface Props extends FormInputProps, SelectHTMLAttributes<HTMLSelectElement> {
    options?: { value: number | string, label: string }[];
    placeholder?: string;
    selectedValue?: string | number | null;
}


/**
 * defatult: 
 * positonLabel = "top";
 * textSize = "sm";
 * fieldSize = "md";
 * layout = "col";
 *    border=1,
  *  roundedSize="lg",
 * @param param0 
 * @returns 
 */

export const Select = (props: Props) => {

    const {
        roundedSize,
        border,
        fieldSize,
        textSize,
        fieldIcon,
        fieldClass,
        error,
        isDirty,
        labelOption,
        defaultValue,
        selectedValue,
        onChange,
        iconPosition,
        maxLengthLabel,
        currentLengthLabel,

        ...rest
    } = props;

    const status: FieldStatusType = error ? "error" : isDirty ? "dirty" : "normal";

    const [selected, setSelect] = useState(selectedValue)

    const field = clsx(
        FIELD_STYLE.base,
        selected ? FIELD_STYLE.text : "text-text-subtle",

        fieldIcon && "ps-10",
        FIELD_STYLE.borderSize[border ?? 1],
        FIELD_STYLE.roundedSize[roundedSize ?? "md"],

        FIELD_STYLE.textSize[textSize ?? "sm"],
        FIELD_STYLE.size[fieldSize ?? "md"],
        FIELD_STYLE.status[status],
        fieldClass, "appearance-none pr-6.5"
    )

    return (
        <FieldLayout {...props} >
            <div className=" w-full">
                <select className={field}  {...rest}
                    onChange={(e) => {
                        onChange?.(e);
                        setSelect(e.target.value)
                    }}
                >
                    <option value={defaultValue ?? ""} className="text-text-muted relative" > {props.placeholder ?? "Seleccionar"}</option>
                    {
                        props.options?.map(v => (
                            <option key={v.value} value={v.value} className={FIELD_STYLE.text}  > {v.label} </option>
                        ))
                    }

                </select>
                <div className=" absolute right-0 top-1/2 -translate-y-1/2 pr-1">
                    <IoChevronDown
                        className={`${selected ? "text-text" : "text-text-subtle"} ml-auto shrink-0`}
                        size={16}
                    />
                </div>
            </div>
        </FieldLayout>
    )


}
