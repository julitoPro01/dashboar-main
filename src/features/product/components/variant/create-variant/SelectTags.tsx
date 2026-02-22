import clsx from "clsx";
import { productTagsUi } from "../../../constants/productTags-ui";
import { useFormContext } from "react-hook-form";
import { UpsertVariantForm } from "../../../type/upsertVariantForm.type";
import { FORM_STYLES } from "@/src/constants";


export const SelectTags = () => {

    const { setValue, watch } = useFormContext<UpsertVariantForm>();
    const tags = watch("tags") ?? [];

    const selectTags = (tag: string) => {
        const includes = tags.includes(tag);
        if (includes)
            setValue("tags", tags.filter(v => v !== tag), { shouldDirty: true });
        else
            setValue("tags", [...tags, tag], { shouldDirty: true });
    }
    return (
        <div>
            <span className={FORM_STYLES.label}> Etiquetas </span>
            <div className="flex flex-wrap gap-2 mt-1 border border-gray-300 p-6 rounded-lg">
                {productTagsUi.map((tag) => {
                    const includes = tags.includes(tag.value);
                    return (
                        <button
                            type="button"
                            key={tag.value}
                            className={clsx(`px-3 py-1 rounded-full border text-sm transition-all`, {
                                "bg-blue-600 text-white border-blue-600 shadow": includes,
                                "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200": !includes
                            })}
                            onClick={() => selectTags(tag.value)}
                        >
                            {tag.label}
                        </button>
                    );
                })}
            </div>
        </div>
    )
};
