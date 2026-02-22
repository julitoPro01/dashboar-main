
interface Props{
    name:string;
    parentName?:string;
    slug:string;
}

export const CardInfoCatg = ({name,parentName, slug}:Props) => {
    return (
        <div className="rounded-xl bg-white p-4  border border-slate-200 space-y-2">

            <div className="text-sm">
                <span className="font-semibold text-slate-700">Categoría: </span>
                <span className="text-blue-600">{name}</span>
            </div>

            {parentName && (
                <div className="text-sm">
                    <span className="font-semibold text-slate-700">Categoría padre: </span>
                    <span className="text-blue-600">
                        {parentName}
                    </span>
                </div>
            )}

            <div className="text-sm">
                <span className="font-semibold text-slate-700">Slug: </span>
                <span className="text-blue-600">{slug}</span>
            </div>
        </div>
    )
}
