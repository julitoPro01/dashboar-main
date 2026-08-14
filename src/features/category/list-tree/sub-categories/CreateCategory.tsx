import { useBootDataStore } from "@/src/store/useBootDataStore";
import { useStore } from "@/src/store/useStore";
import { useCreateCategoryTree, useRemoveSubCategory } from "../../shared/hooks";
import { createSlug } from "@/src/shared/utils";
import { useEffect } from "react";
import { CreateCategoryForm } from "../../shared/components";
import { useBasicForm } from "@/src/shared/form";

export const CreateCategory = ({ id }: { id: number }) => {

    const main = useStore(v => v.selectedMainCategory);
    const selected = useStore(v => v.selectedCategory);
    const user = useBootDataStore(v => v.user);

    const setDeselect = useStore(v => v.setSelectCategory);
    const updateMain = useStore(v => v.setSelectMainCategory);

    const cacheRemove = useRemoveSubCategory(main?.path ?? "");

    const { mutateAsync: createCategory, isPending } = useCreateCategoryTree(main?.path ?? "", id);

    const { state, onSubmit, onCancel, handleChange, hasError } = useBasicForm({ name: "" }, { name: v => v.trim().length > 2 }, {
        async onSubmit({ name }) {
            if (!selected) return;

            const res = await createCategory({
                name,
                slug: createSlug(name),
                parentId: selected.id,
                parentPath: selected.path,
                parentLevel: selected.level,
                createdBy: user.name!,
                createdById: user.id!,
            });

            if (res.ok) {

                // DESELECCIONAMOS
                setDeselect();

                // ACTUALIZAMOS CATEGORÍA ROOT
                const isParentRoot = !selected.parentId && !selected.hasChildren;
                if (isParentRoot) {
                    updateMain({
                        ...main!,
                        hasChildren: true,
                        sync: "update"
                    })
                }
            }

        },

        onCancel() {
            cacheRemove(id);
            setDeselect()
        }
    });

    //-----------------
    const setOpen = useStore(v => v.setCreateCategoryFormOpen);

    useEffect(() => {
        setOpen(true)
        return () => {
            setOpen(false)
        }
    }, []);

    return (

        <div className="p-2">
            <div className="absolute left-0 w-5.25 border-b border-border-strong top-1/2 -translate-y-1/2"
            />
            <div className="ml-4">
                <CreateCategoryForm
                    value={state.name}
                    disabled={hasError}
                    isSubmitting={isPending}
                    onSubmit={onSubmit}
                    onChange={v => handleChange("name", v)}
                    onClose={onCancel}
                    onBlur={onCancel}
                />
            </div>
        </div>

    )
}