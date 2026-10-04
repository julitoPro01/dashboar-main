import { CategoryTreeSelector } from "@/src/features/category/shared/components";
import { CatgTreeSelectorSelected } from "@/src/features/category/types";
import { DynamicModal } from "@/src/shared/components/modal";
import { CellTitle } from "@/src/shared/table/core";
import { AppliedFilterLabel, OpenFilterButton, SearchInput, useSearchFilter } from "@/src/shared/table/filters";
import { useStore } from "@/src/store/useStore";
import { useState } from "react"


export const Category = () => {

  const setFilter = useStore(v => v.setProductFilters)

  const [selected, setSelected] = useState<CatgTreeSelectorSelected>()

  const [open, setOpen] = useState(false);

  const { value, valueApplied, handleClean, handleSearch } = useSearchFilter();


  const handleOpen = () => {
    setOpen(true)
  }

  const handleReset = () => {
    setSelected(undefined);
    setFilter({}, { categoryId: true })
  }

  const handleConfirm = ({ id, name, path, paths, isParent }: CatgTreeSelectorSelected) => {
    setSelected({ id, name, path, paths, isParent });
    setFilter({ categoryId: id })
    setOpen(false)
  }


  return (
    <>
      <CellTitle title="Categoría">
        <OpenFilterButton
          active={open}
          onClick={handleOpen}
        />
      </CellTitle>

      {!open && selected && <AppliedFilterLabel label={selected.name} onClick={handleReset} />}

      <DynamicModal open={open} onClose={() => setOpen(false)} fixedHeight
        size="4xl"
        Search={<SearchInput
          value={value}
          placeholder="Buscar categoría... (min.3)"
          onChange={handleSearch}
          onClear={handleClean}
        />}
      >
        {/* {null} */}
        <CategoryTreeSelector
          categoryId={selected?.id}
          paths={selected?.paths}
          name={selected?.name}
          path={selected?.path}
          onConfirm={handleConfirm}
          search={valueApplied}
          allowSelectingAll
        />

      </DynamicModal>

    </>
  )
}
