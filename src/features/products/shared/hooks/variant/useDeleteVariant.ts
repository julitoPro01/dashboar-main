"use client";

import {
    permanentlyDeleteVariant,
    softDeleteVariant,
    type DeleteVariantPayload,
} from "@/src/action/variant";
import { TOAST_STYLE, ToastError } from "@/src/shared/components/toaster";
import { getErrorMessage } from "@/src/shared/messages";
import { useIsPending } from "@/src/shared/hooks";
import { toast } from "sonner";

export const useDeleteVariant = () => {
    const { isPending, runAction } = useIsPending();

    const runDelete = async (
        action: typeof softDeleteVariant,
        payload: DeleteVariantPayload,
    ) => runAction(async () => {
        const result = await action(payload);

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

    return {
        isPending,
        moveToDeleted: (payload: DeleteVariantPayload) => runDelete(softDeleteVariant, payload),
        deletePermanently: (payload: DeleteVariantPayload) => runDelete(permanentlyDeleteVariant, payload),
    };
};
