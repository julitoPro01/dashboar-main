
interface Props {
    relation: {id:number,name:string,parentId?:number | null}[]
}

export const CardInfoRelation = ({ relation }: Props) => {
    return (
        <div className="rounded-xl bg-white p-4 border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-700 ">Relación</h3>

            <div className="flex flex-wrap items-center text-sm gap-1">
                {relation.map((val, i) => (
                    <span key={val.id} className="flex items-center">
                        <span className="font-medium text-slate-700">{val.name}</span>
                        {i + 1 < relation.length && (
                            <span className="mx-1 text-slate-400">{'>'}</span>
                        )}
                    </span>
                ))}
            </div>
        </div>
    )
}
