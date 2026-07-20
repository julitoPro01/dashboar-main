import { Button } from "../btn";

interface Props {
    onCancel: () => void;
    onSave?: () => void;
    btnSave: {
        title: string;
        loadingTitle: string;
        disabled?: boolean;
        type?: "button" | "submit" | "reset" | undefined;
        isLoading?:boolean;
    }
}
//TODO: No se esta usando
export const AsyncActionModalButton = ({ onCancel, onSave, btnSave }: Props) => {

    return (
        <div className="flex gap-5 justify-end">

            <button className="hover:text-black" type="button"
                onClick={onCancel}
            > Cancelar
            </button>

            <Button
                disabled={btnSave.disabled}
                loading={btnSave.isLoading}
                onClick={onSave}
                type={btnSave.type}
            >
                {btnSave.isLoading ? btnSave.loadingTitle : btnSave.title}
            </Button>
        </div>
    )
}
