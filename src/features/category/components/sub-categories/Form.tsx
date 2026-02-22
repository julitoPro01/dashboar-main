import { UseFormRegister } from "react-hook-form";
import { InitSubCatgForm } from "../SubCategories";

interface Props {
    onSubmit: () => void;
    register: UseFormRegister<InitSubCatgForm>
}

export const Form = ({ onSubmit, register }: Props) => {
    return (
        <form className="flex-1 bg-white"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit()
            }}
        >
            <input
                autoFocus
                className="flex-1 w-full px-2  border-0  focus:ring-0  outline-none transition-all"
                type="text"
                placeholder="Nombre de categoría"
                {...register("fieldName", { onBlur: () => { onSubmit() } })}
            />

        </form >)
}   
