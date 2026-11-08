"use client";

import { deactivateVariant, type DeactivateVariantPayload } from "@/src/action/variant";
import { TOAST_STYLE, ToastError } from "@/src/shared/components/toaster";
import { getErrorMessage } from "@/src/shared/messages";
import { useIsPending } from "@/src/shared/hooks";
import { toast } from "sonner";

export const useDeactivateVariant = () => {
    const { isPending, runAction } = useIsPending();

    const deactivate = (payload: DeactivateVariantPayload) => runAction(async () => {
        const result = await deactivateVariant(payload);

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

    return { deactivate, isPending };
};
