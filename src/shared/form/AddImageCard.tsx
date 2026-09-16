import { BiImageAdd } from "react-icons/bi"
import { ImageFileBtn } from "./ImageFileBtn"
import { ChangeEvent } from "react";

interface Props {
    multiple?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const AddImageCard = ({ multiple=false, onChange }: Props) => {
    return (
        <ImageFileBtn className=" group aspect-square rounded-2xl border-2 border-dashed border-border bg-surface-light transition-all hover:border-primary hover:bg-bg-soft-blue"
            onChange={onChange} multiple={multiple}
        >
            <div className="flex h-full flex-col items-center justify-center">
                <BiImageAdd
                    size={48}
                    className="text-text-muted transition duration-300 group-hover:-translate-y-1 group-hover:text-primary"
                />
                <span className="mt-4 text-sm font-medium text-text-muted group-hover:text-primary">
                    Agregar imagen
                </span>
            </div>
        </ImageFileBtn>
    )
}
