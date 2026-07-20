import { Dispatch, SetStateAction, useState } from "react";
import { createSlug } from "@/src/shared/utils";
import { ToastError, ToastSuccess } from "@/src/shared/components/toaster";
import { useStore } from "@/src/store/useStore";
import { addCategory } from "@/src/action/category";
import { MainCategoryItem } from "../../../types";
import { useRouter } from "next/navigation";

interface Props {
    setCategories: Dispatch<SetStateAction<MainCategoryItem[]>>;
    user: { name: string, id: number };
}

export const useMainCategoryList = ({ setCategories, user }: Props) => {

    const setSelectMainCategory = useStore(v => v.setSelectMainCategory);
    const selected = useStore(v => v.selectedMainCategory);

    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState("");

    // Agregamos campo temporal
    const onAddDirtyCatg = () => {

        setCategories(v => [
            {
                id: Date.now(),
                publicId: "",
                name: "",
                recordStatus: "DRAFT",
                isDirty: true,
                hasChildren: false,
                level: 0,
                path: "",
                hasAttributes: false
            }, ...v]);

    }
    // Eliminamos el campo temporal
    const delDirtyCatg = (id: number | string) => {
        setCategories(v => v.filter(c => c.id !== id))
    }
    // Establecemos el campo temporal a estático
    const setStaticCatg = async (id: number | string) => {

        setIsSubmitting(true);

        const res = await addCategory({
            name,
            slug: createSlug(name),
            level: 0,
            createdBy: user.name,
            createdById: user.id
        });

        if (res.ok) {

            // Eliminamos el items mientras se refresca la pagina
            delDirtyCatg(id)

            toastSuccess("create");
            setName("");
            // Refrescamos para traer la nuevos datos
            router.refresh();

        } else {
            if (res.code === 400)
                ToastError({ title: "Error al agregar", description: res.msg })
            else
                toastError("create");
            delDirtyCatg(id)
        }

        setIsSubmitting(false);
    }

    // Seleccionamos
    const onSelect = (ctg: MainCategoryItem) => {
        setSelectMainCategory({
            id: ctg.id,
            path: ctg.path,
            recordStatus: ctg.recordStatus,
            name: ctg.name,
            hasChildren: ctg.hasChildren,
            publicId: ctg.publicId,
            level: ctg.level,
            hasAttributes: ctg.hasAttributes
        })
    }

    //Ejecutamos la acción
    const onSubmit = async (id: number | string) => {
        if (!name.trim()) delDirtyCatg(id)
        else (await setStaticCatg(id))
    }

    return {
        onAddDirtyCatg,
        onSelect,
        selected,
        isSubmitting,
        onSubmit,
        onChangeName: (value: string) => setName(value),
        name
    }
}

const toastSuccess = (type: "update" | "create") => {
    const title = type === "create"
        ? "Nueva categoría agregada"
        : "Categoría actualizado"

    ToastSuccess({
        title: title,
        activeBtnClose: true,
    }, { duration: 10000 });
}

const toastError = (type: "update" | "create") => {
    const title = type === "create"
        ? "Error al agregar"
        : "Error al actualizar"

    const descr = type === "create"
        ? "No fue posible crear la categoría."
        : "No fue posible actualizar la categoría."
    ToastError({
        title,// "Error al agregar",
        description: descr,// "No se pudo conectar al servidor.",
        activeBtnClose: true,
    }, { duration: 8000 });

}