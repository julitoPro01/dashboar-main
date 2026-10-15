import { RECORD_STATUS_OPTIONS, RecordStatusDb } from "@/src/shared/domains/recordStatus";
import { useBootDataStore } from "@/src/store/useBootDataStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/src/store/useStore";

interface Props {
    status: RecordStatusDb;
    id: number;
    isParent: boolean
}
export const ActiveInput = ({ status, id, isParent }: Props) => {

    const [active, setActive] = useState(status === "ACTIVE");

    const isValidToActive = !(status === "DELETED" || status === "DRAFT")

    const user = useBootDataStore(v => v.user);
    const mainPath = useStore(v => v.selectedMainCategory?.path) ?? "";

    const router = useRouter();

    // const updateSubCategoryCache = useSubCategoryCache(mainPath).updateSubCategoryCache;


    const handleChange = async () => {

        const activeChange = !active;

        const status = RECORD_STATUS_OPTIONS.map(v => v.value === (activeChange ? "ACTIVE" : "INACTIVE"));
        // const res = await updateCategory(id, {
        //     recordStatusId: status!.id
        // }, { updateById: user.id!, updateBy: user.name! })

        // if (res.ok) {
        //     if (isParent) {
        //         router.refresh()
        //     } else {
        //         updateSubCategoryCache(id, {
        //             recordStatus: { name: status!.name }
        //         })
        //     }
        //     setActive(activeChange)
        //     toast.success("Se actualizo el estado", { style: TOAST_STYLE.success })

        // } else
        //     toast.error("Error", { style: TOAST_STYLE.error })

    }

    return (
        <>
            {isValidToActive && <>
                <div className="border-b border-border-strong my-1" />
                <div className={iStyle}>
                    <label className="flex justify-between items-center gap-3">
                        <span>Activo</span>
                        <input type="checkbox"
                            checked={active}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </>
            }
        </>
    )
}


const iStyle = `w-full px-4 py-2 text-start text-sm rounded-md hover:bg-hover transition-all`;
