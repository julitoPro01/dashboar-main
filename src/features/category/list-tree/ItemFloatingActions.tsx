"use client";

import { FloatingPanel, Tooltip } from "@/src/shared/components/floating";
import { useStore } from "@/src/store/useStore";
import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice/type";
import { Button } from "@/src/shared/components/btn";
import { useItemFloatingAction } from "../shared/hooks";
import { ActiveInput } from "./itemFloating-action/ActiveInput";


export const ItemFloatingActions = () => {

  const mainCategoryPath = useStore(v => v.selectedMainCategory?.path) || "";

  const selected = useStore(v => v.selectedCategory);
  const setSelect = useStore(v => v.setSelectCategory);

  const {
    handleDetails, handleEdit, handleDelete,
    handleManageCategoryAttrs, handleNewCategory
  } = useItemFloatingAction(mainCategoryPath);

  const parentStatus = selected?.paths.find(v => v.id === selected.parentId)?.recordStatus;

  const isNotAvailableToDelete = selected?.hasChildren || selected?.hasAttributes || selected?.recordStatus !== "DRAFT" && selected?.recordStatus !== "DELETED"
  const isAvailableForUse = (parentStatus !== "DRAFT" && parentStatus !== "DELETED") && (selected?.recordStatus !== "DRAFT" && selected?.recordStatus !== "DELETED");

  return (

    <FloatingPanel
    onEffectClose={() => setSelect()} panelType={FLOATING_PANEL_TYPE.CATEGORY}>
      {
        !selected
          ? <span className="text-text-muted p-2">Categoría no seleccionado</span>
          :
          <div className="p-2 flex flex-col text-text bg-surface-black">
            {/* #1 */}
            <Button onClick={() => handleDetails(selected.publicId)} variant="ghost" position="start">Ver detalles</Button>
            {/* #2 */}
            <Button variant="ghost" position="start" onClick={() => handleEdit(selected.id, selected.name)}>Editar</Button>
            {/* #3 */}
            <Button variant="ghost" position="start" disabled={selected?.hasAttributes}
              onClick={() => handleNewCategory(selected.id)}>Nueva categoría</Button>
            {/* #4 */}
            <Tooltip text={selected?.hasChildren ? "No disponible" : ""} position="bottom">
              <Button onClick={() => handleManageCategoryAttrs(selected.id, selected.paths)} variant="ghost" position="start" disabled={selected?.hasChildren} >
                Administrar atributos
              </Button>
            </Tooltip>
            {/* #5 */}
            <Tooltip
              text={isNotAvailableToDelete ? "No disponible" : undefined}
              position="bottom" >
              <Button variant="ghost" position="start" className="w-full"
                disabled={isNotAvailableToDelete}
                onClick={() => handleDelete({
                  selectedId: selected.id,
                  name: selected.name,
                  parentId: selected.parentId
                })} >Eliminar</Button>
            </Tooltip>
            {/* #6 */}
            {
              isAvailableForUse && <>
                <ActiveInput status={selected?.recordStatus ?? "DRAFT"} id={selected?.id ?? 0} isParent={!selected?.parentId} />
              </>
            }

          </div>
      }
    </FloatingPanel>
  )
}
