import { combine } from "zustand/middleware";
import { ActionBootData, StateBootData } from "./interface";
import { getAuthRoles, getVerificationStatuses } from "@/src/action";


export const bootDataSlice = combine<StateBootData, ActionBootData>(
    {
        bootVerificationStatuses: [],
        bootAuthRoles: [],
        isBootDataLoaded: "loading"
    },
    (set) => ({
        setBootData: async () => {

            const [verificationStatuses, authRoles] = await Promise.all([getVerificationStatuses(), getAuthRoles()]);

            if (verificationStatuses.ok && authRoles.ok) {
                set({
                    bootVerificationStatuses: verificationStatuses.data!,
                    bootAuthRoles: authRoles.data!
                })
                set({ isBootDataLoaded: "loaded" })
            } else
                set({ isBootDataLoaded: "loadingError" })
        }

    })
)