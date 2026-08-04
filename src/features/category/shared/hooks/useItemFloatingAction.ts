import { useStore } from "@/src/store/useStore";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/src/shared/routes";
import { useAddSubCategory } from "./query-cache/useAddSubCategory";

export const useItemFloatingAction = (mainCategoryPath: string) => {

    const router = useRouter();

    const setFloatingPanel = useStore(v => v.setFloatingPanel);
    const setEditCategoryModal = useStore(v => v.setEditCategoryModal);
    const setDeleteModal = useStore(v => v.setDeleteCategoryModal);

    const addCache = useAddSubCategory(mainCategoryPath);

    const handleNewCategory = (selectedId: number) => {
        // Evitamos multiples formularios
        if (useStore.getState().isCreateCategoryFormOpen) return;

        setFloatingPanel({ open: false, type: null });
        addCache({
            parentId: selectedId,
            data: {
                id: Date.now(),
                name: "",
                level: 0,
                path: "",
                publicId: ""
            },
            isCreating: true
        })

    }
    // Establecemos la categoría a la pagina "CATEGORY ATTRIBUTES"
    const handleManageAttrs = (selectedId: number, paths: { name: string; id: number }[]) => {

        useStore.getState().setCategoryAttrFilters({ fil: { categoryId: selectedId } });
        useStore.getState().setSelectCategoryModal({ paths: paths });
        router.push(APP_ROUTES.ATTRIBUTES.CATEGORY)
    };

    const handleDetails = (publicId: string) => {
        router.push(APP_ROUTES.CATEGORIES.VIEW(publicId))
    }

    const handleDelete = (params: { selectedId: number, name: string, parentId?: number }) => {
        setDeleteModal({
            id: params.selectedId,
            name: params.name,
            parentId: params.parentId,
            open: true
        })
    }

    const handleEdit = ( id: number, name: string ) => {
        setEditCategoryModal({ id, name, open: true })
    }

    return {
        handleNewCategory,
        handleManageAttrs,
        handleDetails,
        handleEdit,
        handleDelete
    }
}

