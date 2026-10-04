"use client";
import { Button } from "@/src/shared/components/btn"
import { useRouter } from "next/navigation";
import { GrRefresh } from "react-icons/gr"

export const RefreshButton = () => {

    const router = useRouter();

  return (
    <Button variant="tab" size="sm" onClick={()=>router.refresh()} >
        <GrRefresh size={16}/>
    </Button>
  )
}
