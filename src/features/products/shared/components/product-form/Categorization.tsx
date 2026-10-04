"use client"
import { FormCard } from "@/src/shared/form"
import { CategorySelection } from "./categorization/CategorySelection"
import { MdOutlineAccountTree, MdRestartAlt } from "react-icons/md"
import { Button } from "@/src/shared/components/btn"
import { FaCheck } from "react-icons/fa6"
import { useFormContext, useFormState } from "react-hook-form"
import { CategorizationForm } from "../../../types"
import { SystemProperties } from "./categorization/SystemProperties"
import { useRegisterSystemAttributes } from "../../hooks"


type Props =
    { isEdit?: false, isEditSuccess?: boolean, }
    | { isEdit: true, isEditSuccess?: boolean, id: number, isSubmitting?:boolean }


export const Categorization = (props: Props) => {

    const { setValue, reset, control } = useFormContext<CategorizationForm>();

    const { dirtyFields } = useFormState({ control, name: "categorization" });

    const { original } = useRegisterSystemAttributes({
        entity: "product",
        isEdit: props.isEdit,
        id: props.isEdit ? props.id : undefined,
    });

    const handleReset = () => {
        if (props.isEdit) {

            reset();

            //TODO: solo se ejecutara cuando no se ha realizado ningura actualización
            // el "Reset" raíz aun no ha sido establecido por la actualización
            // cuando se ejecute el "Reset" raíz, el valor "original" tendra un valor antiguo
            if (!props.isEditSuccess) {

                setValue("categorization.systemAttributes",
                    original.current,
                    { shouldDirty: false });
            }
        }
    }

    return (
        <FormCard
            title="Categorización y Atributos del Sistema"
            titleIcon={<MdOutlineAccountTree />}
            actionNode={props.isEdit && <>
                <Button variant="basic" size="xs" padding="p-0" type="button"
                    disabled={props.isSubmitting || !dirtyFields.categorization}
                    onClick={handleReset}
                >
                    <MdRestartAlt size={20} />
                </Button>
                <Button
                    variant="basic" size="xs" padding="p-0" type="submit"
                    loading={props.isSubmitting}
                    disabled={!dirtyFields.categorization}
                >
                    <FaCheck size={20} />
                </Button>
            </>}
        >
            <div className="flex flex-col md:flex-row gap-x-8 gap-y-5">
                <CategorySelection />
            </div>

            <SystemProperties />

        </FormCard>

    )
}
