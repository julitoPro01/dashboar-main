import { IMAGE_STYLE } from "@/src/constants";
import { useRef } from "react";
import { FaRegEdit } from "react-icons/fa"
import { MdDeleteOutline } from "react-icons/md"

interface Props {
    onRemove: () => void;
    onUpdate: (target: HTMLInputElement) => void;
    imageUrl: string;
}

export const ImageUpdateCard = ({ imageUrl, onRemove, onUpdate }: Props) => {

    const fileRef = useRef<HTMLInputElement>(null);
    const onUploadFile = () => fileRef.current?.click();

    return (
        <div className="flex flex-col gap-3 p-3 items-start bg-white border border-gray-300 shadow rounded relative">
           
            <div className="flex flex-col flex-wrap gap-4">

                <div className="mt-1 flex gap-2">
                    <div className={`${IMAGE_STYLE.thumb} rounded-lg border border-dashed border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50`}>
                        <img src={imageUrl} alt={"Nueva imagen"} className={`${IMAGE_STYLE.image}`} />
                    </div>
                </div>

            </div>

            <div className="flex-1">
                <div className="flex gap-2">
                    <input
                        ref={fileRef}
                        type="file"
                        title="Seleccionar imagen"
                        accept="image/*"
                        className="hidden"
                        onChange={({ target }) => onUpdate(target)}
                    />
                    <button
                        type="button"
                        onClick={onUploadFile}
                        className="px-3 py-1.5 rounded-lg border  border-orange-200 text-sm hover:bg-gray-50"
                    >
                        <FaRegEdit color="orange" size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={onRemove}
                        className="px-3 py-1.5 rounded-lg border border-red-200 text-red-500 text-sm hover:bg-red-50"
                    >
                        <MdDeleteOutline color="red" size={20} />
                    </button>
                </div>
            </div>

        </div>)
}
