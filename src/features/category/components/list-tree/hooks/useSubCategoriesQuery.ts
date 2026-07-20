import { ToastError } from "@/src/shared/components/toaster/ToastError";
import { useLoadingWithDelay } from "@/src/shared/hooks/useLoadingDelay";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { getCategoryTrees } from "@/src/action/category";
import { CategoryTreeNode } from "../../../shared/category.type";


export const useSubCategoriesQuery = (mainCategoryPath:string) => {

    //INICIALIZAMOS EL ARBOL DE CATEGORÍAS
    const { data, isPending, isError } = useQuery({
        queryKey: QUERY_KEYS.categories.listTree(mainCategoryPath),
        queryFn: () => getCategoryTrees({ path: mainCategoryPath }),
        enabled: !!mainCategoryPath,
        staleTime: 60 * 1000,
        // refetchOnWindowFocus: true,
        // select: (data) => ({ ...data, data: data.ok ? [data.data!] : [] })
    });
    
    const fetchState = useLoadingWithDelay({ isFetching: isPending, errorMsg: isError || data?.ok === false });

    // Mostramos mensage de error 
    useEffect(() => {

        if (fetchState.status === "error") {
            ToastError({
                title: "Error al cargar",
                description: "No se pudo conectar al servidor.",
                activeBtnClose: true,
            }, { duration: Infinity });
        }

    }, [fetchState.status]);


    return {
        data: (data?.data ?? []) as CategoryTreeNode[],
        ...fetchState
    }

}