"use client";
import { useDebounced } from "@/src/shared/hooks";
import { useState } from "react";

interface Props {
    initValue?: string;
    minSearchChars?: number;
    onAction?: (search: { search?: string }, del?: { search: true }) => void
}
export const useSearchFilter = (options: Props = {}) => {

    const { initValue = "", minSearchChars = 3, onAction } = options;

    const [name, setName] = useState({ current: initValue, valueApplied: "", isApplied: false });


    const applySearch = useDebounced({
        onAction: (val) => {
            const value = val.length >= minSearchChars ? val : "";

            const search = { ...(value ? { search: value } : undefined) };
            const del: any = val.length < minSearchChars ? { search: true } : undefined;

            onAction?.(search, del);
            setName(v => ({ ...v, valueApplied: value }))
        }
    })


    const handleSearch = (value: string) => {

        const isOk = value.trim().length >= minSearchChars;
        setName(v => ({ ...v, current: value, isApplied: isOk }));

        if (!isOk && !name.isApplied) return
        if (isOk) applySearch(value)
        else applySearch("")
    }

    const handleClean = () => {
        setName({ current: "", valueApplied: "", isApplied: false });
        onAction?.({}, { search: true })
    }

    return {
        handleSearch,
        handleClean,
        value: name.current,
        valueApplied: name.valueApplied
    }
}