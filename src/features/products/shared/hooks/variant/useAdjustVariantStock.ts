import { adjustVariantStock, AdjustVariantStockPayload } from "@/src/action/variant";
import { TOAST_STYLE, ToastError } from "@/src/shared/components/toaster";
import { getErrorMessage } from "@/src/shared/messages";
import { sleep } from "@/src/shared/utils";
import { useState } from "react";
import { toast } from "sonner";

export const useAdjustVariantStock = () => {
    const [isPending, setIsPending] = useState(false);

    const saveChange = async (payload: AdjustVariantStockPayload) => {
        setIsPending(true);
        try {
            const result = await adjustVariantStock(payload);
            await sleep(500);

            if (result.ok) {
                toast.success(result.msg, { style: TOAST_STYLE.success });
            } else {
                const { title, description } = getErrorMessage(result.errorType);
                ToastError({ title, description, activeBtnClose: true }, { duration: 10000 });
            }

            return result;
        } finally {
            setIsPending(false);
        }
    };

    return { saveChange, isPending };
};
