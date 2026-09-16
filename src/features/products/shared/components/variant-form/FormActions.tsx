import { Button } from "@/src/shared/components/btn"
import { FaCheck } from "react-icons/fa6"

export const FormActions = () => {
    return (
        <div className="py-4 px-6 flex justify-between ">

            <Button
                variant="basic"
                padding="none"
            >
               Cancelar
            </Button>


            <Button
                variant="confirm"
            >
               <FaCheck/> Crear variante
            </Button>

        </div>
    )
}
