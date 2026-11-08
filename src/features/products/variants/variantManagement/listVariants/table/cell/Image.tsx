import { VariantListItemResponse } from "@/src/features/products/types"
import { useSelectedCell } from "../useSelectedCell"
import { IMAGE_STYLE } from "@/src/shared/theme/image"
import Image from "next/image";
import { CellObjs } from "../Columns";
import { useStore } from "@/src/store/useStore";
import { VARIANT_TABLE_ACTION } from "@/src/store/variantSlice";
import { EditableCellWrapper } from "./EditableCellWrapper";

interface Props extends CellObjs {
    data: {
        priority: boolean;
    } & VariantListItemResponse["image"];
}

export const ImageCell = ({ data, editable, originalId, styleBody, columnId }: Props) => {


    const { isDirty, handleSelectCell, isSelected } = useSelectedCell({
        columnId,
        editable: editable,
        originalId: originalId,
        dirtyData: data
    });

    const isEditMode = useStore(s=>s.variantTableAction.type===VARIANT_TABLE_ACTION.editMode);

    return (
        <EditableCellWrapper
            isEditMode={isEditMode}
            editable={editable}
            isDirty={isDirty}
            isSelected={isSelected}
            styleBody={styleBody}
            onSelect={handleSelectCell}
        >
            <div className={`${IMAGE_STYLE.list} rounded-lg`}>
                <Image
                    src={data?.path || "/assets/notfound.jpg"}
                    alt={data?.name ?? ""}
                    fill
                    priority={data?.priority}
                    sizes={IMAGE_STYLE.size_list}
                    className={IMAGE_STYLE.image}
                />
            </div>
        </EditableCellWrapper>
    )

}


