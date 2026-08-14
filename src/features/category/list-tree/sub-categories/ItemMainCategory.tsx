import { RECORD_STATUS_LABEL, RECORD_STATUS_STYLES } from "@/src/shared/domains/status";
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

    const style = RECORD_STATUS_STYLES[main.recordStatus];

    return (
        <div className="select-none">
            <div className={` flex items-center justify-between gap-3 py-4 px-3 rounded-lg`}
            >
                <div className="flex items-center gap-3">
                    {main.hasChildren
                        ? <span className=" text-text-muted"> <TbChevronDown size={20} /></span>
                        : <span className=" text-text-muted"> <MdOutlineSubdirectoryArrowRight size={20} /></span>}

                    <span className="text-sm text-text-muted whitespace-nowrap font-bold truncate">{main.name}</span>
                    <span className={`text-[9px] ml-2 px-2 py-0.5 ${style.colorBg50} ${style.colorTxt500} rounded-full tracking-wider font-semibold uppercase`}>
                        {RECORD_STATUS_LABEL[main.recordStatus]}
                    </span>
                </div>
                <div className={`flex items-center gap-3 `}>
                    <Button variant="basic" onClick={handleAddDirty}>
                        <MdPostAdd size={20} />
                    </Button>
                    <Button variant="basic" onClick={({ clientX, clientY }) => onOpenFloating(clientX, clientY)}
                    >
                        <MdMoreVert size={20} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
