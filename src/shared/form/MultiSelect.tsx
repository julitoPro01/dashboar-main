import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { FIELD_STYLE } from "./style";
import { FieldStatusType, FormInputProps } from "./types";
import clsx from "clsx";
import { FieldLayout } from "./FieldLayout";

interface Option {
    id: number;
    label: string;
}

interface MultiSelectProps extends FormInputProps {
    id?: string;
    label?: string;
    options: Option[];
    value?: any[];
    onChange: (value: number[]) => void;
    placeholder?: string;
    disabled?: boolean;
}

export const MultiSelect = (props: MultiSelectProps) => {

    const {
        id,
        options,
        value = [],
        onChange,
        error, isDirty,
        placeholder = "Seleccionar",
        disabled = false,
        border = 1,
        roundedSize = "md",
        textSize = "sm",
        fieldSize = "md", fieldClass
    } = props

    const status: FieldStatusType = error ? "error" : isDirty ? "dirty" : "normal";

    const [open, setOpen] = useState(false);

    const toggleOption = (optionId: number) => {
        const exists = value.includes(optionId);

        const nextValue = exists
            ? value.filter(id => id !== optionId)
            : [...value, optionId];

        onChange(nextValue);
    };

    // const removeOption = (optionId: number) => {
    //     onChange(value.filter(id => id !== optionId));
    // };

    const selectedOptions = options.filter(option =>
        value.includes(option.id)
    );



    const field = clsx(
        FIELD_STYLE.base,
        FIELD_STYLE.text,

        FIELD_STYLE.borderSize[border],
        FIELD_STYLE.roundedSize[roundedSize],

        FIELD_STYLE.textSize[textSize],
        FIELD_STYLE.size[fieldSize],
        FIELD_STYLE.status[status],
        fieldClass
    )

    const isEmpty = selectedOptions.length === 0;
    return (

        <FieldLayout {...props} >
            <button
                id={id}
                type="button"
                disabled={disabled}
                onClick={() => setOpen(v => !v)}
                onBlur={() => setOpen(false)}
                className={field}
            >
                <div className="flex flex-wrap items-center gap-1 pr-3">

                    {isEmpty && (
                        <span className="text-text-subtle">
                            {placeholder}
                        </span>
                    )}

                    {selectedOptions.map(option => (
                        <span
                            key={option.id}
                            className="flex items-center gap-1 rounded  px-2 bg-bg-select"
                        >
                            {option.label}

                            {/* <span
                                role="button"
                                tabIndex={0}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeOption(option.id);
                                }}
                                className="text-text-muted hover:text-text"
                            >
                                <IoClose size={14} />
                            </span> */}
                        </span>
                    ))}

                    <div className="absolute  right-0 top-1/2 -translate-y-1/2 pr-1">
                        <IoChevronDown
                            className={`${isEmpty ? "text-text-subtle" : "text-text"} ml-auto shrink-0`}
                            size={16}
                        />
                    </div>
                </div>

                <div className={`absolute left-0 z-50 mt-3 max-h-60 w-full overflow-auto rounded-md border border-border bg-surface-light shadow-lg
                    ${!open && "hidden"}
                    `}>

                    {options.map(option => {
                        const selected = value.includes(option.id);

                        return (
                            <div
                                key={option.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleOption(option.id)
                                }}
                                className={`flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-hover
                                    ${FIELD_STYLE.textSize[textSize]}
                                    `}
                            >
                                <input
                                    type="checkbox"
                                    checked={selected}
                                    readOnly
                                    className="pointer-events-none"
                                />

                                <span>{option.label}</span>
                            </div>
                        );
                    })}

                </div>
            </button>

        </FieldLayout>

        // <div className="relative w-full">

        //     {label && (
        //         <label
        //             htmlFor={id}
        //             className="mb-1.5 block text-sm font-medium"
        //         >
        //             {label}
        //         </label>
        //     )}


        //     {error && (
        //         <span className={FIELD_STYLE.validation.errorMsg}>
        //             {error}
        //         </span>
        //     )}
        // </div>
    );
};