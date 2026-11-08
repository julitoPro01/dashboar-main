import clsx from "clsx"
import { InputHTMLAttributes } from "react";
import { FieldStatusType, FormInputCustomProps } from "../types";
import { FieldLayout } from "./FieldLayout";
import { FIELD_STYLE } from "../style";


interface Props extends InputHTMLAttributes<HTMLInputElement> {
    custom: FormInputCustomProps,
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


export const Input = ({ custom, ...rest }: Props) => {


    const status: FieldStatusType = custom.error ? "error" : custom.isDirty ? "dirty" : "normal";

    let fieldStyle = "";
    if (rest.type === "date" || rest.type === "datetime-local")
        fieldStyle = "dark:[color-scheme:dark]";
    else if (rest.type === "number")
        fieldStyle = "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";


    const field = clsx(
        FIELD_STYLE.base,
        FIELD_STYLE.text,
        FIELD_STYLE.placeholder,
        (custom.fieldIcon && !custom.fieldClass) && custom.iconPosition === "left" ? "ps-10" : "pr-10",
        FIELD_STYLE.borderSize[custom.border ?? 1],
        FIELD_STYLE.roundedSize[custom.roundedSize ?? "md"],

        FIELD_STYLE.textSize[custom.textSize ?? "sm"],
        FIELD_STYLE.size[custom.fieldSize ?? "md"],
        FIELD_STYLE.status[status],
        "peer transition",
        fieldStyle,
        custom.fieldClass
    )



    return (
        <FieldLayout {...custom} id={rest.id} >
            <input className={field} {...rest} />
        </FieldLayout>
    )
}
