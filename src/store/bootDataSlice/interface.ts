import { AuthRole } from "@/src/auth";
import { VerificationStatus } from "@/src/interfaces/verification-status/verificationStatus.type";

type DataLoaded = "loading" | "loaded" | "loadingError"

export interface StateBootData {
    bootVerificationStatuses:VerificationStatus[];
    bootAuthRoles:AuthRole[];
    //....
    isBootDataLoaded:DataLoaded;
}

export interface ActionBootData{
    setBootData:()=>Promise<void>;
}

export type BootDataSlice  = StateBootData  & ActionBootData; 
