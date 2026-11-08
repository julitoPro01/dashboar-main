"use client";

import { archiveVariant, type ArchiveVariantPayload } from "@/src/action/variant";
import { TOAST_STYLE, ToastError } from "@/src/shared/components/toaster";
import { getErrorMessage } from "@/src/shared/messages";
import { useIsPending } from "@/src/shared/hooks";
import { toast } from "sonner";

export const useArchiveVariant = () => {
    const { isPending, runAction } = useIsPending();

    const archive = (payload: ArchiveVariantPayload) => runAction(async () => {
        const result = await archiveVariant(payload);

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

    return { archive, isPending };
};
