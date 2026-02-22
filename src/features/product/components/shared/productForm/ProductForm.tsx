import { LongDescriptionField, NameField, SelectSupplierField, ShortDescriptionField } from "./fields/Fields";
import { SelectMainCategory } from "./select-category/SelectMainCategory";
import { useState } from "react";
import { sleep } from "@/src/utils";
import { getCategory } from "@/src/action";
import { SelectSubCategories } from "./select-category/SelectSubCategories";
import { ImageSection } from "./image-upload/ImageSection";
import { BtnActions } from "./btn-action/BtnActions";
import { CategoryResponse, CategoryTreeResponse } from "@/src/interfaces/category";
import { ToastError } from "@/src/components/ui";
import { DynamicModal } from "@/src/components/modal";


interface Props {
  suppliers: {id:number, name:string,capability:string}[];
  mainCategories: CategoryResponse[];
}

export const ProductForm = ({ suppliers, mainCategories }: Props) => {


  const [modalOpen, setModalOpen] = useState(false);
  const [categoryTree, setCategoryTree] = useState<CategoryTreeResponse>();


  // Cargamos los subcategorias para mostrar en "Modal"
  const onSelectMainCategory = async (id: number) => {

    setModalOpen(true);
    await sleep(500)
    const res = await getCategory({ categoryId: id, typeProductCategory: true, q: { withChildren: true } });

    if (res.ok) {
      const data = res.data!;

      setCategoryTree(data)

    } else {
      ToastError({
        title: "Se produjo un error al cargar los datos requeridos, inténtelo nuevamente más tarde."
      });
      setModalOpen(false)
    }

  }

  return (
    <>
      <div className=" space-y-4">
        {/* CONTENEDOR 1 --- Nombre, Descripción corta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NameField />
          <ShortDescriptionField />
        </div>
        {/* CONTENEDOR 2 --- Proveedor, Estado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SelectSupplierField suppliers={suppliers} />
          {/* <SelectStatusField productStatuses={productStatuses} /> */}
        </div>

        {/* CAMPO --- Descripción larga */}
        <LongDescriptionField />


        {/*CONTENEDOR ----- Imagenes */}
        <ImageSection />

        <SelectMainCategory
          mainCategories={mainCategories} onSelectCategory={onSelectMainCategory} />


      </div>

      <DynamicModal
        title={categoryTree?.name ? "Seleccione la categoría mas específica" : "Cargando..."}
        modalOpen={modalOpen}
        onCloseModal={() => { setModalOpen(false) }}
        inactiveClose={true}
      >
        {
          categoryTree &&
          <SelectSubCategories
            onCloseModal={() => { setModalOpen(false), setCategoryTree(undefined) }}
            categoryTree={categoryTree} />
        }
      </DynamicModal>

      <BtnActions />
    </>
  )
}
