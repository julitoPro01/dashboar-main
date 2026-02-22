import { FORM_STYLES } from "@/src/constants";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
    register: UseFormRegisterReturn;
    className?: string
}
export const IsPrimaryField = ({ register, className = "" }: Props) => {

    return (
        <div className={`${className}`}>
            <label
                className={FORM_STYLES.label + " " + "cursor-pointer select-none flex items-center gap-3"}
            >
                <input
                    type="checkbox"
                    className=" h-4 w-4 rounded border border-gray-300 text-sky-600 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register}
                />

                Imagen principal
            </label>
        </div>

    )
}