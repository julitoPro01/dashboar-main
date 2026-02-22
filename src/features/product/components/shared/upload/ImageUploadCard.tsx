import { IMAGE_STYLE } from "@/src/constants";
import { useRef } from "react";

interface Props {
  onChange: (target: HTMLInputElement) => void;
}

export const ImageUploadCard = ({ onChange }: Props) => {

  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-3 p-3 items-start bg-white border border-gray-300 shadow rounded relative">
      <div className="flex flex-col flex-wrap gap-4">

        <div className="mt-1 flex gap-2">
          <div className={`${IMAGE_STYLE.thumb} rounded-lg border border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50`}>
            <span className={`w-full h-full text-xs p-2 text-gray-400`}>Sin imagen</span>
          </div>
        </div>

      </div>

      <div className=" w-full">

        <div className="flex  gap-2">
          <input
            ref={fileRef}
            type="file"
            title="Seleccionar imagen"
            accept="image/*"
            className="hidden"
            onChange={({ target }) => onChange(target)}
          />
          <button
            onClick={() => fileRef.current?.click()}
            type="button"
            className="text-center  w-full  gap-2 px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-100 transition"
          >
            Nueva imagen
          </button>

        </div>
      </div>
    </div>
  )
}
