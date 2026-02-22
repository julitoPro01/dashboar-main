"use client";

import { useStore } from "@/src/store/useStore";
import { useFieldArray, useForm } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import { BiPlus } from "react-icons/bi";
import clsx from "clsx";
import { BtnEdit, BtnNewCategory, Form } from "./sub-categories";
import { addCategory, getCategory, updateCategory } from "@/src/action";
import { useEffect, useRef } from "react";
import { CategoryStatusBadgeConfig } from "../constants";
import { toast } from "sonner";
import { TreeCategories, newSubCategory, removeCategory, updateAllChildren, updateCategoryTree, } from "../utils/categoryTreeUpdate";
import { categoryStatusGroup } from "../utils";
import { UpsertCategory } from "@/src/interfaces/category";
import { ToastError, ToastSuccess } from "@/src/components/ui";

type Category = {
  id: number;
  name: string;
  recordStatusId: number;
  parentId?: number | null
}



export interface InitSubCatgForm {
  fieldName: string;
  treeCategories: TreeCategories[];
  option: { activeInputId: number }
}
const initState: InitSubCatgForm = { fieldName: "", treeCategories: [], option: { activeInputId: 0 } }

//----------------
interface Props {
  categoryStatus: any[];
  user: { name: string, id: number }
}

export const SubCategories = ({ categoryStatus, user }: Props) => {

  const mainCategory = useStore(v => v.mainCategory);
  const selectedCategory = useStore(v => v.selectedCategory);
  const lastSubDelete = useStore(v => v.historyCategory.lastSubDelete);
  const lastSubUpdate = useStore(v => v.historyCategory.lastSubUpdate);
  const setSelectCategory = useStore(v => v.setSelectCategory);
  const setChildrenCategory = useStore(v => v.setChildrenCategory);

  const { register, control, watch, setValue, getValues } = useForm<InitSubCatgForm>({ defaultValues: initState });
  const { fields, append, replace } = useFieldArray({ control, name: "treeCategories", keyName: "customId" });

  const statusGroup_Ref = useRef(categoryStatusGroup(categoryStatus))

  // AGREGAMOS campo temporal
  const onAddCatgDirty = (parentCatgId: number = 0) => {
    const categories = getValues("treeCategories");
    const fieldDirty: Category = {
      id: Date.now(),
      name: "",
      recordStatusId: 0
    }

    if (parentCatgId)
      replace(newSubCategory(categories, parentCatgId, { ...fieldDirty, children: [] }))
    else
      append({ ...fieldDirty, children: [] });

    setValue("option.activeInputId", fieldDirty.id);
  }
  // SELECCIONAMOS
  const onSelectedCatg = (category: Category, topCategory?: TreeCategories[]) => {
    if (!mainCategory) return;

    const selectedCatg = {
      id: category.id,
      name: category.name,
      recordStatusId: category.recordStatusId,
      parentId: category.parentId ?? undefined
    }

    setSelectCategory(selectedCatg);

    if (topCategory)
      setChildrenCategory([
        { ...mainCategory },
        ...topCategory.map(v => ({ id: v.id, name: v.name, recordStatusId: v.recordStatusId })),
        { ...selectedCatg }
      ])
    else
      setChildrenCategory([]);

  }
  // ACTIVAMOS el editor de campo
  const onActiveUpdate = (name: string, id: number) => {
    setValue("option.activeInputId", id);
    setValue("fieldName", name)

  }
  // AGREGAMOS
  const AddCategory = async (name: string, categoryId: number, parentId: number) => {

    const { draft, pendingStatus, publicStatus } = statusGroup_Ref.current

    const addState: UpsertCategory = {
      name,
      slug: name.replaceAll(" ", "-"),
      recordStatusId: draft.id,
      parentId: parentId
    };

    const res = await addCategory(addState, { createdBy: user.name, createdById: user.id });

    if (res.ok) {
      const { id, name, recordStatusId, parentId } = res.data!;

      const categories = getValues("treeCategories");
      // Actualizamos el arbol
      replace(updateCategoryTree({
        catgsTree: categories,
        id: categoryId,
        newCatg: { id, name, recordStatusId, parentId },
        pendingRecordStatusId: pendingStatus.id,
        publicStatus
      }));
      // Reiniciamos el formulario
      setValue("option.activeInputId", 0);
      setTimeout(() => setValue("fieldName", ""), 100);

      // Cerramos cualquier "toast que este abierto"
      toast.dismiss()

      toastSuccess("create");


    } else {

      toastError("create")
    }
  }

  // ACTUALIZAMOS
  const UpdateCategory = async (newName: string, parentId: number, category: Category) => {

    const { pendingStatus, publicStatus } = statusGroup_Ref.current

    // nuevo estado
    const updateState: UpsertCategory = {
      name: newName,
      slug: newName.replaceAll(" ", "-"),
      recordStatusId: publicStatus.some(v => v.id === category.recordStatusId) ? pendingStatus.id : category.recordStatusId,
      parentId: parentId
    };

    const res = await updateCategory({
      data: updateState,
      id: category.id,
      childrenStatusId: pendingStatus.id,
      audi: { updateBy: user.name, updateById: user.id }
    })

    if (res.ok) {

      const { id, name, recordStatusId, parentId } = res.data!;
      const categories = getValues("treeCategories");

      // Actualizamos el arbol
      replace(updateCategoryTree({
        catgsTree: categories,
        id: category.id,
        newCatg: { id, name, recordStatusId, parentId },
        pendingRecordStatusId: pendingStatus.id,
        publicStatus
      }));


      // Reiniciamos el formulario
      setValue("option.activeInputId", 0);
      setTimeout(() => setValue("fieldName", ""), 100);

      // Cerramos cualquier "toast que este abierto"
      toast.dismiss()

      toastSuccess("update");

      if (selectedCategory?.id === id) {
        setSelectCategory({
          id,
          name,
          recordStatusId,
          parentId: parentId ?? undefined
        })
      }

    } else {
      toastError("update")
    }

  }

  const onSubmit = (treeCategory: TreeCategories, parentId?: number) => {

    const { children, ...category } = treeCategory;

    const newParentId = parentId ?? mainCategory!.id;
    const newName = getValues("fieldName").trim();

    const existsCategory = category.name;
    // Si existe, lo actualizamos
    if (existsCategory && !!newName) {

      if (newName !== category.name) {
        UpdateCategory(newName, newParentId, category);
      } else
        setValue("option.activeInputId", 0)

    }
    // Si no existe, pero, si hay nuevo valor, lo creamos
    else if (!!newName) {
      AddCategory(newName, category.id, newParentId)

    }
    // Eliminamos si no existe y no hay nuevo valor
    else if (!existsCategory && !newName) {
      const categories = getValues("treeCategories");
      replace(removeCategory(categories, category.id))
    }
    // No hacemos nada
    else {
      setValue("option.activeInputId", 0);
    }
  }

  // CONSULTAMOS el arbol de sub-categorías
  useEffect(() => {
    // si existe
    if (mainCategory) {
      getCategory({ q: { withChildren: true }, categoryId: mainCategory.id })
        .then(v => {

          if (v.ok) {
            const data = v.data!.children;
            replace(data)
          }
          else
            ToastError({
              title: "¡Error!",
              description: "Se produjo un error al cargar los datos, inténtelo nuevamente más tarde."
            })

        });

    }

  }, [mainCategory?.id, mainCategory?.name]);

  // ACTUALIZAMO 
  // si la categoría seleccionada es la catg-principal
  // Escuchamos los cambios desde "MainCategoris.jsx"
  useEffect(() => {

    const selectedCatgId = selectedCategory?.id;
    // Si la categoría principal seleccionada cambia y es igual a la categoría seleccionada = true
    if (mainCategory && mainCategory?.id === selectedCatgId) {
      // Actualizamos la categoría seleccionada
      setSelectCategory(mainCategory);

      // Actualizamos todos los estados de los hijos a estado pendiente
      const categories = getValues("treeCategories");
      const validateStateToChange = categoryStatus.filter(v => (v.name === "ACTIVE" || v.name === "FEATURED" || v.name === "TEMPORARY"))
      const pendingId = categoryStatus.find(v => v.name === "PENDING_REVIEW")!.id;
      replace(updateAllChildren(categories, pendingId, validateStateToChange))
    }

  }, [mainCategory])


  // ACTUALIZAMOS
  //  la lista de los sub-categorías
  // en base al último cambio del historial de "actualizado"
  useEffect(() => {
    const history = lastSubUpdate;
    if (!history) return;

    const isUpdateSelectedStatusId = (history.id === selectedCategory?.id);
    if (isUpdateSelectedStatusId) {

      const { pendingStatus, publicStatus } = statusGroup_Ref.current;
      const categories = getValues("treeCategories");

      replace(updateCategoryTree({
        catgsTree: categories,
        id: history.id,
        newCatg: history,
        pendingRecordStatusId: pendingStatus.id,
        publicStatus
      }));

    }

  }, [lastSubUpdate])

  // ACTUALIZAMOS 
  // la lista de los sub-categorías
  // en base al último cambio del historial de "eliminado"
  useEffect(() => {
    const history = lastSubDelete;
    if (!history) return;
    const categories = getValues("treeCategories");
    replace(removeCategory(categories, history.id));
    setSelectCategory(undefined)

  }, [lastSubDelete?.id]);


  const options = watch("option");
  const renderCategories = (categories: TreeCategories[], prevCat: TreeCategories[], parentId?: number) => {
    return <ul className="pl-5 relative  ">
      {
        categories.map((val) => {
          const isActiveInput = options.activeInputId === val.id;
          const status = categoryStatus.find(v => v.id === val?.recordStatusId);
          const badgeStatus = status ? CategoryStatusBadgeConfig[status.name] : undefined;


          return (
            <li key={val.id} className={`flex flex-col justify-start px-2 border-s-2 ${badgeStatus ? badgeStatus.border : "border-gray-300"}`}>

              <div className="flex w-full max-w-md">
                <div className={clsx("py-2 my-1 rounded-xl relative  hover:bg-white flex-1  cursor-pointer group  flex   items-center  min-h-8 ",
                  {
                    "bg-white border border-amber-400 ": selectedCategory?.id === val.id,
                    "border border-transparent": selectedCategory?.id !== val.id,
                    "pe-20": options.activeInputId !== val.id,
                    "pe-5": options.activeInputId === val.id,

                  }
                )}
                  onClick={() => {
                    const { children, ...category } = val;
                    onSelectedCatg(category, prevCat)
                  }}
                >
                  {
                    val.children.length > 0
                      ? <div className=" h-full relative ">
                        <IoIosArrowDown className={`w-5   text-gray-400 h-full`} />
                        <span className={`w-5 pl-1 absolute -bottom-3.5 border ${badgeStatus ? badgeStatus.border : ""} text-gray-400`} />
                      </div>
                      : <span className="w-5"></span>
                  }
                  {
                    isActiveInput
                      ?
                      <Form register={register} onSubmit={() => { onSubmit(val, parentId) }} />
                      : <>
                        <p className={`w-auto  stacked truncate px-2 `}>
                          {val.name}
                          {
                            badgeStatus &&
                            <span className={`text-xs ml-20 px-1 rounded border ${badgeStatus.bg} ${badgeStatus.border} ${badgeStatus.text} bg-amber-300`}> {badgeStatus.label} </span>
                          }
                        </p>

                        <BtnNewCategory onClick={() => onAddCatgDirty(val.id)} />

                        <BtnEdit onClick={() => onActiveUpdate(val.name, val.id)} />
                      </>
                  }
                </div>

              </div>
              {renderCategories(val.children, [...prevCat, val], val.id)}

            </li>
          )
        })
      }
    </ul>
  }


  const status = categoryStatus.find(v => v.id === mainCategory?.recordStatusId);
  const badgeStatus = status ? CategoryStatusBadgeConfig[status.name] : undefined;
  const mainSelectedCatg = selectedCategory?.id === mainCategory?.id;

  return (

    <div className=" py-2">
      {
        mainCategory
          ?
          <div className=" flex justify-start items-center bg-slate-100 pl-5 ">
            <div className={`flex items-center border-b-2 ${badgeStatus ? badgeStatus.border : ""}`}>
              <button className={clsx(`truncate rounded-xl border my-1  hover:bg-white px-4 cursor-pointer py-2`, {
                [`bg-white border-amber-400`]: mainSelectedCatg,
                "border-slate-100": !mainSelectedCatg
              })}
                onClick={() => onSelectedCatg(mainCategory)}
              >

                <span className=" truncate">{mainCategory?.name}
                  {
                    badgeStatus &&
                    <span className={`text-xs ml-4 px-1 border rounded ${badgeStatus.bg} ${badgeStatus.border} ${badgeStatus.text} bg-amber-300`}> {badgeStatus.label} </span>
                  }
                </span>
              </button>
              <button className={` cursor-pointer text-gray-500 hover:text-black px-1 py-2`}
                onClick={() => onAddCatgDirty()}>
                <BiPlus size={24} />
              </button>
            </div>
          </div>
          :
          <p className="p-4 text-gray-500"> Seleccione una categoría para ver más detalles. </p>
      }

      {
        (mainCategory && fields.length > 0)
        && renderCategories(fields, [])
      }

    </div>

  )
}




const toastSuccess = (type: "update" | "create") => {
  const title = type === "create"
    ? "Nueva categoría agregada"
    : "Categoría actualizado"

  ToastSuccess({
    title: title,
    activeBtnClose: true,
  }, { duration: 10000 });
}

const toastError = (type: "update" | "create") => {
  const title = type === "create"
    ? "Error al agregar"
    : "Error al actualizar"

  const descr = type === "create"
    ? "No fue posible crear la categoría."
    : "No fue posible actualizar la categoría."
  ToastError({
    title,// "Error al agregar",
    description: descr,// "No se pudo conectar al servidor.",
    activeBtnClose: true,
  }, { duration: 8000 });

}