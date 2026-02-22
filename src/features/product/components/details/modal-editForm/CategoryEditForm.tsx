import { useEffect, useState } from "react"
import { RenderCategoryTree } from "../../shared/productForm/select-category/RenderCategoryTree"
import { getCategory } from "@/src/action";
import { useStore } from "@/src/store/useStore";
import { CategoryTreeResponse } from "@/src/interfaces/category";
import { BtnSubmitLoading } from "@/src/components/ui";

type SelectedCategoryTree = { id: number, name: string, parentId?: number };


export const CategoryEditForm = () => {

  const modal = useStore(v => v.modalTypeProductDetails);
  const setModal = useStore(v => v.setModalTypeProductDetails);
  const data = useStore(V => V.productDetailsData);

  const [categoryTree, setCategoryTree] = useState<CategoryTreeResponse>();
  const [selectedCatgTree, setSelectedCatgTree] = useState<SelectedCategoryTree[]>(data ? data.categoriesDetails : []);

  useEffect(() => {

    if (!modal.id) return;

    getCategory({ categoryId: modal.id, typeProductCategory: true, q: { withChildren: true } })
      .then(v => {
        if (v.ok) {
          setCategoryTree(v.data!)
        }
      })


    return () => {
    }
  }, [modal.id])

  if (!categoryTree) return;

  return (
    <div>

      <div className="py-2 px-4">
        <span className="font-semibold text-lg text-white bg-indigo-400 px-2 py-1 rounded-2xl">
          {categoryTree.name}
        </span>
      </div>

      {
        RenderCategoryTree(setSelectedCatgTree, selectedCatgTree)
          (categoryTree.children, [{
            id: categoryTree.id,
            name: categoryTree.name,
            parentId: categoryTree.parentId ?? undefined
          }])
      }

      <div className="m-4 bg-white sticky bottom-0">
        <div className="p-4 bg-sky-100">
          <span className="font-semibold"> Seleccionados: </span>
          {selectedCatgTree.map(v => v.name).join(" > ")}
        </div>

        <div className="flex gap-5 justify-end mt-4">

          <button className="hover:text-black" type="button"
            onClick={() => setModal({ open: false })}
          > Cancelar
          </button>

          <BtnSubmitLoading
            // disabled={isSubmitting}
            title="Guardar cambios"
            loadingTitle="Guardando..."
            onClick={() => setSelectedCatgTree([])}
          />
        </div>

      </div>

    </div>
  )
}
