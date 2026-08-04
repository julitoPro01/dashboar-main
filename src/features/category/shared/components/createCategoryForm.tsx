import { Button } from "@/src/shared/components/btn"
import { FormEvent } from "react"
import { CgClose } from "react-icons/cg"
import { FaCheck } from "react-icons/fa6"

interface Props {
    onSubmit: (e: FormEvent) => void;
    onClose: () => void;
    onChange: (val: string) => void;
    onBlur?: () => void;
    isSubmitting: boolean;
    disabled: boolean;
    value: string;
}

export const CreateCategoryForm = ({ onSubmit, onClose, onChange, onBlur, disabled, value, isSubmitting }: Props) => {


    return (
        <form
            className=" w-full flex relative"
            onSubmit={onSubmit}>
            <Button padding="p-1" variant="ghostDanger" onClick={() => !onBlur && onClose()}
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
                onBlur={onBlur}
            />
            <Button padding="p-1" variant="tab" type="submit" disabled={disabled}
                className="absolute right-px top-1/2 -translate-y-1/2 ">
                <FaCheck size={16} />
            </Button>
        </form>
    )
}
