import { Button } from "@/src/shared/components/btn"
import { FormEvent, useEffect, useRef } from "react"
import { CgClose } from "react-icons/cg"
import { FaCheck } from "react-icons/fa6"

interface Props {
    onSubmit: (e: FormEvent) => void;
    onClose: () => void;
    onChange: (val: string) => void;
    isSubmitting: boolean;
    disabled: boolean;
    value: string;
}

export const CreateCategoryForm = ({ onSubmit, onClose, onChange, disabled, value, isSubmitting }: Props) => {

    const btnRef = useRef<HTMLFormElement>(null);


    useEffect(() => {
        function handleClickOutside(event:any) {
            // Si el formulario existe y el clic NO fue dentro de él
            if (btnRef.current && !btnRef.current.contains(event.target)) {
                onClose();
            }
        }

        // Escuchamos el evento de clic en todo el documento
        document.addEventListener("mousedown", handleClickOutside);

        // Limpiamos el evento cuando el componente se desmonte
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [btnRef]);

    return (
        <form ref={btnRef} tabIndex={-1}
            className=" w-full flex relative"
            onSubmit={onSubmit}
        >
            <Button padding="p-1" variant="ghostDanger" onClick={onClose}
                className="absolute left-px top-1/2 -translate-y-1/2 ">
                <CgClose size={16} />
            </Button>
            <input
                disabled={isSubmitting}
                autoFocus
                className="flex-1 py-1 px-8 w-full border-0 font-medium text-text-muted text-sm  rounded-xs ring-1 ring-border-strong outline-none "
                type="text" name="category"
                value={value}
                placeholder="Categoría... (min. 3)"
                onFocus={e => e.target.select()}
                onChange={(e) => onChange(e.target.value)}
            />
            <Button padding="p-1" variant="tab" type="submit" disabled={disabled || isSubmitting}
                className="absolute right-px top-1/2 -translate-y-1/2 "
            >
                <FaCheck size={16} />
            </Button>
        </form>
    )
}
