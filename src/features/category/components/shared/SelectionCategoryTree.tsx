"use client"
import { useState } from "react";
import { CategoryTreeResponse } from "../../shared/categoryTree.api.type";
import { Item } from "./selection-categoryTree/Item";
import { NodeTree } from "./selection-categoryTree/NodeTree";
import { Button } from "@/src/shared/components/btn";

type Paths = { id: number, name:string };

interface Props {
    categoryTree: CategoryTreeResponse[];
    categoryId?: number;
    paths?: Paths[];
    onConfirm:(selectedId:number,isParent:boolean,paths:Paths[])=>void
}
export const SelectionCategoryTree = ({ categoryTree, categoryId = 0, paths = [], onConfirm }: Props) => {

    const [select, setSelect] = useState<{ id: number, isParent: boolean }>({ id: categoryId, isParent: false });

    const [info, setInfo] = useState(paths);

    const handleSelect = (val: CategoryTreeResponse[]) => {
        setInfo(val.map(({ name, id }) => ({ name, id })))
        const find = val.at(-1)!;
        setSelect({ id: find.id, isParent: !find.parentId })
    }

    return (
        <div>
        
                {/* <!-- Header --> */}
                <div className="grid grid-cols-12 px-6 sm:px-8 py-2 border-b border-border
              bg-background text-xs uppercase tracking-wide font-semibold text-text-subtle">

                    <div className="col-span-7">Categoría</div>
                    <div className="col-span-4 text-center">Estado</div>
                    <div className="col-span-1 text-center">Nivel</div>
                </div>

                {/* <!-- Content --> */}
                <div className="px-6 sm:px-8 py-2">

                    {/* <!-- Root Node --> */}
                    {
                        categoryTree.map(v => {
                            return (
                                <div key={v.id} className="group">
                                    <Item ctg={v} selected={[v]} onSelect={handleSelect} selectedId={select.id} />
                                    <NodeTree
                                        onSelect={handleSelect} selectedId={select.id}
                                        categoryTree={v.children} selected={[v]} />
                                </div>
                            )
                        })
                    }
                </div>

          

            <div className='sticky bottom-0 left-0 flex  items-center bg-background py-2 px-4 '>
                <div className='flex flex-wrap'>
                    <span className='text-text-muted pe-2'>
                        Seleccionado:
                    </span>
                    {info.map(({ name, id }, i) => (
                        <span key={id} className="flex items-center text-amber-500 after:px-1 last:after:content-none after:content-['❯'] after:text-text-muted">
                            {name}
                        </span>))}
                </div>

                <Button className='ml-auto' variant="outline"
                    disabled={!select.id}
                    onClick={() => onConfirm( select.id, select.isParent, info)} > Confirmar </Button>
            </div>
        </div>
    )
}


