"use client"
import { useRef, useState } from "react";

interface Search {
    initName: string;
    minSearchChars?:number;
    onApply:(value:string,isMinChars:boolean,minChars:number)=>void
}
export const useSearch = ({ initName,minSearchChars=0,onApply }: Search) => {

    const MIN_SEARCH_CHARS = useRef(minSearchChars).current ;

    const [name, setName] = useState({ current: initName, applied: false });

    const cleanValues = () => setName({ current: "", applied:false });

    const handleChange = (value: string) => {
        const isOk = value.trim().length >= MIN_SEARCH_CHARS;
        setName(v => ({ ...v, current: value, applied: isOk  }));

        const isMinChars = isOk || name.applied;
        const val = isOk ? value :"";

        onApply(val,isMinChars,MIN_SEARCH_CHARS); 
    }

    return {
        name,
        isApplied:name.applied,
        handleChange,
        cleanValues
    }
}