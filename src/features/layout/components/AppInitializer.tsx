"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useBootDataStore } from "@/src/store/useBootDataStore";
import { LoadingBar } from "@/src/shared/components/loading";
import { ErrorServer } from "@/src/shared/components/error";
import { setInitWithVersionStorage } from "@/src/shared/storage";

interface Props {
  children: React.ReactNode;
}

export const AppInitializer = ({ children }: Props) => {

  const session = useSession();
  const user = session.data?.user;

  const setBootData = useBootDataStore(v => v.setBootData);
  const ok = useBootDataStore(v => v.isBootDataLoaded);

  //TODO: esto es para inicializar el localStorage con la version.
  // useEffect(() => {
  // setInitWithVersionStorage({ type: "PAGINATION", key: "SUPPLIERS", value: 0 });
  // setInitWithVersionStorage({ type: "PAGINATION", key: "ATTRIBUTES", value: 0 });
  // setInitWithVersionStorage({ type: "PAGINATION", key: "CATEGORY_ATTRIBUTES", value: 0 });
  // setInitWithVersionStorage({ type: "PAGINATION", key: "CATEGORIES", value: 0 });
  // setInitWithVersionStorage({ type: "PAGINATION", key: "VARIANTS", value: 0 });
  // }, [])

  useEffect(() => {
    if (user && ok !== "loaded") {
      setBootData({ id: +user.id, name: user.name });
    }
  }, [user, ok]);

  const render = ok === "loading" ? <LoadingBar loading={true} />
    : ok === "loaded" ? children
      : <div className="p-6">
        <ErrorServer Title="No se pudieron cargar los datos requeridos. Intenta nuevamente más tarde." onAction={true} />
      </div>

  return (
    <>  {render}</>
  )
}

