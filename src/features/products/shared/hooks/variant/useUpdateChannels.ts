import { updateVariantChannels, UpdateVariantChannelsPayload } from "@/src/action/variant";
import { TOAST_STYLE, ToastError } from "@/src/shared/components/toaster";
import { useIsPending } from "@/src/shared/hooks";
import { getErrorMessage } from "@/src/shared/messages";
import { toast } from "sonner";

export const useUpdateChannels = () => {

    const { isPending, runAction } = useIsPending();

    const saveChange = async (payload: UpdateVariantChannelsPayload) => {

        return runAction(async () => {

            const res = await updateVariantChannels(payload);

            if (res.ok) {
                toast.success(res.msg, { style: TOAST_STYLE.success });
                
            } else {
                const { title, description } = getErrorMessage(res.errorType);
                ToastError({ title, description, activeBtnClose: true }, { duration: 10000 })
            }

            return res;
        })
    }

    return { isPending, saveChange }
}

