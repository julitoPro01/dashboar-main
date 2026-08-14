import { Button } from "@/src/shared/components/btn";
import { FloatingActionBar } from "@/src/shared/components/floating";
import { useFormState } from "react-hook-form";


export const FormActions = () => {

    const { isSubmitting,isDirty } = useFormState();

    return (
        <FloatingActionBar position={"bottom-r"} >

            <div className="flex items-center justify-end gap-3 ">


                <Button variant="basic"
                    disabled={isSubmitting}
                >
                    Cancelar
                </Button>

                <Button variant="confirm"
                    type="submit"
                    rounded="full"
                    loading={isSubmitting}
                    disabled={!isDirty}
                >
                    {isSubmitting ? "Creando..." : "Crear producto"}
                </Button>

            </div>
        </FloatingActionBar>
    );
};