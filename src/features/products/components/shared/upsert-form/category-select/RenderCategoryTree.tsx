import { CategoryTreeResponse } from "@/src/features/category/types"
import clsx from "clsx"
import { IoIosArrowDown } from "react-icons/io"

type SelectedCategoryTree = { id: number, name: string, parentId?: number  }


export const RenderCategoryTree = (
    onSelectCategoryTree: (catgs: SelectedCategoryTree[]) => void,
    selectedCategoryTree: SelectedCategoryTree[]
) => {


    const render = (categories: CategoryTreeResponse[], prevCat: SelectedCategoryTree[]) => {

        return <ul className="pl-5 relative  ">
            {
                categories.map((val) => {
                    const selectedeCategory = selectedCategoryTree.some(v => v.id === val.id);
                    return (
                        <li key={val.id} className={`flex flex-col justify-start px-2 border-s border-gray-300`}>

                            <div className="flex w-full max-w-md">
                                <div className={" py-2 my-1 rounded-md relative  hover:bg-white flex-1  group  flex   items-center  min-h-8 "}
                                    onClick={() => {
                                    }}
                                >
                                    {
                                        val.children.length > 0
                                            ? <div className=" h-full relative flex justify-start gap-2">
                                                <IoIosArrowDown className={`w-5   text-gray-400 h-full`} />
                                                <span className={clsx("px-2", { "bg-indigo-400 text-white rounded-2xl": selectedeCategory, })}>{val.name}</span>
                                                <span className={`w-5 pl-1 absolute -bottom-3 border-t text-gray-300`} />
                                            </div>
                                            : <div
                                                onClick={() => onSelectCategoryTree([...prevCat, { id: val.id, name: val.name, parentId: val.parentId ?? undefined }])}
                                                className={clsx("h-full border border-indigo-400 text-indigo-500 text-center font-semibold cursor-pointer stacked truncate px-2 hover:bg-indigo-400 hover:text-white rounded-2xl",
                                                    { "bg-indigo-400 text-white": selectedeCategory, })}>
                                                <span> - </span> <span className="px-2">{val.name}</span>
                                            </div>
                                    }
                                </div>

                            </div>

                            {render(val.children, [...prevCat, { id: val.id, name: val.name, parentId: val.parentId ?? undefined }])}

                        </li>
                    )
                })
            }
        </ul>
    }

    return render
}