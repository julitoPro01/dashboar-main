import { Button } from "@/src/shared/components/btn";
import { FloatingActionBar } from "@/src/shared/components/floating";
import { useFormState } from "react-hook-form";
import { BiPlus } from "react-icons/bi";


export const FormActions = () => {

  const { isSubmitting, isDirty } = useFormState();

  return (
    <FloatingActionBar
      variant="basic" padding=""
      position={"bottom-r"} className="mr-4 md:mr-8 rounded-full" >

        <Button
          variant="confirm" rounded="full"
          type="submit"
          loading={isSubmitting}
          disabled={!isDirty}
        >
          <BiPlus size={18} />
          {isSubmitting ? "Guardando..." : "Guardar cambios"}
        </Button>

    </FloatingActionBar>
  );
};