import debounce from "lodash.debounce"
import { useEffect, useRef } from "react"

interface Props{
    delay?:number;
    onAction:(val:any)=>void;
}
export const useDebounced=({delay=550,onAction}:Props)=>{

    const debounced=useRef(
        debounce((val:any)=>{
            onAction(val)
        },delay)).current;

        useEffect(() => {
            return ()=>debounced.cancel();
        }, [])
        
    
        return debounced;
}