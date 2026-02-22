import { BtnSubmitLoading } from "@/src/components/ui";

interface Props {
    disabled: boolean;
    // onSubmitSave: () => void;
    onCancel?: () => void; // Mejor: hacerlo opcional
}

export const FooterBtnActions = ({
    disabled,
    // onSubmitSave,
    onCancel,
}: Props) => {

    return (
        <div className={` bg-white border-t-4  mx-6 mb-10 rounded-xl border-${colorScheme.neutral}-500 shadow-lg shadow-${colorScheme.neutral}-100 sticky bottom-0 px-6 py-4
  `}>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center">
                    <div className={`text-${colorScheme.neutral}-700 font-medium text-sm flex items-center gap-2`}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd" />
                        </svg>
                        Modo edición activo
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="py-2 mx-4 text-gray-700 hover:text-gray-900 hover:underline underline-offset-2 text-sm"
                        >
                            Cancelar
                        </button>

                        <BtnSubmitLoading
                            // onClick={onSubmitSave}
                            title="Guardar cambios"
                            loadingTitle="Guardando..."
                            variant="primary"
                            className=" w-60 ml-auto"
                            type="submit"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const colorScheme = {
    primary: 'emerald',
    secondary: 'amber',
    neutral: 'gray'
};