import { RecordStatusBadge } from "@/src/shared/domains/recordStatus";
import { useStore } from "@/src/store/useStore";
import { MdMoreVert, MdOutlineSubdirectoryArrowRight, MdPostAdd } from "react-icons/md";
import { TbChevronDown } from "react-icons/tb";
import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice";
import { MainCategory } from "@/src/store/categorySlice";
import { Button } from "@/src/shared/components/btn";
import { useItemFloatingAction } from "../../shared/hooks";

interface Props {
    mainCategory: MainCategory
}
export const ItemMainCategory = ({ mainCategory: main }: Props) => {

    const setFloatingMenu = useStore(v => v.setFloatingPanel);

    const setSelect = useStore(v => v.setSelectCategory);

    const addDirty = useItemFloatingAction(main.path).handleNewCategory;

    const select = () => {
        setSelect({
            id: main.id,
            publicId: main.publicId,
            name: main.name,
            recordStatus: main.recordStatus,
            level: main.level,
            path: main.path,
            paths: [{ name: main.name, id: main.id, recordStatus: main.recordStatus }],
            hasChildren: main.hasChildren,
            hasAttributes: main.hasAttributes
        })
    }

    const handleAddDirty = () => {
        addDirty(main.id);
        select();
    }
    const onOpenFloating = (cx: number, cy: number) => {
        setFloatingMenu({ type: FLOATING_PANEL_TYPE.CATEGORY, open: true, cx: cx!, cy: cy! })
        select()
    }

    return (
        <div className="select-none overflow-x-auto scrollbar-hide py-2.75 h-20">
            <div className={` flex items-center justify-between gap-3 py-4 px-3 rounded-lg`}
            >
                <div className="flex items-center gap-3">
                    {main.hasChildren
                        ? <span className=" text-text-muted"> <TbChevronDown size={20} /></span>
                        : <span className=" text-text-muted"> <MdOutlineSubdirectoryArrowRight size={20} /></span>}

                    <span className="text-sm text-text-muted font-bold truncate">{main.name} helos plopasd</span>
                    <RecordStatusBadge status={main.recordStatus} />
                </div>
                <div className={`flex  justify-end gap-4`}>
                    <Button variant="basic" padding="none" onClick={handleAddDirty}>
                        <MdPostAdd size={20} />
                    </Button>
                    <Button variant="basic" padding="none" onClick={({ clientX, clientY }) => onOpenFloating(clientX, clientY)}
                    >
                        <MdMoreVert size={20} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
