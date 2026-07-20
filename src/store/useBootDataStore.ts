import { create } from "zustand";
import { getRecordStatuses, getVerificationStatuses } from "../action";
import { BootDataSlice } from "./bootDataSlice/interface";
import { getAuthRoles } from "../action/auth";

export const useBootDataStore = create<BootDataSlice>((set) => ({
    bootVerificationStatuses: [],
    bootAuthRoles: [],
    bootRecordStatuses: [],
    isBootDataLoaded: "loading",
    user: {  },
    setBootData: async (user) => {

        const [verificationStatuses, authRoles, recordStatuses] = await Promise.all([
            getVerificationStatuses(),
            getAuthRoles(),
            getRecordStatuses()
        ]);

        if (verificationStatuses.ok && authRoles.ok && recordStatuses.ok && user) {
            set({
                bootVerificationStatuses: verificationStatuses.data!,
                bootAuthRoles: authRoles.data!,
                bootRecordStatuses: recordStatuses.data!,
                user
            })
            set({ isBootDataLoaded: "loaded" })
        } else
            set({ isBootDataLoaded: "loadingError" })
    }

}));