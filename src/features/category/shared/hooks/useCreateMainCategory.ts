import { createCategory } from "@/src/action/category";
import { ToastError, ToastSuccess } from "@/src/shared/components/toaster";
import { generateSlug, sleep } from "@/src/shared/utils";
import { getErrorMessage } from "@/src/shared/messages";
import { useState } from "react";
import { RECORD_STATUS_ID } from "@/src/shared/domains/recordStatus";

interface Props { name: string, id: number }

export const useCreateMainCategory = (user: Props) => {

    const [isPending, setIsPending] = useState(false);

    const create = async (name: string) => {

        setIsPending(true);

        const res = await createCategory({
            name,
            slug: generateSlug(name),
            createdBy: user.name,
            createdById: user.id,
            recordStatusId: RECORD_STATUS_ID.DRAFT
        });

        if (res.ok) {

            toastSuccess("create");

        } else {

            const smg = getErrorMessage(res.errorType)
            ToastError({ title: smg.title, description: smg.description })

        }

        await sleep(1000);
        setIsPending(false)

        return res;
    }

    return { createCategory: create, isPending }
}

const toastSuccess = (type: "update" | "create") => {
    const title = type === "create"
        ? "Nueva categoría agregada"
        : "Categoría actualizado"

    ToastSuccess({
        title: title,
        activeBtnClose: true,
    }, { duration: 10000 });
}

