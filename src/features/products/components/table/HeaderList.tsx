import { MdMoreVert } from "react-icons/md";

export const TableHeaderList = () => {
    return (
        <tr className="border-b border-slate-300 bg-slate-100">
            <th className="w-12.5 px-4 py-3 text-sm  text-slate-500 bg-slate-100 sticky z-10 left-0 text-center"> # </th>
            <th className={`w-25 px-4 py-3 text-xs tracking-wide  text-slate-500 uppercase font-bold`}  >
                <span>Imagen</span>
            </th>
            <th className={`${styleItem} min-w-50`}>Nombre</th>
            <th className={`${styleItem} min-w-15`}>Stock</th>
            <th className={`${styleItem} min-w-20`}>Descuento</th>
            <th className={`${styleItem} min-w-20`}>Precio</th>
            <th className={`${styleItem} min-w-30`}>Categoría</th>
            <th className={`${styleItem} min-w-30`}>Estado</th>
            <th className={`${styleItem} min-w-30`}>Sku</th>
            <th className={`${styleItem} min-w-37.5`}>Creado</th>
            <th className={`${styleItem} min-w-37.5`}>Actualizado</th>

            <th className="h-12 w-12.5  p-0">
                <div className="h-full">
                    <button className="h-full w-full flex justify-center items-center px-3 font-normal text-slate-500 hover:bg-slate-200 hover:text-gray-800">
                        <MdMoreVert size={25} />
                    </button>
                </div>
            </th>
        </tr>
    )
}


const styleItem = "relative px-4 py-3 text-sm font-normal tracking-wide  text-slate-500";