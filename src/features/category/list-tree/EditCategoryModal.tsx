"use client";
import { useStore } from "@/src/store/useStore";
import { DynamicModal } from "@/src/shared/components/modal";

import { getAvailableStatuses, serializeRecordStatusLabel } from "@/src/shared/domains/status";
import { useCategory, useUpdateCategoryTree } from "../shared/hooks";
import { Input, Select, Textarea, useBasicForm } from "@/src/shared/form";
import { inputMsg } from "@/src/shared/messages";
import { createSlug, getDirtyValues } from "@/src/shared/utils";
import { useBootDataStore } from "@/src/store/useBootDataStore";
import { INPUT_FIELD_STYLE } from "@/src/shared/theme/inputField";
import { CiImageOn } from "react-icons/ci";
import { Button } from "@/src/shared/components/btn";
import { useEffect } from "react";
import { EditSkeleton } from "./EditCategory-modal/EditSkeleton";

export const EditCategoryModal = () => {

  const setModal = useStore(v => v.setEditCategoryModal);
  const modal = useStore(v => v.editCategoryModal);

  const onClose = () => { setModal() }

  return (
    <DynamicModal
      title={`Editar: ${modal?.name}`}
      description="Modifica el nombre o la configuración de esta categoría. Los cambios se aplicarán a todos los elementos asociados de forma inmediata."
      sizeTitle="2xl"
      size="2xl"
      open={modal?.open ?? false}
      onClose={onClose}>

      <Render id={modal?.id} onClose={onClose} />

    </DynamicModal>
  )
}

const Render = ({ id = 0, onClose }: { id?: number, name?: string, onClose: () => void }) => {

  const recordStatus = useBootDataStore(v => v.bootRecordStatuses);
  const user = useBootDataStore(v => v.user);
  const setFloating = useStore(v => v.setFloatingPanel);

  const selected = useStore(v => v.selectedCategory);
  const { data, isLoading } = useCategory(id);


  const { isPending, mutateAsync: update } = useUpdateCategoryTree(id, !selected?.parentId && !!selected?.hasChildren)

  const { state, isError, hasDirty, isDirty, hasError, original,
    handleChange, onSubmit, onUndo, onCancel, resetForm
  } = useBasicForm(init, schema, {
    async onSubmit(val) {

      if (!hasDirty) return;

      const values = getDirtyValues(original, val);

      const res = await update({
        id: id,
        ...values,
        updatedBy: user.name!, updatedById: user.id!
      })

      // Cerramos el panel flotante
      if (res.ok) {
        onClose()
        setFloating({ open: false, type: null })
      }
    },
    onUndo() {
      resetForm();
    },
    onCancel() {
      onClose()
    }
  });

  const parentStatus = selected?.paths.find(v => v.id === selected.parentId)?.recordStatus;
  const currentStatus = selected?.recordStatus ?? "DRAFT";

  // -- PADRE PRINCIPAL O SUB PADRE

  const statuses = getAvailableStatuses(currentStatus, parentStatus);
  const statusTransitions = recordStatus.filter(v => statuses.includes(v.name));

  useEffect(() => {
    if (data?.ok)

      resetForm({
        name: data.data.name,
        description: data.data.description ?? "",
        imageUrl: data.data.imageUrl ?? "",
        slug: data.data.slug,
        recordStatusId: data.data.recordStatusId,
      })

  }, [data?.ok, data?.data])

  if (isLoading)
    return <EditSkeleton />

  return (
    <form onSubmit={onSubmit}>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-8 py-6 relative">

        <Input
          label="Nombre"
          value={state.name}
          isDirty={isDirty.name}
          error={isError.name}
          isRequired
          placeholder="Nombre... (min.3)"
          onChange={v => {
            handleChange("name", v)
            handleChange("slug", createSlug(v))
          }}
        />

        <Input
          label="Slug"
          value={state.slug}
          disabled
          placeholder="Slug..."
        />

        <Textarea className="md:col-span-2"
          label="Descripción"
          value={state.description}
          isDirty={isDirty.description}
          placeholder="Introduzca una descripción detallada de la categoría."
          rows={3}
          onChange={v => handleChange("description", v)}
        />

        <Select className="md:col-span-2"
          label="Estado" value={state.recordStatusId.toString()}
          isRequired isDirty={isDirty.recordStatusId} error={isError.recordStatusId}
          onChange={v => handleChange("recordStatusId", +v)} >
          {statusTransitions.map(v =>
            <option key={v.id} value={v.id} >{serializeRecordStatusLabel(v.name)}</option>
          )}
        </Select>

        {/* IMAGE */}
        <div className="flex flex-col md:col-span-2 ">
          <span className={`${INPUT_FIELD_STYLE.label}`}>Imagen</span>
          <div className="relative group cursor-pointer border-2  border-border-input rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors bg-surface-light">
            <div className="w-20 h-20 rounded-lg  shadow-sm flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-700">
              <CiImageOn className="text-3xl" />
              {/* <span className="material-symbols-outlined text-slate-400 group-hover:text-primary text-3xl">image</span> */}
              {/* <!-- <img src="https://placeholder.pics/svg/200" data-alt="Category placeholder preview with abstract shapes" className="h-full w-full object-cover"> --> */}
              {/* <img src="/assets/notfound.jpg" alt="Category placeholder preview with abstract shapes" className="h-full w-full object-cover" /> */}
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Haz clic para subir o arrastra y suelta.</p>
              <p className="text-[10px] text-slate-400">PNG, JPG up to 2MB</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-5 bg-background border-t border-border-subtle flex justify-end gap-3">
        <button
          type="button"
          onClick={onUndo}
          disabled={!hasDirty}
          className="disabled:text-text-subtle disabled:hover:bg-transparent px-6 py-2.5 mr-auto rounded-lg text-sm font-medium text-text hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          Deshacer cambios
        </button>
        <button className="px-6 py-2.5 rounded-lg font-medium text-text-muted hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          type="button"
          onClick={onCancel}>
          Cancel
        </button>

        <Button
          disabled={!data?.ok || !hasDirty || hasError}
          loading={isPending}
          variant="primary"
          type="submit"
        >
          {isPending ? "Guardando..." : "Guardar cambios"}
        </Button>

      </div>

    </form>

  )
}


const init = {
  name: "",
  description: "",
  imageUrl: "",
  slug: "",
  recordStatusId: 0
}


const schema = {
  name: (v: string) => (v.trim().length < 3 ? inputMsg.minLength({ min: 3 }) : v.trim().length > 100 ? inputMsg.maxLength({ max: 100 }) : true),
  recordStatusId: (id: string) => +id !== 0 ? true : inputMsg.required()
}