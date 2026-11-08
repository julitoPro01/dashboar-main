import { RecordStatusDb } from "@/src/shared/domains/recordStatus";

type Status =
    | "ALL"
    | "LOW_STOCK"
    | RecordStatusDb;

export type VariantFilters = {
    status: Status
}

export type VariantFiltersSearchParams={
    status?:string;
}

export type VariantFilterCounts = {
    draft: number;
    active: number;
    inactive: number;
    lowStock: number;
    archived: number;
    deleted: number;
};
