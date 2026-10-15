import clsx from "clsx"
import { InputHTMLAttributes } from "react";
import { FieldStatusType, FormInputProps } from "../types";
import { FieldLayout } from "./FieldLayout";
import { FIELD_STYLE } from "../style";


interface Props extends FormInputProps, InputHTMLAttributes<HTMLInputElement> {
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


export const Input = (props: Props) => {

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
        iconPosition = "left",
        maxLengthLabel,
        currentLengthLabel,
        positionError,
        labelBg,
        disabledLabel,
        ...rest
    } = props;

    const status: FieldStatusType = error ? "error" : isDirty ? "dirty" : "normal";

    let fieldStyle ="";
    if(rest.type==="date" || rest.type==="datetime-local")
        fieldStyle="dark:[color-scheme:dark]";
    else if(rest.type==="number")
        fieldStyle="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";
    

    const field = clsx(
        FIELD_STYLE.base,
        FIELD_STYLE.text,
        FIELD_STYLE.placeholder,
        (fieldIcon && !fieldClass) && iconPosition === "left" ? "ps-10" : "pr-10",
        FIELD_STYLE.borderSize[border ?? 1],
        FIELD_STYLE.roundedSize[roundedSize ?? "md"],

        FIELD_STYLE.textSize[textSize ?? "sm"],
        FIELD_STYLE.size[fieldSize ?? "md"],
        FIELD_STYLE.status[status],
        "peer transition",
        fieldStyle,
        fieldClass
    )



    return (
        <FieldLayout {...props} >
            <input className={field} {...rest} />
        </FieldLayout>
    )
}
