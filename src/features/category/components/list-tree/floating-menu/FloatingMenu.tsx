"use client";

import { FloatingPanel, Tooltip } from "@/src/shared/components/floating";
import { ToastModal } from "@/src/shared/components/toaster/ToastModal";
import { useStore } from "@/src/store/useStore";
import { Delete } from "./Delete";
import { toast } from "sonner";
import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice/interface";
import { Button } from "@/src/shared/components/btn";
import { useSubCategoryCache } from "../hooks/useSubCategoryCache";
import { useFloatingMenuAction } from "../hooks/useFloatingMenuAction";
import { ActiveInput } from "./ActiveInput";

export const FloatingMenu = () => {

  const mainCategoryPath = useStore(v => v.selectedMainCategory?.path) || "";

  const deleteSubCategoryCache = useSubCategoryCache(mainCategoryPath).deleteSubCategoryCache;

  const { onDetails, onEdit, onManageAttrs, onNewCtg, selected, setSelect } = useFloatingMenuAction(mainCategoryPath)

  const onDelete = () => {
    if (!selected) return;
    const { id, parentId, name } = selected
    toast.dismiss();

    ToastModal({
      title: `Eliminar categoría "${name}"`,
      contendNode: <Delete id={id} parentId={parentId} deleteSubCategoryCache={() => deleteSubCategoryCache(id)} />,
      activeBtnClose: true
    })
  }

  const parentStatus = selected?.paths.find(v => v.id === selected.parentId)?.recordStatus;

  const isNotAvailableToDelete = selected?.hasChildren || selected?.hasAttributes || selected?.recordStatus !== "DRAFT" && selected?.recordStatus !== "DELETED"
  const isAvailableForUse = (parentStatus !== "DRAFT" && parentStatus !== "DELETED") && (selected?.recordStatus !== "DRAFT" && selected?.recordStatus !== "DELETED");

  return (
    <FloatingPanel onEffectClose={() => setSelect()} panelType={FLOATING_PANEL_TYPE.CATEGORY}>

      <div className="p-2 flex flex-col text-text">
        {/* #1 */}
        <Button onClick={onDetails} variant="ghost" position="start">Ver detalles</Button>
        {/* #2 */}
        <Button variant="ghost" position="start" onClick={onEdit}>Editar</Button>
        {/* #3 */}
        <Button variant="ghost" position="start" disabled={selected?.hasAttributes}
          onClick={onNewCtg}>Nueva categoría</Button>
        {/* #4 */}
        <Tooltip text={selected?.hasChildren ? "No disponible" : ""} position="bottom">
          <Button onClick={() => onManageAttrs()} variant="ghost" position="start" disabled={selected?.hasChildren} >
            Administrar atributos
          </Button>
        </Tooltip>
        {/* #5 */}
        <Tooltip
          text={isNotAvailableToDelete ? "No disponible" : undefined}
          position="bottom" >
          <Button variant="ghost" position="start" className="w-full"
            disabled={isNotAvailableToDelete}
            onClick={onDelete} >Eliminar</Button>
        </Tooltip>
        {/* #6 */}
        {
          isAvailableForUse && <>
            <ActiveInput status={selected?.recordStatus ?? "DRAFT"} id={selected?.id ?? 0} isParent={!selected?.parentId} />
          </>
        }

      </div>
    </FloatingPanel>
  )
}
