import clsx from "clsx"
import { FieldStatusType, FormInputProps } from "./types";
import { TextareaHTMLAttributes } from "react";
import { FIELD_STYLE } from "./style";
import { FieldLayout } from "./FieldLayout";


interface Props extends FormInputProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
}

/**
 * defatult: 
 * positonLabel = "top";
 * textSize = "sm";
 * fieldSize = "md";
 * layout = "col";
 * border=1,
 * roundedSize="lg",
 * @param param0 
 * @returns 
 */

export const Textarea = (props: Props) => {

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
        iconPosition,
        maxLengthLabel,
        currentLengthLabel,
        

        ...rest
    } = props;

    const status: FieldStatusType = error ? "error" : isDirty ? "dirty" : "normal";

    const field = clsx(
        FIELD_STYLE.base,
        FIELD_STYLE.text,
        FIELD_STYLE.placeholder,
        fieldIcon && "ps-10",
        FIELD_STYLE.borderSize[border ?? 1],
        FIELD_STYLE.roundedSize[roundedSize ?? "md"],

        FIELD_STYLE.textSize[textSize ?? "sm"],
        FIELD_STYLE.size[fieldSize ?? "md"],
        FIELD_STYLE.status[status],
        fieldClass
    )

    return (
        <FieldLayout {...props} >
            <textarea className={field+" scrollbar-thin"} {...rest} >
            </textarea>
        </FieldLayout>
    )
}
