import clsx from "clsx"
import { FormInputProps } from "../types";
import { FIELD_STYLE } from "../style";

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
    labelBg = "bg-surface",

    fieldIcon,
    textSize = "sm",
    fieldSize = "md",
    children,
    className,
    id,
    iconPosition = "left",
    maxLengthLabel,
    currentLengthLabel,
    positionError = "relative",
    disabledLabel
}: Props) => {


    return (
        <div className={`relative flex flex-col w-full ${className} gap-0.5`}>

            {(labelOption?.type === "top") &&
                <div className="flex flex-col gap-1 mb-1">
                    {label &&
                        <div className="flex justify-between gap-4">
                            <label htmlFor={id} className={clsx(FIELD_STYLE.label, labelBg, labelOption.required && FIELD_STYLE.validation["*"])} >
                                {label}
                            </label>
                            {maxLengthLabel &&
                                <span className="block text-xs text-text-muted"> {currentLengthLabel} / {maxLengthLabel} </span>
                            }
                        </div>
                    }

                    {(labelOption.description && labelOption.descrPosition === "top") && (
                        <p className="text-xs font-medium text-text-muted">
                            {labelOption.description}
                        </p>
                    )}

                </div>
            }

            <div className="relative flex w-full">

                {disabledLabel &&
                    <span className={`absolute ${labelBg} px-1 right-2 rounded  -top-2 text-xs font-medium text-text-secondary`}>
                        No disponible
                    </span>
                }

                {fieldIcon &&
                    <span className={`${FIELD_STYLE.icon} ${iconPosition === "left" ? "left-3" : "right-3"}`}>{fieldIcon}</span>
                }

                {
                    (label && labelOption?.type === "left-join") &&
                    <label htmlFor={id} className={`
                        inline-flex items-center  whitespace-nowrap
                        ${labelBg}
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
                        ${labelBg}
                        ${FIELD_STYLE.label}
                        ${labelOption.required && FIELD_STYLE.validation["*"]}
                        `}>
                        {label}
                    </label>
                }

                {children}

                {(label && labelOption?.type === "top-floating") && <>
                    <label htmlFor={id} className={`
                    rounded text-text-muted peer-focus:text-text
                    pointer-events-none absolute left-3 top-3
                    origin-left px-1 text-sm 
                    transition-all
                    peer-focus:-top-2 peer-focus:scale-90 
                    peer-[:not(:placeholder-shown)]:-top-2
                    peer-[:not(:placeholder-shown)]:scale-90
                     ${labelBg} ${labelOption.required && FIELD_STYLE.validation["*"]}`}
                    >
                        {label}

                    </label>
                </>}

            </div>
            {
                error
                    ? positionError === "relative"
                        ? <span className={FIELD_STYLE.validation.errorMsg} >{error}</span>
                        : <span className={FIELD_STYLE.validation.errorMsg + " absolute top-full"} >{error}</span>

                    : ""
            }
            {
                (labelOption?.type === "top-floating" || (labelOption?.type === "top" && labelOption.descrPosition === "bottom"))
                && labelOption.description &&
                <p className="text-xs text-text-muted mt-1">
                    {labelOption.description}
                </p>
            }



        </div>
    )
}
