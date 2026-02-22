
interface HeaderProps {
    firstItem?: { name: string, onClick?: () => void };
    headers: { name: string, onClick?: () => void, id: string | number }[];
}
export const TableHeaderList = ({ headers, firstItem }: HeaderProps) => {

    return (
        <tr className="border-b border-slate-300 bg-slate-100">
            <th onClick={firstItem?.onClick} className="p-4 w-5 text-sm font-normal leading-none text-slate-500 bg-slate-100 sticky left-0 text-center"> {firstItem ? firstItem.name : "#"} </th>
            {
                headers.map((v) => (
                    <th key={v.id}
                        role={v.onClick ? "button" : undefined}
                        onClick={v.onClick}
                        className={`p-4 text-sm font-normal leading-none text-slate-500 ${v.onClick ? "cursor-pointer hover:text-slate-700" : ""
                            }`}
                    > {v.name} </th>
                ))
            }
            <th className="p-4 text-sm font-normal leading-none text-slate-500 "></th>
        </tr>
    )
}