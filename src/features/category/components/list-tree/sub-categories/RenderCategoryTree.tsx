import { UseFormRegisterReturn } from "react-hook-form"
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md"
import { TbChevronDown } from "react-icons/tb"
import { CategoryTreeNode } from "../../../types"
import { RECORD_STATUS_LABEL, RECORD_STATUS_STYLES } from "@/src/shared/domains/status"
import { BiPlus } from "react-icons/bi"

interface ItemProps {
    category: CategoryTreeNode;
    selectedId?: number;
    onAddCatgDirty: (id: number) => void;
    onSelect: (selectedItems: CategoryTreeNode[], isFloat?: true, cx?: number, cy?: number) => void;
    selectedItems: CategoryTreeNode[]
}

// COMPONENTE CATEGORÍA PADRE
export const ItemParent = ({ selectedItems, category, onAddCatgDirty, selectedId, onSelect }: ItemProps) => {
    const style = RECORD_STATUS_STYLES[category.recordStatus.name];

    return (
        <div className="px-2 group/sub select-none">
            <div className={`mb-1 flex items-center justify-between gap-3 py-3 my-1 px-2 rounded-lg
                  hover:bg-hover transition-colors ${category.id === selectedId ? "bg-bg-select" : ""}`}
                onClick={({ clientX, clientY }) => onSelect(selectedItems, true, clientX, clientY)}>
                <div className="flex items-center gap-3">
                    <span className="text-lg text-text-muted cursor-pointer"> <TbChevronDown size={16} /></span>
                    <span className="text-text  text-sm whitespace-nowrap">{category.name}</span>
                    <span className={`text-[9px] ml-2 px-2 py-0.5 ${style.colorBg50} ${style.colorTxt500} rounded-full tracking-wider font-semibold uppercase`}>
                        {RECORD_STATUS_LABEL[category.recordStatus.name]}
                    </span>
                </div>
                <div className={`flex items-center gap-1 ${category.id === selectedId ? "opacity-100" : "opacity-0"} group-hover/sub:opacity-100 transition-opacity`}>
                    <button className=" text-lg text-text-muted hover:text-primary rounded-md"
                        onClick={(e) => { e.stopPropagation(); onAddCatgDirty(category.id); onSelect(selectedItems) }}>
                        <BiPlus size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

// COMPONENTE CATEGORÍA HIJO
export const ItemChild = ({ selectedItems, category, selectedId, onAddCatgDirty, onSelect }: ItemProps) => {

    const style = RECORD_STATUS_STYLES[category.recordStatus.name];

    return (
        <div className="px-2 group/child select-none">
            <div className={`flex items-center justify-between gap-3 py-3 my-1 px-2 rounded-lg
                                hover:bg-hover transition-colors ${category.id === selectedId ? "bg-bg-select" : ""}`}
                onClick={({ clientX, clientY }) => onSelect(selectedItems, true, clientX, clientY)}>
                <div className="flex items-center gap-3">
                    <span className="text-lg text-text-subtle"><MdOutlineSubdirectoryArrowRight size={16} /></span>
                    <span className="text-sm text-text-muted whitespace-nowrap">{category.name}</span>
                    <span className={`text-[9px] ml-2 px-2 py-0.5 ${style.colorBg50} ${style.colorTxt500} rounded-full tracking-wider font-semibold uppercase`}>
                        {RECORD_STATUS_LABEL[category.recordStatus.name]}
                    </span>
                </div>
                <div className={`flex items-center gap-1 ${category.id === selectedId ? "opacity-100" : "opacity-0"} group-hover/child:opacity-100 transition-opacity`}>
                    <button className=" text-lg text-text-muted hover:text-primary rounded-md"
                        onClick={(e) => { e.stopPropagation(); onAddCatgDirty(category.id); onSelect(selectedItems) }}>
                        <BiPlus size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

// COMPONENTE - FORMULARIO
interface InputProps {
    register: UseFormRegisterReturn<"name">;
    onSubmit: () => void;
}
export const InputField = ({ register, onSubmit }: InputProps) => {

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit() }} className="px-2 ">
            <div className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-hover transition-colors">
                <span className="text-lg text-text-subtle"><MdOutlineSubdirectoryArrowRight /></span>
                <input className="flex-1 text-sm text-text rounded-xs ring-1 focus:ring-border-strong outline-none"
                    type="text"
                    {...register}
                    onBlur={() => onSubmit()}
                    autoFocus
                    onFocus={e => e.target.select()}
                    placeholder="Nombre de categoría"
                />
            </div>
        </form>
    )
}

//---------CATEGORÍA-ARBOL-------------------------------------------------
interface RenderProps {
    categoryTree: CategoryTreeNode;
    register: UseFormRegisterReturn<"name">;

    onSave: (id: number) => void;
    onAddCatgDirty: (id: number) => void;
    onSelect: (selectedItems: CategoryTreeNode[], isFloat?: true, cx?: number, cy?: number) => void;
    selectedItems: CategoryTreeNode[]

    selectedId?: number;
}
export const RenderCategoryTree = ({
    selectedItems,
    categoryTree,
    register,
    selectedId,
    onSave, onAddCatgDirty, onSelect }: RenderProps) => {
    const isParent = categoryTree.children.length;

    return (
        <div className={` ${categoryTree.parentId ? "border-l border-border ml-6" : ""}  pl-1 space-y-1`}>
            <div>
                {
                    categoryTree.isCreating
                        ? <InputField register={register} onSubmit={() => onSave(categoryTree.id)} />
                        : isParent
                            ? <ItemParent selectedItems={selectedItems} category={categoryTree} selectedId={selectedId} onAddCatgDirty={onAddCatgDirty} onSelect={onSelect} />
                            : <ItemChild selectedItems={selectedItems} category={categoryTree} selectedId={selectedId} onAddCatgDirty={onAddCatgDirty} onSelect={onSelect} />
                }
                {
                    categoryTree.children.map(v => (
                        <RenderCategoryTree key={v.id}
                            categoryTree={v}
                            register={register}
                            selectedItems={[...selectedItems, v]}
                            onSave={onSave}
                            onAddCatgDirty={onAddCatgDirty}
                            onSelect={onSelect}
                            selectedId={selectedId}
                        />
                    ))
                }
            </div>
        </div>
    )
}