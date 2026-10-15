"use client"
import { ChangeEvent, useRef } from "react";

interface Props {
    multiple?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    children: React.ReactNode;
}
export const ImageFileBtn = ({ multiple, children, onChange, className }: Props) => {

    const fileRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <input ref={fileRef} type="file" multiple={multiple} accept="image/*" hidden onChange={onChange} />
            <button type="button" onClick={() => fileRef.current?.click()}
                className={className}>
                {children}
            </button>
        </>
    )
}
