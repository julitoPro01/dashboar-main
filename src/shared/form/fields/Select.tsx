"use client"
import clsx from "clsx";
import { FormInputCustomProps, FieldStatusType } from "../types"
import { SelectHTMLAttributes, useState } from "react";
import { FIELD_STYLE } from "../style";
import { FieldLayout } from "./FieldLayout";
import { IoChevronDown } from "react-icons/io5";



interface Props extends Omit<SelectHTMLAttributes<HTMLSelectElement>,"children"> {
    custom: {
        options?: readonly { value: number | string, label: string, disabled?: boolean }[];
        placeholder?: string;
        isValueSelected?: boolean;
        placeholderColor?: string;
        disabledPlaceholder?:boolean;
    } & FormInputCustomProps

    children?:(style:string)=> React.ReactNode;
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

export const Select = ({custom, children, ...rest}: Props) => {



    const status: FieldStatusType = custom.error ? "error" : custom.isDirty ? "dirty" : "normal";

    const [selected, setSelect] = useState(custom.isValueSelected)

    const field = clsx(
        FIELD_STYLE.base,
        selected ? FIELD_STYLE.text : custom.placeholderColor ?? "text-text-subtle",

        custom.fieldIcon && "ps-10",
        FIELD_STYLE.borderSize[custom.border ?? 1],
        FIELD_STYLE.roundedSize[custom.roundedSize ?? "md"],

        FIELD_STYLE.textSize[custom.textSize ?? "sm"],
        FIELD_STYLE.size[custom.fieldSize ?? "md"],
        FIELD_STYLE.status[status],
        custom.fieldClass, "appearance-none pr-6.5"
    )


    return (
        <FieldLayout {...custom} id={rest.id} >
            <div className="w-full">
                <select className={field}  {...rest}
                    onChange={(e) => {
                        rest.onChange?.(e);
                        if (selected === !!e.target.value) return;

                        setSelect(!!e.target.value)
                    }}
                >
                    <option value={rest.defaultValue ?? ""}
                     className="text-text-muted" 
                     disabled={custom.disabledPlaceholder ?? false}
                     > {custom.placeholder ?? "Seleccionar"}</option>
                     
                    {children?.(`${FIELD_STYLE.text} disabled:text-text-secondary`) ??
                        custom.options?.map((v) => (
                            <option
                                key={v.value}
                                value={v.value}
                                disabled={v.disabled}
                                className={`${FIELD_STYLE.text} disabled:text-text-secondary`}
                            >
                                {v.label}
                            </option>
                        ))}

                </select>
                <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 pr-1">
                    <IoChevronDown
                        className={`${selected ? "text-text" : "text-text-subtle"} ml-auto shrink-0`}
                        size={16}
                    />
                </div>
            </div>
        </FieldLayout>
    )


}
