"use client";

import { LoadingBar } from "@/src/components/ui";
import { useStore } from "@/src/store/useStore"

export const LoadingProduct = () => {

    const loadingProductState = useStore(v=>v.loadingProductState);



  return (
    <LoadingBar loading={ loadingProductState === "loading" } />
  )
}
