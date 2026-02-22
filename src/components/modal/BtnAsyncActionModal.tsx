import { BtnSubmitLoading } from "../ui/Btn-SubmitLoading"

interface Props {
    onCancel: () => void;
    onSave?: () => void;
    btnSave: {
        title: string;
        loadingTitle: string;
        disabled?: boolean;
        type: "button" | "submit" | "reset" | undefined
    }
}

export const BtnAsyncActionModal = ({ onCancel, onSave, btnSave }: Props) => {

    return (
        <div className="flex gap-5 justify-end">

            <button className="hover:text-black" type="button"
                onClick={onCancel}
            > Cancelar
            </button>

            <BtnSubmitLoading
                disabled={btnSave.disabled ?? false}
                title={btnSave.title}
                loadingTitle={btnSave.loadingTitle}
                onClick={onSave}
                type={btnSave.type}
            />
        </div>
    )
}
