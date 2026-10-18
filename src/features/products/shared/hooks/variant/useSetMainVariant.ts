import { setMainVariant, SetMainVariantPayload } from "@/src/action/variant";
import { TOAST_STYLE, ToastError } from "@/src/shared/components/toaster";
import { getErrorMessage } from "@/src/shared/messages";
import { sleep } from "@/src/shared/utils";
import { useState } from "react";
import { toast } from "sonner";

export const useSetMainVariant = () => {
    const [isPending, setIsPending] = useState(false);

    const saveChange = async (payload: SetMainVariantPayload) => {
        setIsPending(true);

        try {
            const res = await setMainVariant(payload);
            await sleep(500);

            if (res.ok) {
                toast.success(res.msg, { style: TOAST_STYLE.success });
            } else {
                const { title, description } = getErrorMessage(res.errorType);
                ToastError({ title, description, activeBtnClose: true }, { duration: 10000 });
            }

            return res;
        } finally {
            setIsPending(false);
        }
    };

    return { saveChange, isPending };
};
