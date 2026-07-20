"use client";

import { LoadingBar } from "@/src/shared/components/loading";
import { useStore } from "@/src/store/useStore"

export const LoadingProduct = () => {

    const loadingProductState = useStore(v=>v.loadingProductState);



  return (
    <LoadingBar loading={ loadingProductState === "loading" } />
  )
}
