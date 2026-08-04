"use client";

import { useStore } from "@/src/store/useStore";

import { RenderCategoryTree } from "./sub-categories/RenderCategoryTree";

import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice/interface";
import { ItemMainCategory } from "./sub-categories/ItemMainCategory";
import { MainCategory } from "@/src/store/categorySlice";
import type { CategoryTreeNode } from "../types";
import { CategoryTreeSkeleton } from "../shared/components";
import { useCategoryTrees } from "../shared/hooks";

export const SubCategories = () => {

  const mainCategory = useStore(v => v.selectedMainCategory);

  if (!mainCategory)
    return <p className="text-text-muted text-sm p-6">Seleccione una categoría</p>;

  return <Render mainCategory={mainCategory} />
}

interface RenderProps {
  mainCategory: MainCategory
}

const Render = ({ mainCategory: main }: RenderProps) => {

  const selectedId = useStore(v => v.selectedCategory?.id);
  const setSelect = useStore(v => v.setSelectCategory);
  const setFloatingMenu = useStore(v => v.setFloatingPanel);
  
  
  // //#1 Hook para inicializar las subcategorías de la categoría principal seleccionada.
  const { data, isLoading } = useCategoryTrees({path:main.path});

  // --- SELECCIONAMOS Y ABRIMOS EL MENU FLOTANTE
  const handleOpenFloatingMenu = (items: CategoryTreeNode[], cx: number, cy: number) => {

    setFloatingMenu({ type: FLOATING_PANEL_TYPE.CATEGORY, open: true, cx: cx!, cy: cy! });

    const ctg = items.at(-1)!;

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
        ...items.map(v => ({ id: v.id, name: v.name, recordStatus: v.recordStatus.name }))],
      hasAttributes: !!ctg._count.categoryAttributes
    });

  }


  return (
    <>
      <div className="px-3 hover:scrollbar-thumb-active scrollbar-thin scrollbar-transparent overflow-auto h-full w-full">

        <div className=" min-w-min">

          <ItemMainCategory mainCategory={main} />

          {/* SUB CATEGORÍAS */}
          {
            isLoading
              ? <CategoryTreeSkeleton />
              : data[0]?.children.map(v => {

                return (<RenderCategoryTree
                  key={v.id}

                  categoryTree={v}
                  selectedItems={[v]}
                  selectedId={selectedId}
                  onOpenFloatingMenu={handleOpenFloatingMenu}
                />)
                
              })
          }
        </div>

      </div>
    </>
  )
}

