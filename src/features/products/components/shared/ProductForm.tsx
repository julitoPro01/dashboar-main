import { FormCard } from "@/src/shared/components/card"
import { IoDocumentTextOutline, IoInformationCircleOutline } from "react-icons/io5"
import { LongDescription, Name, ShortDescription, Sku, Slug, ImageGallery, CategorySelection, SupplierSelection } from "./product-form"
import { MdOutlineCategory } from "react-icons/md"
import { RiListIndefinite } from "react-icons/ri"

export const ProductForm = () => {

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 ">

      <div className="flex flex-col gap-6 col-span-2">
        <FormCard title="Información básica"
          titleIcon={<IoInformationCircleOutline />} >
          <Name />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" >
            <Sku />
            <Slug />
          </div>
          <ShortDescription />
        </FormCard>
      </div>

      <FormCard className="col-span-2 xl:col-span-1"
        title="Descripción detallada" titleIcon={<IoDocumentTextOutline />}>
        <LongDescription />
      </FormCard>

      <div className="col-span-2">
        <ImageGallery />
      </div>

      <FormCard className="col-span-2 xl:col-span-1"
        title="Categorización" titleIcon={<MdOutlineCategory />}>
        <CategorySelection />
        <SupplierSelection />
      </FormCard>

      <FormCard className="col-span-2 xl:col-span-3"
        title="Propiedades*" titleIcon={<RiListIndefinite />} >
        {null}
      </FormCard>
    </div>
  )
}
