import { getCustomAttributes } from "@/src/action/product"
import { useState } from "react";
import { sleep } from "@/src/shared/utils";

type Response = { msg: string, isLoading: boolean, isError: boolean }

export const useCustomAttributes = () => {

    const [response, setResponse] = useState<Response>({ msg: "", isLoading: false, isError: false });

    const attributes = async ({ id, entity }: { id: number, entity: "product" | "variant" }) => {
        const rest = await getCustomAttributes({ id, entity });

        setResponse({ msg: "⏳ Cargando propiedades...", isLoading: true, isError: false })
        await sleep(1000);

        if (rest.ok) {
            setResponse({ msg: "Propiedades cargados", isLoading: false, isError: false, });
        } else {
            setResponse({ msg: "⚠ No se pudieron cargar las propiedades.", isLoading: false, isError: true })

        }
        return rest.data ?? [];
    }


    return {
        attributes,
        ...response
    }
}
