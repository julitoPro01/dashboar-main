import { Button } from "@/src/shared/components/btn"
import { useStore } from "@/src/store/useStore";
import { useFormContext, useFormState } from "react-hook-form";
import { FaCheck } from "react-icons/fa6"

interface Props {
    submitLabel?: string;
    isEdit?: boolean
}

export const FormActions = ({ submitLabel = "Crear variante", isEdit }: Props) => {

    const form = useFormContext();
    const {isDirty, isSubmitting} = useFormState()
    const closeSideModal = useStore(v=>v.closeSideModal);


    return (
        <div className="py-4 px-6 flex gap-8 justify-between bg-background">

            <Button
                variant="basic"
                padding="none"
                onClick={closeSideModal}
            >
                Cancelar
            </Button>

            {isEdit &&
                <Button
                    variant="basic"
                    padding="none"
                    className="ml-auto"
                    onClick={()=>form.reset()}
                    disabled={isSubmitting || !isDirty}
                >
                    Deshacer
                </Button>
            }

            <Button
                variant="confirm"
                type="submit"
                disabled={isSubmitting || !isDirty}
                loading={isSubmitting}
            >
                <FaCheck /> {submitLabel}
            </Button>

        </div>
    )
}
