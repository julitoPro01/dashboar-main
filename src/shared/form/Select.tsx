import clsx from "clsx";
import { FormInputProps, FieldStatusType } from "./types"
import { SelectHTMLAttributes } from "react";
import { FIELD_STYLE } from "./style";
import { FieldLayout } from "./FieldLayout";



interface Props extends FormInputProps, SelectHTMLAttributes<HTMLSelectElement> {
    options: React.ReactNode;
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
        ...rest
    } = props;

    const status: FieldStatusType = error ? "error" : isDirty ? "dirty" : "normal";

    const field = clsx(
        FIELD_STYLE.base,
        fieldIcon && "ps-10",
        FIELD_STYLE.borderSize[border ?? 1],
        FIELD_STYLE.roundedSize[roundedSize ?? "lg"],

        FIELD_STYLE.textSize[textSize ?? "sm"],
        FIELD_STYLE.size[fieldSize ?? "md"],
        FIELD_STYLE.status[status],
        fieldClass
    )

    return (
        <FieldLayout {...props} >
            <select className={field}  {...rest} >
                <option value={0} className="text-text-muted" > Seleccionar</option>
                {props.options}
            </select>
        </FieldLayout>
    )


}
