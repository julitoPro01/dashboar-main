"use client";

import { useStore } from "@/src/store/useStore";

import { RenderCategoryTree } from "./RenderCategoryTree";

import { useSubCategoryCache } from "../hooks/useSubCategoryCache";
import { useSubCategoriesQuery } from "../hooks/useSubCategoriesQuery";
import { useSubCategoryCreateForm } from "../hooks/useSubCategoryCreateForm";
import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice/interface";
import { ItemMainCategory } from "./ItemMainCategory";
import { MainCategory } from "@/src/store/categorySlice";

// import { CategoryTreeNode } from "../../../shared/category.type";
import { CategoryTreeSkeleton } from "../../shared/CategoryTreeSkeleton";
import { CategoryTreeNode } from "../../../shared/category.type";

//----------------
interface Props {
  user: { name: string, id: number }
}

export const SubCategories = ({ user }: Props) => {

  const mainCategory = useStore(v => v.selectedMainCategory);

  if (!mainCategory)
    return <p className="text-text-muted text-sm p-6">Seleccione una categoría</p>;

  return <Render user={user} mainCategory={mainCategory} />
}

interface RenderProps extends Props {
  mainCategory: MainCategory
}

const Render = ({ mainCategory: main, user }: RenderProps) => {


  const selected = useStore(v => v.selectedCategory);
  const setSelect = useStore(v => v.setSelectCategory);

  const setFloatingMenu = useStore(v => v.setFloatingPanel);
  const setMainChanges = useStore(v => v.setMainCategoryChanges);

  //#1 Hook para inicializar las subcategorías de la categoría principal seleccionada.
  const { data, status } = useSubCategoriesQuery(main.path);
  //#2 Hook para manejar la caché de las subcategorías, principalmente para agregar categoría temporal (dirty) y eliminar categoría en caso de que el nombre esté vacío al guardar. 
  const { addSubCategoryCache, deleteSubCategoryCache } = useSubCategoryCache(main.path)
  //#3 Hook para manejar la lógica de crear categoría (obtener datos del formulario, enviar la petición, mostrar notificaciones y callback para actualizar el estado después de crear la categoría).
  const { register, onCreate, nameValue } = useSubCategoryCreateForm(main.path);
  // se crea categoría temporal
  const onAddCatgDirty = (parentId: number) => {
    addSubCategoryCache(parentId, { id: Date.now(), name: "", level: 0, path: "", publicId: "" }, true);
  }

  const onSave = (id: number) => {
    if (!nameValue().trim()) deleteSubCategoryCache(id)
    else {
      onCreate({
        parentId: selected!.id,
        path: selected!.path,
        level: selected!.level,
        createdBy: user.name,
        createdById: user.id
      }, (ok) => {
        if (ok && selected?.id === main.id && !selected?.hasChildren) setMainChanges({ type: "update", values: { id: main.id, hasChildren: true } });
      });
    }

    setSelect(undefined);
  }

  const handleSelect = (selectedItems: CategoryTreeNode[], isFloat?: true, cx?: number, cy?: number) => {
    const ctg = selectedItems.at(-1)!
    if (isFloat) { setFloatingMenu({ type: FLOATING_PANEL_TYPE.CATEGORY, open: true, cx: cx!, cy: cy! }) }

    setSelect({
      id: ctg.id,
      publicId: ctg.publicId,
      name: ctg.name,
      hasChildren: ctg.children.length > 0,
      parentId: ctg.parentId ?? undefined,
      recordStatus: ctg.recordStatus.name,
      level: ctg.level,
      path: ctg.path,
      paths: [
        { id: main.id, name: main.name, recordStatus: main.recordStatus },
        ...selectedItems.map(v => ({ id: v.id, name: v.name, recordStatus: v.recordStatus.name }))],
      hasAttributes: !!ctg._count.categoryAttributes
    })
  }


  return (
    <>
      <div className="px-3 hover:scrollbar-thumb-active scrollbar-thin scrollbar-transparent overflow-auto h-full w-full">

        <div className=" min-w-min">

          <ItemMainCategory />

          {/* SUB CATEGORÍAS */}
          {
            status === "loading"
              ? <CategoryTreeSkeleton />
              : data[0]?.children.map(v => (
                <RenderCategoryTree
                  key={v.id}

                  categoryTree={v}
                  register={register}
                  selectedItems={[v]}
                  onSave={onSave}
                  onAddCatgDirty={onAddCatgDirty}

                  onSelect={handleSelect}
                  selectedId={selected?.id}
                />
              ))
          }

        </div>

      </div>
    </>
  )
}

