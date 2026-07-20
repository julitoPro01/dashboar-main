import { Button } from "@/src/shared/components/btn"
import { Tooltip } from "@/src/shared/components/floating"
import { BiPlus } from "react-icons/bi"

export const AddProductButton = () => {
    return (
        <Tooltip text="Agregar producto" position="left" x="right-12" variant="banderola">
            <Button variant="tabLight" size="fsm" rounded="full" className="p-1.5" >
                <BiPlus size={22} />
            </Button>
        </Tooltip>
    )
}
