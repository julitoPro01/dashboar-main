"use client";
import { useDebounced } from "@/src/shared/hooks";
import { useState } from "react";

interface Props {
    initValue?: string;
    minSearchChars?: number;
    onAction: (search: { search?: string }, del?: { search: true }) => void
}
export const useSearchFilter = ({ initValue = "", minSearchChars = 0, onAction }: Props) => {

    const [name, setName] = useState({ current: initValue, applied: "" });


    const applySearch = useDebounced({
        onAction: (val) => {
            const search = val.length >= minSearchChars ? { search: val } : {};
            const del: any = val.length < minSearchChars ? { search: true } : undefined;
            onAction(search, del)
        }
    })


    const handleSearch = (value: string) => {

        const isOk = value.trim().length >= minSearchChars;
        setName(v => ({ ...v, current: value, applied: isOk ? value : "" }));

        if (!isOk && !name.applied) return
        if (isOk) applySearch(value)
        else applySearch("")
    }

    const handleClean = () => {
        setName({ current: "", applied: "" });
        onAction({}, { search: true })
    }

    return {
        handleSearch,
        handleClean,
        value: name.current
    }
}