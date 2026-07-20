import { RECORD_STATUS_LABEL, RECORD_STATUS_STYLES } from "@/src/shared/domains/status";
import { useStore } from "@/src/store/useStore";
import { BiPlus } from "react-icons/bi";
import { MdMoreVert, MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { TbChevronDown } from "react-icons/tb";
import { useSubCategoryCache } from "../hooks/useSubCategoryCache";
import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice";

export const ItemMainCategory = () => {

    const main = useStore(v => v.selectedMainCategory);
    const setFloatingMenu = useStore(v => v.setFloatingPanel);

    const setSelect = useStore(v => v.setSelectCategory);
    const { addSubCategoryCache } = useSubCategoryCache(main?.path ?? "");

    if (!main) return null;

    const select = () => {
        setSelect({
            id: main.id,
            publicId: main.publicId,
            name: main.name,
            hasChildren: main.hasChildren,
            recordStatus: main.recordStatus,
            level: main.level,
            path: main.path,
            paths: [{ name: main.name, id: main.id, recordStatus:main.recordStatus }],
            hasAttributes: main.hasAttributes
        })
    }

    const onAdd = () => {
        addSubCategoryCache(main!.id, { id: Date.now(), name: "", level: 0, path: "", publicId: "" }, true)
        select()
    }

    const onOpenFloating = (cx: number, cy: number) => {
        setFloatingMenu({ type: FLOATING_PANEL_TYPE.CATEGORY, open: true, cx: cx!, cy: cy! })
        select()

    }

    const style = RECORD_STATUS_STYLES[main.recordStatus];

    return (
        <div className="select-none">
            <div className={`mb-1 flex items-center justify-between gap-3 py-4 px-3 rounded-lg`}
            >
                <div className="flex items-center gap-3">
                    {main.hasChildren
                        ? <span className="text-lg text-text-muted cursor-pointer"> <TbChevronDown size={20} /></span>
                        : <span className="text-lg text-text-muted cursor-pointer"> <MdOutlineSubdirectoryArrowRight size={20} /></span>}

                    <span className="text-text whitespace-nowrap font-bold truncate">{main.name}</span>
                    <span className={`text-[9px] ml-2 px-2 py-0.5 ${style.colorBg50} ${style.colorTxt500} rounded-full tracking-wider font-semibold uppercase`}>
                        {RECORD_STATUS_LABEL[main.recordStatus]}
                    </span>
                </div>
                <div className={`flex items-center gap-3 `}>
                    <button className="cursor-pointer text-text-subtle hover:text-primary"
                        onClick={onAdd}
                    >
                        <BiPlus size={25} />
                    </button>
                    <button className="cursor-pointer text-text-subtle hover:text-primary"
                        onClick={({ clientX, clientY }) => onOpenFloating(clientX, clientY)}
                    >
                        <MdMoreVert size={25} />
                    </button>
                </div>
            </div>
        </div>
    )
}
