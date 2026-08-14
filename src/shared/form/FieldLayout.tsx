import clsx from "clsx"
import { FormInputProps } from "./types";
import { FIELD_STYLE } from "./style";

interface Props extends FormInputProps {
    id?: string; children: React.ReactElement; className?: string
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

export const FieldLayout = ({
    error = false,
    labelOption,
    label,

    fieldIcon,
    textSize = "sm",
    fieldSize = "md",
    children,
    className,
    id,
}: Props) => {


    return (
        <div className={`flex flex-col ${className} gap-0.5`}>

            {(labelOption?.type === "top") &&
                <div className="flex flex-col gap-1 mb-1.5">
                    {label &&
                        <label htmlFor={id} className={clsx(FIELD_STYLE.label, labelOption.required && FIELD_STYLE.validation["*"])} >
                            {label}
                        </label>
                    }

                    {labelOption.description && (
                        <p className="text-xs font-medium text-text-muted">
                            {labelOption.description}
                        </p>
                    )}
                </div>
            }
            <div className="relative flex w-full">
                <span className={FIELD_STYLE.icon}>{fieldIcon}</span>

                {
                    (label && labelOption?.type === "left-join") &&
                    <label htmlFor={id} className={`
                            inline-flex items-center bg-surface-light whitespace-nowrap
                          ${labelOption.border ?? "border border-r-0 border-border-input"} 
                          ${labelOption.rounded ?? "rounded-l-lg"}
                          ${FIELD_STYLE.textSize[textSize]}
                          ${FIELD_STYLE.size[fieldSize]}
                          ${labelOption.required && FIELD_STYLE.validation["*"]}
                              `}>
                        {label}
                    </label>
                }

                {
                    (label && labelOption?.type === "left") &&
                    <label htmlFor={id} className={`
                         inline-flex items-center  whitespace-nowrap pr-3
                          ${FIELD_STYLE.label}
                          ${labelOption.required && FIELD_STYLE.validation["*"]}
                              `}>
                        {label}
                    </label>
                }



                {(label && labelOption?.type === "top-floating") && <>
                    <span className="absolute text-xs px-1 h-1 bg-surface-light top-0 left-2.25  text-transparent select-none">{label}</span>
                    <label htmlFor={id}
                        className={`absolute text-xs -top-2 left-3 text-slate-600 dark:text-slate-300 block select-none ${labelOption.required && FIELD_STYLE.validation["*"]}`} >{label}</label>
                </>}

                {children}

            </div>

            {(error)
                ? <span className={FIELD_STYLE.validation.errorMsg} >{error}</span>
                : ""
            }
        </div>
    )
}
