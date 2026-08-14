import { Button } from "@/src/shared/components/btn"
import { Tooltip } from "@/src/shared/components/floating"
import { APP_ROUTES } from "@/src/shared/routes"
import { BiPlus } from "react-icons/bi"

export const AddProductButton = () => {
    return (
        <Tooltip text="Agregar producto" position="left" x="right-12" variant="banderola">
            <Button variant="tabLight" size="sm" rounded="full" padding="p-1.5"
            href={APP_ROUTES.PRODUCTS.CREATE} >
                <BiPlus size={22} />
            </Button>
        </Tooltip>
    )
}
