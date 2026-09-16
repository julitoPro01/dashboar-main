import { useBootDataStore } from "@/src/store/useBootDataStore";
import { useStore } from "@/src/store/useStore";
import { useCreateCategoryTree, useRemoveSubCategory } from "../../shared/hooks";
import { generateSlug } from "@/src/shared/utils";
import { useEffect } from "react";
import { CreateCategoryForm } from "../../shared/components";
import { useBasicForm } from "@/src/shared/form";
import { RECORD_STATUS_ID } from "@/src/shared/domains/recordStatus";

export const CreateCategory = ({ id, onOpen }: { id: number,onOpen?:()=>void }) => {

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
            if (!user) return;

            const res = await createCategory({
                name,
                slug: generateSlug(name),
                recordStatusId: RECORD_STATUS_ID.DRAFT,
                parentId: selected.id,
                parentPath: selected.path,
                parentLevel: selected.level,
                createdBy: user.name,
                createdById: user.id,
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
    const setCategoryOpen = useStore(v => v.setCreateCategoryFormOpen);

    useEffect(() => {
        setCategoryOpen(true);
        onOpen?.();
        return () => {
            setCategoryOpen(false)
        }
    }, []);

    return (

        <div className="p-2">
            <div className="absolute left-0 w-5 border-b border-border-strong top-1/2 -translate-y-1/2"
            />
            <div className="ml-3.5">
                <CreateCategoryForm
                    value={state.name}
                    disabled={hasError || isPending}
                    isSubmitting={isPending}
                    onSubmit={onSubmit}
                    onChange={v => handleChange("name", v)}
                    onClose={onCancel}
                />
            </div>
        </div>

    )
}