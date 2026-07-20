"use client";
import { DynamicModal } from "@/src/shared/components/modal"
import { useBasicForm } from "@/src/shared/hooks";
import { useStore } from "@/src/store/useStore"
import { UpsertAttributeForm } from "../../types";
import { useEditAttribute } from "../../hook/useEditAttribute";
import { AttributeForm } from "../shared";
import { toast } from "sonner";
import { errorMessages, getErrorMessage, successMessage } from "@/src/shared/messages";
import { TOAST_STYLE, ToastError } from "@/src/shared/components/toaster";
import { useAttributes } from "../../hook/useAttributes";
import { getPaginationFromUrl } from "@/src/shared/table";
import { ATTRIBUTE_SORTBY_ACCEPT_ONLY } from "../../constants/filters";
import { ErrorServer } from "@/src/shared/components/error";
import { getDirtyValues } from "@/src/shared/utils";

interface Props { updatedBy: string; updatedById: number }

export const EditAttributeModal = (params: Props) => {

  const modal = useStore(v => v.editAttributeModal);
  const setOpenModal = useStore(v => v.setEditAttributeModal);

  const filters = useStore(v => v.attributeFilter);
  const pag = getPaginationFromUrl({ includeState: true, sortByAcceptOnly: ATTRIBUTE_SORTBY_ACCEPT_ONLY })

  const handleCloseModal = () => setOpenModal();


  const { data } = useAttributes(pag, filters, modal?.open)
  const find = data?.data?.attributes.find(v => v.id === modal?.id);

  const initValue: UpsertAttributeForm = {
    name: find?.name ?? "",
    dataType: find?.dataType ?? undefined,
    description: find?.description ?? "",
    isActive: find?.isActive ?? false,

    value: "",
    values: find?.values.map(v => ({ ...v, displayOrder: v.displayOrder ?? 0, isSystemDefault: true })) ?? []
  }



  return (
    <DynamicModal open={!!modal?.open} onClose={handleCloseModal} title={`Editar: ${modal?.name ?? "---"}`} >
      <RenderContent {...{
        ...params, closeModal: handleCloseModal, id: modal?.id ?? 0, initValue
      }} />
    </DynamicModal>
  )
}

const RenderContent = ({ updatedBy, updatedById, id, closeModal, initValue }: Props & { initValue: UpsertAttributeForm, id: number, closeModal: () => void }) => {

  const editAttribute = useEditAttribute();

  const form = useBasicForm<UpsertAttributeForm>(initValue,
    {
      name: (val) => val.trim().length >= 3,
      dataType: (val) => val.trim().length > 2,
    },
    {
      onUndo() {
        form.handleChange("values", initValue.values)
      },
      onCancel() {
        closeModal()
      },
      async onSubmit() {
        if (!form.isValidate()) return;

        await form.isSubmit();

        const { isSupportValues } = form.state;

        const dirty = getDirtyValues(initValue, form.state);

        const values = dirty.values?.map(v => ({ ...v, id: v.id > 0 ? v.id : undefined }));

        let val;
        if (form.isDirty.dataType && !isSupportValues) val = [];
        else if (form.isDirty.values) val = values ?? [];

        editAttribute.mutate({
          id,
          name: dirty.name,
          description: dirty.description,
          dataType: dirty.dataType,
          isActive: dirty.isActive,
          values: val,
          updatedBy,
          updatedById,
        }, {
          onSuccess(res) {

            if (res.ok) {
              toast.success(successMessage.updated("attributo").description, { style: TOAST_STYLE.success })
              closeModal();
            } else {
              const { title, description } = getErrorMessage(res.errorType)
              ToastError({ title, description, activeBtnClose: true }, { duration: 5000 });
            }

          }
        })

      }
    });


  return (
    <AttributeForm form={form} mode="edit" />
  )
}
