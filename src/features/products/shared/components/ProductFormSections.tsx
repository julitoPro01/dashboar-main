
import { ComponentType } from "react"
import { BasicInformation, Categorization, DetailedDescription, Gallery, SystemAttributes, CustomAttributes } from "./product-form"

type ProductSection =
  | "BasicInformation"
  | "DetailedDescription"
  | "Gallery"
  | "Categorization"
  | "SystemAttributes"
  | "CustomAttributes"

export const ProductFormSections = {
  BasicInformation,
  DetailedDescription,
  Gallery,
  Categorization,
  SystemAttributes,
  CustomAttributes
} satisfies Record<ProductSection, ComponentType>;