"use client"
import { useState } from "react";
import { Item } from "./categoryTree-selector/Item";
import { NodeTree } from "./categoryTree-selector/NodeTree";
import { Button } from "@/src/shared/components/btn";
import { useCategoryTrees, useSearchCategoryTrees } from "../hooks";
import { CategoryTreeSkeleton } from "./CategoryTreeSkeleton";
import { CategoryTreeResponse, CatgTreeSelectorPath, CatgTreeSelectorSelect, CatgTreeSelectorSelected, } from "../../types";



interface Props {
    categoryId?: number;
    paths?: CatgTreeSelectorPath[];
    name?: string;
    path?: string;
    onConfirm: (params: CatgTreeSelectorSelected) => void;
    search: string
}
export const CategoryTreeSelector = ({ categoryId: id = 0, paths: pts = [], path = "", name = "", search, onConfirm }: Props) => {

    const [select, setSelect] = useState<CatgTreeSelectorSelect>({ id, path, isParent: false, name });

    const [paths, setPaths] = useState(pts);

    const { data, isLoading } = useSearchCategoryTrees({ search, notInStatus: ["DRAFT", "DELETED"] });

    const handleSelect = (val: CategoryTreeResponse[]) => {
        setPaths(val.map(({ name, id }) => ({ name, id })))
        const find = val.at(-1)!;
        setSelect({ id: find.id, path: find.path, isParent: !find.parentId, name: find.name })
    }

    if (isLoading)
        return <div className="px-8 pt-6 pb-8"><CategoryTreeSkeleton /></div>

    return (
        <div className="h-full flex flex-col">

            {/* <!-- Header --> */}

            <div className="px-6 sm:px-8 flex  py-2 border-t border-border
               text-xs uppercase tracking-wide font-semibold text-text-subtle">
                <div>Categoría</div>
                <div className="w-40 ml-auto flex justify-around ">
                    <span className="px-4">Estado</span>
                    <span className="px-4">Nivel</span>
                </div>
            </div>
            {/* <!-- Content --> */}
            <div className="px-6 sm:px-8 flex-1">

                {/* <!-- Root Node --> */}
                {
                    data.map(v => {
                        return (
                            <div key={v.id} className="group">
                                <Item ctg={v} selectedPath={[v]} onSelect={handleSelect}
                                    isSelected={v.id === select.id} hasChildren={!!v.children.length} />
                                <NodeTree
                                    onSelect={handleSelect} selected={{ id: select.id, path: select.path }}
                                    categoryTree={v.children} selectedPath={[v]} />
                            </div>
                        )
                    })
                }
            </div>



            <div className='sticky bottom-0 left-0 flex  items-center bg-background py-3 px-4 '>
                <div className='flex flex-wrap'>
                    <span className='text-text-muted pe-2'>
                        Seleccionado:
                    </span>
                    {paths.map(({ name, id }) => (
                        <span key={id} className="flex items-center text-primary after:px-1 last:after:content-none after:content-['❯'] after:text-text-muted">
                            {name}
                        </span>))}
                </div>

                <Button className='ml-auto' variant="confirm" rounded="full"
                    disabled={!select.id}
                    onClick={() => onConfirm({
                        id: select.id,
                        isParent: select.isParent,
                        name: select.name,
                        paths: paths,
                        path: select.path
                    })} > Confirmar </Button>
            </div>
        </div>
    )
}


