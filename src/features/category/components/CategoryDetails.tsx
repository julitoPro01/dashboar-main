"use client";

import { useStore } from "@/src/store/useStore"
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CardInfoCatg, CardInfoRelation } from "./category-details/info";
import { DropMenu, EditableFields, FooterBtnActions, UploadImage } from "./category-details";
import { IoIosCheckmark, IoIosClose } from "react-icons/io";
import { deleteCategory, getCategory, hasReferencesCategory, updateCategory } from "@/src/action";
import { usePathname, useRouter } from "next/navigation";
import { errorMessages, getToastStyle } from "@/src/constants";
import { toast } from "sonner";
import { sleep } from "@/src/utils";
import { CategoryResponse } from "@/src/interfaces/category";
import { ToastError, ToastModal, ToastSuccess } from "@/src/components/ui";


//--------
interface Props {
  categoryStatus: any[];
  user: { name: string, id: number }
}

export const CategoryDetails = ({ categoryStatus, user }: Props) => {

  const toastId_ref = useRef<number | undefined | string>(undefined);
  const pathName = usePathname();
  const router = useRouter()

  //TODO: 
  const childrenCategory = useStore(v => v.childrenCategories);
  const selectedCategory = useStore(v => v.selectedCategory);
  const setHistoryCategory = useStore(v => v.setHistoryCategory);

  const parendCategory = childrenCategory.find(v => v.id === selectedCategory?.parentId);
  //TODO: para guardar cache antes de habilitar "Actualizar"
  const prevCatg_ref = useRef<InitDetailsForm | undefined>(undefined);

  const [isFormDisabled, setFormDisabled] = useState(true);

  const { register, setValue, watch, setFocus, getValues, reset, handleSubmit } = useForm<InitDetailsForm>({
    disabled: isFormDisabled
  });


  // Efectos 
  const imgUrl = watch("imageUrl");

  const onSubmitSave = async (state: InitDetailsForm) => {
    if (!selectedCategory) return;

    const { id, ...category } = state;

    // Estado para todo los hijos
    const pendingStatusId = categoryStatus.find(v => v.name === "PENDING_REVIEW")!.id

    const res = await updateCategory({
      data: { ...category, recordStatusId: +category.recordStatusId },
      id,
      childrenStatusId: pendingStatusId,
      audi: { updateBy: user.name, updateById: user.id }
    });

    if (res.ok) {

      const data = res.data!;

      setFormDisabled(true);


      // si no tiene valor = es categoría principal
      const isMainCategory = !selectedCategory.parentId;
      if (isMainCategory)
        setHistoryCategory("updateMain", {
          ...selectedCategory,
          recordStatusId: data.recordStatusId
        })
      else {
        setHistoryCategory("updateSub", {
          ...selectedCategory,
          recordStatusId: data.recordStatusId
        })
      }

      toastSuccess();
    } else {
      toastError();
    }
  }

  const onDelete = async () => {

    const catg = getValues();

    const errorServerMsg = errorMessages.generic;
    const loadingMsg = "Buscando referencias....";

    const yesDelTitleMsg = "Eliminar Categoría ⚠️";
    const notDelTitleMsg = "No disponible";

    const yesDelDescMsg = `La categoría "${catg.name}" se eliminará de forma permanente.`;
    const notDelDescMsg = "La categoría tiene referencias asociadas."


    const loadingId = toast.loading(loadingMsg, {
      style: getToastStyle("loading")
    })

    await sleep(1000)
    toast.dismiss(loadingId);
    await sleep(500)

    const res = await hasReferencesCategory({ id: catg.id });
    const isOkey = res.ok && !res.data!.hasReferences

    const title = (res.ok && !res.data!.hasReferences)
      ? yesDelTitleMsg
      : (res.ok && res.data!.hasReferences)
        ? notDelTitleMsg
        : errorServerMsg.title

    const description = (res.ok && !res.data!.hasReferences)
      ? yesDelDescMsg
      : (res.ok && res.data!.hasReferences)
        ? notDelDescMsg
        : errorServerMsg.description


    toastId_ref.current = ToastModal({
      title,
      action: {
        title: "Confirmar",
        disabled: !isOkey,
        func: async () => {
          if (!isOkey) return

          toast.dismiss(toastId_ref.current)
          await sleep(500)

          const load = toast.loading("Eliminando categoría...", { style: getToastStyle("loading") })
          const del = await deleteCategory({ id: catg.id });

          await sleep(1000);
          toast.dismiss(load)

          if (del.ok) {
            const data = del.data!
            const isMainCategory = !data.parentId
            toast.success("Categoría eliminado correctamente", { style: getToastStyle("success") });
            // si no existe la categoría padre = es categoría principal
            if (isMainCategory)
              router.refresh()
            else {
              setHistoryCategory("deleteSub", {
                id: data.id,
                name: data.name,
                recordStatusId: data.recordStatusId,
                parentId: data.parentId!
              })
            }
          }
          else
            toast.error(errorServerMsg.description, { style: getToastStyle("error") });
        }
      },
      activeBtnClose: true,
      contendNode: description
    });


  }

  const onActivateEditing = () => {
    // guardamos el objeto para restaurar luego
    prevCatg_ref.current = structuredClone(getValues());

    setFormDisabled(false);
    setTimeout(() => {
      setFocus("description")
    })
  }

  const onCancel = () => {
    reset(prevCatg_ref.current);
    setFormDisabled(true);
    // Eliminamos el objeot una vez restaurado
    prevCatg_ref.current = undefined
  }

  // Cerrar toast si cambia de ruta.

  useEffect(() => {

    return () => {
      if (toastId_ref.current) {
        toast.dismiss(toastId_ref.current)
      }
    }

  }, [pathName])


  // Cargamos los detalles de categoría
  useEffect(() => {
    if (selectedCategory) {
      getCategory({ categoryId: selectedCategory.id })
        .then(v => {
          if (v.ok) {
            const { children, ...rest } = v.data!;
            reset(rest);
          }
        })
    }

  }, [JSON.stringify(selectedCategory)])


  return (

    <form onSubmit={handleSubmit(onSubmitSave)} >

      {
        (selectedCategory)
          ?
          <>
            <DropMenu
              title="Categoría"
              onDelete={onDelete}
              isEditing={!isFormDisabled}
              onActivateEditing={onActivateEditing}
            />


            <div className="px-6 py-10 flex flex-col gap-5">

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" >
                <CardInfoCatg name={selectedCategory.name} slug={getValues("slug")} />
                {
                  childrenCategory.length > 0
                  &&
                  <CardInfoRelation relation={[...childrenCategory]} />
                }
              </div>

              {/* CONTENEDOR */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                {/* PANEL IZQUIERDO */}
                {/* CAMPOS EDITABLES */}
                <EditableFields
                  categoryStatus={categoryStatus}
                  register={register}
                  disabled={!isFormDisabled}
                  parentStatusId={parendCategory?.recordStatusId}
                />

                {/* IMAGEN */}
                <UploadImage
                  onUpdateImg={(imgUrl) => setValue("imageUrl", imgUrl)}
                  onResetField={() => setValue("imageUrl", "")}
                  imgUrl={imgUrl}
                  disabled={isFormDisabled}
                />
              </div>

              {/* CAMPO - ES CATEGORIA DE PRODUCTO */}
              <div className="p-4 bg-white rounded-xl  border border-slate-200">
                <label className="flex items-center gap-3 text-sm font-semibold  text-slate-700">
                  {
                    isFormDisabled
                      ?
                      (
                        getValues("isProductCategory")
                          ? <IoIosCheckmark size={30} color="orange" />
                          : <IoIosClose size={30} color="orange" />
                      )
                      :
                      <input type="checkbox" {...register("isProductCategory")} />
                  }
                  <span> Es categoría de productos </span>
                </label>
              </div>

            </div>

            {/* FOOTER */}
            {
              (!isFormDisabled)
              &&
              < FooterBtnActions
                onCancel={onCancel}
                disabled={!isFormDisabled}
              />
            }
          </>
          :
          <p className="p-4 text-gray-500"> Seleccione una categoría para ver más detalles. </p>
      }

    </form>

  )
}


export interface InitDetailsForm extends CategoryResponse { }



const toastSuccess = () => {
  const title = "Categoría actualizado"

  ToastSuccess({
    title: title,
    activeBtnClose: true,
  }, { duration: 10000 });
}

const toastError = () => {
  const title = "Error al actualizar"

  const descr = "No fue posible actualizar la categoría."
  ToastError({
    title,// "Error al agregar",
    description: descr,// "No se pudo conectar al servidor.",
    activeBtnClose: true,
  }, { duration: 8000 });

}