"use client"
import { useState } from "react";
import { Item } from "./categoryTree-selector/Item";
import { NodeTree } from "./categoryTree-selector/NodeTree";
import { Button } from "@/src/shared/components/btn";
import { useCategoryTrees } from "../hooks";
import { CategoryTreeSkeleton } from "./CategoryTreeSkeleton";
import { CategoryTreeResponse } from "../../types";

export type CategoryTreePath = { id: number, name: string };

type Select = { id: number, isParent: boolean, name: string };

interface Props {
    categoryId?: number;
    paths?: CategoryTreePath[];
    name?: string;
    onConfirm: (selectedId: number, isParent: boolean, paths: CategoryTreePath[], name: string) => void
}
export const CategoryTreeSelector = ({ categoryId: id = 0, paths = [], name = "", onConfirm }: Props) => {

    const [select, setSelect] = useState<Select>({ id, isParent: false, name });

    const [info, setInfo] = useState(paths);

    const { data, isLoading } = useCategoryTrees({ notInStatus: ["DRAFT", "DELETED"] });

    const handleSelect = (val: CategoryTreeResponse[]) => {
        setInfo(val.map(({ name, id }) => ({ name, id })))
        const find = val.at(-1)!;
        setSelect({ id: find.id, isParent: !find.parentId, name: find.name })
    }

    if (isLoading)
        return <div className="px-8 pt-6 pb-8"><CategoryTreeSkeleton /></div>

    return (
        <div className="h-full flex flex-col">

            {/* <!-- Header --> */}
            <div className="grid grid-cols-12 px-6 sm:px-8 py-2 border-b border-border
              bg-background text-xs uppercase tracking-wide font-semibold text-text-subtle">

                <div className="col-span-7">Categoría</div>
                <div className="col-span-4 text-center">Estado</div>
                <div className="col-span-1 text-center">Nivel</div>
            </div>

            {/* <!-- Content --> */}
            <div className="px-6 sm:px-8 py-2 flex-1">

                {/* <!-- Root Node --> */}
                {
                    data.map(v => {
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
                    {info.map(({ name, id }) => (
                        <span key={id} className="flex items-center text-primary after:px-1 last:after:content-none after:content-['❯'] after:text-text-muted">
                            {name}
                        </span>))}
                </div>

                <Button className='ml-auto' variant="secondary"
                    disabled={!select.id}
                    onClick={() => onConfirm(select.id, select.isParent, info, select.name)} > Confirmar </Button>
            </div>
        </div>
    )
}


