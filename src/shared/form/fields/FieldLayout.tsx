import clsx from "clsx"
import { FormInputCustomProps } from "../types";
import { FIELD_STYLE } from "../style";

interface Props extends FormInputCustomProps {
    id?: string;
    children: React.ReactElement;
    className?: string;
    required?: boolean;
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
    labelPosition = "top",
    label,
    labelBg,

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
    disabledLabel,
    description,
    descrPosition = "top",
    required
}: Props) => {


    return (
        <div className={`relative  flex flex-col w-full ${className} gap-0.5`}>

            {
                ((label && labelPosition === "top") || (description && descrPosition === "top")) &&
                <div className="flex flex-col gap-1 mb-1">
                    {label && labelPosition === "top" &&
                        <div className="flex justify-between gap-4">
                            <label htmlFor={id} className={clsx(FIELD_STYLE.label, labelBg, required && FIELD_STYLE.validation["*"])} >
                                {label}
                            </label>
                            {maxLengthLabel &&
                                <span className="block text-xs text-text-muted"> {currentLengthLabel} / {maxLengthLabel} </span>
                            }
                        </div>
                    }

                    {(description && descrPosition === "top") &&
                        <p className="text-xs font-medium text-text-muted">
                            {description}
                        </p>
                    }

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
                    (label && labelPosition === "left-join") &&
                    <label htmlFor={id} className={`
                        inline-flex items-center  whitespace-nowrap
                        ${labelBg}
                        border border-r-0 border-border-input
                        rounded-l-lg
                        ${FIELD_STYLE.textSize[textSize]}
                        ${FIELD_STYLE.size[fieldSize]}
                        ${required && FIELD_STYLE.validation["*"]}
                        `}>
                        {label}
                    </label>
                }

                {
                    (label && labelPosition === "left") &&
                    <label htmlFor={id} className={`
                        inline-flex items-center  whitespace-nowrap pr-3
                        ${labelBg}
                        ${FIELD_STYLE.label}
                        ${required && FIELD_STYLE.validation["*"]}
                        `}>
                        {label}
                    </label>
                }

                {children}

                {(label && labelPosition === "top-floating") && <>
                    <label htmlFor={id} className={` rounded
                    text-text-muted peer-focus:text-text
                    pointer-events-none absolute left-3 top-3
                    origin-left px-1 text-sm 
                    transition-all
                    peer-focus:-top-2 peer-focus:scale-90 
                    peer-[:not(:placeholder-shown)]:-top-2
                    peer-[:not(:placeholder-shown)]:scale-90
                     ${labelBg} ${required && FIELD_STYLE.validation["*"]}`}
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
                (description && descrPosition === "bottom") &&
                <p className="text-xs text-text-muted mt-1">
                    {description}
                </p>
            }



        </div>
    )
}
