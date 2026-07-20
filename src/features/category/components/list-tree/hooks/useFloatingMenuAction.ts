import { useStore } from "@/src/store/useStore";
import { useSubCategoryCache } from "./useSubCategoryCache";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/src/shared/routes";

export const useFloatingMenuAction = (mainCategoryPath: string) => {

    const router = useRouter();

    const setFloatingPanel = useStore(v => v.setFloatingPanel);

    const selected = useStore(v => v.selectedCategory);
    const setSelect = useStore(v => v.setSelectCategory);

    const setOpenModalEditCategory = useStore(v => v.setOpenModalEditCategory);

    const { addSubCategoryCache } = useSubCategoryCache(mainCategoryPath);


    const onNewCtg = () => {
        if (!selected) return;
        setFloatingPanel({ open: false, type: null });
        addSubCategoryCache(selected.id, {
            id: Date.now(),
            name: "",
            level: 0,
            path: "",
            publicId: ""
        }, true)
    }
    // Establecemos la categoría a la pagina "CATEGORY ATTRIBUTES"
    const onManageAttrs = (v?: { paths: { name: string; id: number }[], categoryId: number }) => {
        if (selected || (v)) {

            useStore.getState().setCategoryAttrFilter({ fil: { categoryId: v?.categoryId ?? selected!.id } });
            useStore.getState().setSelectCategoryModal({ paths: v?.paths ?? selected!.paths });
            router.push(APP_ROUTES.ATTRIBUTES.CATEGORY)
        };
    }

    const onDetails = () => {
        if (!selected) return;
        router.push(APP_ROUTES.CATEGORIES.VIEW(selected!.publicId))
    }

    return {
        onNewCtg,
        onManageAttrs,
        onDetails,
        setSelect,
        selected,
        onEdit: () => setOpenModalEditCategory(true)
    }
}

