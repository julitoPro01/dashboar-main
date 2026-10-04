
import { Name } from "./basic-Information/Name"
import { Slug } from "./basic-Information/Slug"
import { ShortDescription } from "./basic-Information/ShortDescription"
import { FormCard } from "@/src/shared/form"
import { IoInformationCircleOutline } from "react-icons/io5"
import { Button } from "@/src/shared/components/btn"
import { MdRestartAlt } from "react-icons/md"
import { FaCheck } from "react-icons/fa6"
import { useFormContext, useFormState } from "react-hook-form"
import { BasicInformationForm } from "../../../types"

interface Props {
    isEdit?: boolean;
    isSubmitting?:boolean
}

export const BasicInformation = ({ isEdit, isSubmitting }: Props) => {

    const { resetField, control } = useFormContext<BasicInformationForm>();

    const {dirtyFields} = useFormState({control, name:"basicInfo"})

    const handleReset = () => {
        resetField("basicInfo")
    }
    
    return (
        <FormCard
            title="Información Básica"
            titleIcon={<IoInformationCircleOutline />}
            actionNode={isEdit && <>
                <Button variant="basic" size="xs" padding="p-0"
                disabled={isSubmitting || !dirtyFields.basicInfo}
                onClick={handleReset}>
                    <MdRestartAlt size={20} />
                </Button>

                <Button variant="basic" size="xs" padding="p-0" type="submit"
                loading={isSubmitting}
                disabled={!dirtyFields.basicInfo}
                >
                    <FaCheck size={20} />
                </Button>
            </>
            }
        >
                <Name />
                <Slug />
                <ShortDescription />
        </FormCard>
    )
}
