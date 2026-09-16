import clsx from "clsx"
import { FieldStatusType, FormInputProps } from "./types";
import { InputHTMLAttributes } from "react";
import { FIELD_STYLE } from "./style";
import { FieldLayout } from "./FieldLayout";


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
        maxLength,
        maxLengthLabel,
        currentLengthLabel,

        ...rest
    } = props;

    const status: FieldStatusType = error ? "error" : isDirty ? "dirty" : "normal";

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
        fieldClass
    )



    return (
        <FieldLayout {...props} >
            <input className={field} {...rest} />
        </FieldLayout>
    )
}
