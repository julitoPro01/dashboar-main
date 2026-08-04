import { IoDocumentTextOutline, IoInformationCircleOutline } from "react-icons/io5"
import { MdOutlineCategory } from "react-icons/md"
import { RiListIndefinite } from "react-icons/ri"
import { BasicInformation, Categorization, DetailedDescription, Gallery } from "./product-form"
import { FormCard } from "@/src/shared/form"

export const ProductForm = () => {

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 ">

      <FormCard className="col-span-2"
        title="Información básica"
        titleIcon={<IoInformationCircleOutline />} >
        <BasicInformation />
      </FormCard>

      <FormCard className="col-span-2 xl:col-span-1"
        title="Descripción detallada" titleIcon={<IoDocumentTextOutline />}>
        <DetailedDescription />
      </FormCard>

      <div className="col-span-2">
        <Gallery />
      </div>

      <FormCard className="col-span-2 xl:col-span-1"
        title="Categorización" titleIcon={<MdOutlineCategory />}>
        <Categorization />
      </FormCard>

      <FormCard className="col-span-2 xl:col-span-3"
        title="Propiedades*" titleIcon={<RiListIndefinite />} >
        {null}
      </FormCard>
    </div>
  )
}
