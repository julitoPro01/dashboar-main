import { CategoryStatus } from "@/src/interfaces/category"

export const categoryStatusGroup = (categoryStatus: CategoryStatus[]) => {

    return {
        pendingStatus: categoryStatus.find(v => v.name === "PENDING_REVIEW")!,
        draft: categoryStatus.find(v => v.name === "DRAFT")!,

        publicStatus: categoryStatus.filter(v =>
            v.name === "ACTIVE" ||
            v.name === "TEMPORARY" ||
            v.name === "FEATURED"
        ),

        privateStatus: categoryStatus.filter(v =>
            v.name !== "ACTIVE" &&
            v.name !== "TEMPORARY" &&
            v.name !== "FEATURED" &&
            v.name !== "DRAFT"  
        ),
    }
}
