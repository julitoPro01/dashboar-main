import { forwardRef } from "react";
import clsx from "clsx";

type Size = "sm" | "md" | "lg";

const sizes = {
    sm: {
        track: "w-8 h-4",
        thumb: "w-3 h-3",
        translate: "translate-x-4",
    },
    md: {
        track: "w-10 h-6",
        thumb: "w-5 h-5",
        translate: "translate-x-4",
    },
    lg: {
        track: "w-14 h-8",
        thumb: "w-7 h-7",
        translate: "translate-x-6",
    },
};

type Props = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    size?: Size;
    disabled?: boolean;
};

export const ToggleSwitch = forwardRef<HTMLInputElement, Props>(
    ({ checked, onChange, size = "sm", disabled }, ref) => {
        const s = sizes[size];

        return (
            <label 
            onClick={(e)=>e.stopPropagation()}
            className={clsx("inline-flex items-center cursor-pointer", disabled && "opacity-50")}>

                <input
                    ref={ref}
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {onChange(e.target.checked) }}
                    disabled={disabled}
                    className="sr-only "
                />

                <div
                    className={clsx(
                        "relative rounded-full transition-colors duration-200 ",
                        s.track,
                        checked ? "bg-primary" : "bg-gray-600",
                        disabled ? "cursor-not-allowed":""
                    )}
                >
                    <div
                        className={clsx(
                            "absolute top-1/2 left-0.5 -translate-y-1/2 rounded-full bg-white shadow-sm transform transition-transform duration-200",
                            s.thumb,
                            checked && s.translate
                        )}
                    />
                </div>

            </label>
        );
    }
);

ToggleSwitch.displayName = "ToggleSwitch";