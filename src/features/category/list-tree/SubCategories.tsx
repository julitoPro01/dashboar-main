"use client";

import { useStore } from "@/src/store/useStore";

import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice/type";
import { ItemMainCategory } from "./sub-categories/ItemMainCategory";
import { MainCategory } from "@/src/store/categorySlice";
import type { CategoryTreeNode } from "../types";
import { CategoryTreeSkeleton, ItemTree } from "../shared/components";
import { useCategoryTrees } from "../shared/hooks";
import { CreateCategory } from "./sub-categories/CreateCategory";
import { NodeTree } from "./sub-categories/NodeTree";

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
  const { data, isLoading } = useCategoryTrees({ path: main.path });

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
      <div className=" flex flex-col h-full w-full ">

          <ItemMainCategory mainCategory={main} />
          
        <div className=" hover:scrollbar-thumb-active scrollbar-hide scrollbar-transparent overflow-auto h-full w-full">
          <div className="min-w-80">
            <div className="flex justify-end py-2 border-t border-border
               text-xs uppercase tracking-wide font-semibold text-text-subtle">

              <div className="w-40 flex justify-around">
                <span className="px-4">Estado</span>
                <span className="px-4">Nivel</span>
              </div>
            </div>

            {/* SUB CATEGORÍAS */}
            {
              isLoading
                ? <CategoryTreeSkeleton />
                : data[0]?.children.map((v: CategoryTreeNode) => {

                  return (
                    <div key={v.id} className="group">

                      {
                        v.isCreating
                          ? <CreateCategory id={v.id} />
                          :
                          <ItemTree
                            ctg={v}
                            selectedPaths={[v]}
                            isSelected={v.id === selectedId}
                            hasChildren={!!v.children.length}
                            onOpenFloatingMenu={handleOpenFloatingMenu}
                            isOpen
                            allowSelectingAll={true}
                          />

                      }
                      <NodeTree
                        selectedId={selectedId}
                        categoryTree={v.children}
                        selectedPaths={[v]}
                        allowSelectingAll={true}
                        onOpenFloatingMenu={handleOpenFloatingMenu}

                      />
                    </div>
                  )

                })
            }
          </div>
        </div>
      </div>
    </>
  )
}

