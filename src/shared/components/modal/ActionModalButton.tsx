
interface Props {
    onCancel: () => void;
    onAccept?: () => void;
    disabledAccept?: boolean;
    typeBtnAccept?: "button" | "submit"
}

//TODO: No se esta usando
export const ActionModalButton = ({ onCancel, onAccept, disabledAccept = false, typeBtnAccept = "button" }: Props) => {
    return (
        <div className="flex gap-5 justify-end">

            <button className="hover:text-black"
                onClick={onCancel}
                type="button"
            > Cancelar
            </button>
            <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                disabled={disabledAccept}
                onClick={onAccept}
                type={typeBtnAccept}
            >
                Aceptar
            </button>
        </div>
    )
}