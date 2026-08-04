"use client";
import { DynamicModal } from "@/src/shared/components/modal";
import { useStore } from "@/src/store/useStore"
import { getErrorMessage, successMessage } from "@/src/shared/messages";
import { TOAST_STYLE, ToastError } from "@/src/shared/components/toaster";
import type { UpsertAttributeForm } from "../attribute-definition/types";
import { toast } from "sonner";
import { useCreateAttribute } from "../attribute-definition/shared/hook";
import { useBasicForm } from "@/src/shared/form";
import { AttributeForm } from "../attribute-definition/shared/components";

interface Props { createdBy: string; createdById: number }
export const CreateAttributeModal = ({ createdBy, createdById }: Props) => {

    const isOpenModal = useStore(v => v.createAttributeModal);
    const setOpenModal = useStore(v => v.setCreateAttributeModal);

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    return (
        <DynamicModal
            title="Agregar nuevo atributo"
            sizeTitle="2xl"
            open={isOpenModal}
            onClose={handleCloseModal}
        >
            <RenderContent createdBy={createdBy} createdById={createdById} closeModal={handleCloseModal} />
        </DynamicModal>
    )
}

const RenderContent = ({ createdBy, createdById, closeModal }: Props & { closeModal: () => void }) => {

    const { mutate: createAttribute, isPending } = useCreateAttribute();

    const form = useBasicForm(init, {
        name: (val) => val.trim().length >= 3,
        dataType: (val) => val.trim().length > 2,
    }, {
        onCancel() { closeModal() },
        onSubmit() {

            const { values } = form.state

            createAttribute({
                name: form.state.name,
                dataType: form.state.dataType!,
                description: form.state.description,
                isActive: form.state.isActive,
                values: form.isDirty.values ? values : undefined,
                createdBy,
                createdById
            }, {
                onSuccess: (res) => {
                    if (res.ok) {
                        toast.success(successMessage.create("attributo").description, { style: TOAST_STYLE.success })
                        closeModal();
                    } else {
                        const { title, description } = getErrorMessage(res.errorType)
                        ToastError({ title, description, activeBtnClose: true }, { duration: 5000 });
                    }
                }
            });
        },
        onUndo() {
            form.handleChange("values", init.values)
        }
    });


    return (
        <AttributeForm
            isSubmitting={isPending}
            form={form}
        />
    )
}


const init: UpsertAttributeForm = {
    name: "",
    dataType: undefined,
    description: undefined,
    isActive: false,

    value: "",
    values: [],
}
