import { Dispatch, SetStateAction, useEffect } from "react";
import { useStore } from "@/src/store/useStore";
import { MainCategoryItem } from "../../../types";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/shared/react-query";

interface Props {
    setCategories: Dispatch<SetStateAction<MainCategoryItem[]>>;
}

export const useMainCategoryCache = ({ setCategories }: Props) => {

    const mainChanges = useStore(v => v.mainCategoryChanges);
    const mainPath = useStore(v => v.selectedMainCategory?.path) ?? "";

    const setSelectMainCategory = useStore(v => v.setSelectMainCategory);
    const selected = useStore(v => v.selectedMainCategory);

    const queryClient = useQueryClient();

    const deleteRoot = () => {
        queryClient.removeQueries({
            queryKey: QUERY_KEYS.categories.listTree(mainPath),
        });
    }

    //Escuchamos los cambios (actualizar)
    useEffect(() => {

        if (selected && mainChanges.lastUpdate) {
            const { id, name, hasChildren, path, recordStatus } = mainChanges.lastUpdate;
            //Actualizamos los valores
            setCategories(c => c.map(v => v.id === id ? {
                ...v,
                name: name ?? v.name,
                path: path ?? v.path,
                level: v.level,
                recordStatus: recordStatus ?? v.recordStatus,
                hasChildren: hasChildren ?? v.hasChildren,
            } : v));
            //Actualizamos el seleccionado
            setSelectMainCategory({
                ...selected!,
                name: name ?? selected!.name,
                path: path ?? selected!.path,
                recordStatus: recordStatus ?? selected!.recordStatus,
                hasChildren: hasChildren ?? selected!.hasChildren,
            })
        }
    }, [mainChanges.lastUpdate]);

    //Escuchamos los cambios (eliminar)
    useEffect(() => {
        if (mainChanges.lastDeleteId) {
            const id = mainChanges.lastDeleteId;
            //Eliminamos la categoría de la lista
            setCategories(c => c.filter(v => v.id !== id));

        }
    }, [mainChanges.lastDeleteId]);

    return { deleteRoot }
}