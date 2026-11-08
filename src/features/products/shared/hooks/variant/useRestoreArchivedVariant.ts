"use client";

import { restoreArchivedVariant, type RestoreArchivedVariantPayload } from "@/src/action/variant";
import { TOAST_STYLE, ToastError } from "@/src/shared/components/toaster";
import { getErrorMessage } from "@/src/shared/messages";
import { useIsPending } from "@/src/shared/hooks";
import { toast } from "sonner";

export const useRestoreArchivedVariant = () => {
    const { isPending, runAction } = useIsPending();

    const restore = (payload: RestoreArchivedVariantPayload) => runAction(async () => {
        const result = await restoreArchivedVariant(payload);

        if (result.ok) {
            toast.success(result.msg, { style: TOAST_STYLE.success });
        } else {
            const { title, description } = getErrorMessage(result.errorType);
            ToastError({
                title,
                description: result.msg || description,
                activeBtnClose: true,
            }, { duration: 10_000 });
        }

        return result;
    });

    return { restore, isPending };
};
