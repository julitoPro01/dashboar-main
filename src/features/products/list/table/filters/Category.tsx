import { DynamicModal } from "@/src/shared/components/modal";
import { CellTitle } from "@/src/shared/table/core";
import { OpenFilterButton } from "@/src/shared/table/filters";
import { useStore } from "@/src/store/useStore";
import { useState } from "react"

export const Category = () => {

  const categoryId = useStore(v => v.productFilters.categoryId)
  const [open, setOpen] = useState(false);

  // const { data, status } = useCategoryTrees({
  //   notInStatus: ["DELETED", "DRAFT"]
  // }, open)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleConfirm = () => {

  }


  return (
    <>
      <CellTitle title="Categoría">
        <OpenFilterButton
          active={open}
          onClick={handleOpen}
        />
      </CellTitle>

      <DynamicModal
        title="Seleccionar categoría"
        sizeTitle="2xl"
        open={open}
        onClose={handleClose}
      >
        {/* {
          status === "loading" && <div className="p-6"><CategoryTreeSkeleton /></div>
        }
        {
          status === "success" &&
          <CategoryTreeSelector
            categoryTree={data}
            categoryId={categoryId}
            onConfirm={handleConfirm}
          />
        } */}

      </DynamicModal>

    </>
  )
}
