import { MetaPagination } from "@/src/shared/table";
import { AttributeDataTypeDb } from "../../attribute-definition/types";
import { CategoryAttrDisplayGroupDb } from "./categoryAttr";

export type CategoryAttrResponse = {
    id: number;
    name: string;
    dataType: AttributeDataTypeDb;
    isActive: boolean;
    isRequired: boolean;
    isFilter: boolean;
    displayOrder: number | null;
    isVariant: boolean;
    displayGroup:CategoryAttrDisplayGroupDb;
}

export type CategoryAttrsResponse = {
    categoryAttrs: CategoryAttrResponse[];
    meta: MetaPagination;
}