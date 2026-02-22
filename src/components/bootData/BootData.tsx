"use client";

import { useStore } from "@/src/store/useStore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { LoadingBar } from "../ui/loading/LoadingBar";
import { ErrorServer } from "../ui/error/ErrrorServer";

interface Props{
  children:React.ReactNode;
}

export const BootData = ({children}:Props) => {

  const session = useSession();
  const user = session.data?.user;

  const setBootData = useStore(v => v.setBootData);
  const ok = useStore(v => v.isBootDataLoaded);

  useEffect(() => {

    if (user)
      setBootData()

  }, [user])

  const render = ok === "loading" ? <LoadingBar loading={true} />
    : ok === "loaded" ? children
      : <div className="p-6">
        <ErrorServer Title="No se pudieron cargar los datos requeridos. Intenta nuevamente más tarde." onAction={true} />
      </div>

  return (
    <>  {render}</>
  )
}

