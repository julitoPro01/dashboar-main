"use client";
import { Button } from "@/src/shared/components/btn";
import { SummaryCard } from "@/src/shared/components/card"
import { useStore } from "@/src/store/useStore"
import { IoClose } from "react-icons/io5"

// DTO: Aplicar animación de entrada
export const StatCard = () => {

    const status = useStore(v => v.floatingPanel.status);

    const setFloating = useStore(v => v.setFloatingPanel);
    // const [action, setAction] = useState({ open: false, fade: "animate__fadeInRight" })

    // const handleFadeOut = () => {
    //     setAction({ open: true, fade: "animate__fadeOutRight" })
    // }
    const handleClose = () => {
        setFloating({ open: false })
    }

    // useEffect(() => {

    //     if (status === "loading") {
    //         handleFadeOut()
    //     }

    // }, [status])


    return (
        // <div className={`space-y-2 animate__animated ${action.fade} animate__faster`}
        <div className={`space-y-2 flex flex-col items-start`}
        // onAnimationEnd={handleClose}
        >

            <Button variant="danger" className="p-1" rounded="full" size="lg" padding="p-1"
                onClick={handleClose}>
                <IoClose size={20} />
            </Button>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <SummaryCard
                    title="Productos"
                    value="24,508"
                    description="+12% este mes"
                    icon="inventory_2"
                    color="var(--color-success)"
                />

                <SummaryCard
                    title="Stock bajo"
                    value="142"
                    description="Requieren atención"
                    icon="warning"
                    color="var(--color-warning)"
                />

                <SummaryCard
                    title="Sin stock"
                    value="12"
                    description="Afectan 3 envíos"
                    icon="error"
                    color="var(--color-error)"
                />

                <SummaryCard
                    title="Pendientes"
                    value="84"
                    description="Cola de revisión"
                    icon="rule"
                    color="var(--color-info)"
                />

            </div>
        </div>
    )
}