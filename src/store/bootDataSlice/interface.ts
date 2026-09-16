import { AuthRole } from "@/src/shared/domains/accessControl";
import { RecordStatusDb } from "@/src/shared/domains/recordStatus";

type DataLoaded = "loading" | "loaded" | "loadingError"
type User = {id:number,name:string}

export interface StateBootData {
    // bootVerificationStatuses:VerificationStatus[];
    bootVerificationStatuses: any[];
    bootAuthRoles: AuthRole[];
    bootRecordStatuses: { name: RecordStatusDb, id: number }[];
    //....
    isBootDataLoaded: DataLoaded;
    user?: User
}

export interface ActionBootData {
    setBootData: (_:Required<User>) => Promise<void>;
}

export type BootDataSlice = StateBootData & ActionBootData; 
