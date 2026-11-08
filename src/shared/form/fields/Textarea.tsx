import clsx from "clsx"
import { FieldStatusType, FormInputCustomProps } from "../types";
import { TextareaHTMLAttributes } from "react";
import { FIELD_STYLE } from "../style";
import { FieldLayout } from "./FieldLayout";


interface Props extends  TextareaHTMLAttributes<HTMLTextAreaElement> {
    custom:FormInputCustomProps
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

export const Textarea = ({custom, ...rest}: Props) => {


    const status: FieldStatusType = custom.error ? "error" : custom.isDirty ? "dirty" : "normal";

    const field = clsx(
        FIELD_STYLE.base,
        FIELD_STYLE.text,
        FIELD_STYLE.placeholder,
        custom.fieldIcon && "ps-10",
        FIELD_STYLE.borderSize[custom.border ?? 1],
        FIELD_STYLE.roundedSize[custom.roundedSize ?? "md"],

        FIELD_STYLE.textSize[custom.textSize ?? "sm"],
        FIELD_STYLE.size[custom.fieldSize ?? "md"],
        FIELD_STYLE.status[status],
        custom.fieldClass
    )

    return (
        <FieldLayout {...custom} id={rest.id}>
            <textarea className={field+" scrollbar-thin"} {...rest} >
            </textarea>
        </FieldLayout>
    )
}
