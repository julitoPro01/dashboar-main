"use client";
import { useStore } from "@/src/store/useStore";

interface Props {
  children:React.ReactNode
}

export const LayoutLeftMenu = ({children}:Props) => {

  const open = useStore(v=>v.leftNavBarOpen);

  return (
    <div className={`${ !open ? "hidden":""}`} >
      {children}
    </div>
  )
}
