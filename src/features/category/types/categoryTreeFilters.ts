import { RecordStatusDb } from "@/src/shared/domains/status";

export interface CategoryTreeFilters  {
    path?: string;
    notInStatus?: RecordStatusDb[];
    inStatus?: RecordStatusDb[];
}
