import { MdDeleteOutline } from "react-icons/md"
import { useRef } from "react";
import { FiImage } from "react-icons/fi";

interface Props {
    onUpdateImg: (imgUrl: string) => void;
    onResetField: () => void;
    imgUrl?: any;
    disabled: boolean;
}

export const UploadImage = ({ onUpdateImg, onResetField, imgUrl, disabled }: Props) => {


    const file_Ref = useRef<HTMLInputElement>(null);
    const triggerUpload = () => file_Ref.current?.click();

    const onFileChange = (target: HTMLInputElement) => {
        const files = target.files;
        if (files && files.length > 0) {
            const previewUrl = URL.createObjectURL(files[0]);
            onUpdateImg(previewUrl)
        }
    }

    return (
        <div className="flex gap-3 items-start  relative">

            <div className="w-50 h-50 flex flex-col flex-wrap gap-4 p-4 bg-white border border-gray-200 rounded-xl">

                <div className="mt-1 flex gap-2 w-full h-full">
                    {
                        imgUrl
                            ? <div className=" rounded-lg border border-dashed border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50">
                                <img src={imgUrl} alt={"Nueva imagen"} className="object-contain w-full h-full" />
                            </div>
                            : <div className="w-full h-full rounded-lg border border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                                <span className="text-xs text-gray-400">Sin imagen</span>
                            </div>
                    }
                </div>



            </div>
            {!disabled &&
                <div className="flex-1">
                    <div className="flex flex-col items-start gap-2">
                        <input
                            ref={file_Ref}
                            type="file"
                            title="Seleccionar imagen"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => onFileChange(e.target)}
                        />
                        <button
                            title="Actualizar"
                            type="button"
                            onClick={triggerUpload}
                            className="cursor-pointer px-3 py-1.5 rounded-lg border bg-yellow-50  border-orange-200 text-sm hover:bg-yellow-100"
                        >
                            <FiImage color="orange" size={20} />
                        </button>
                        <button
                            title="Eliminar"
                            type="button"
                            disabled={!imgUrl}
                            onClick={onResetField}
                            className="cursor-pointer px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-500 text-sm hover:bg-red-100 disabled:bg-gray-50 disabled:cursor-auto"
                        >
                            <MdDeleteOutline color="red" size={20} />
                        </button>
                    </div>
                </div>
            }

        </div>
    )
}
