import { ProductResponse } from "@/src/interfaces/products"
import clsx from "clsx";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseFill } from "react-icons/ri";

interface Props {
  products: ProductResponse[];
  currentPage: number;
  itemsPerPage: number;
}

export const BodyList = ({ products, currentPage, itemsPerPage }: Props) => {
  const index = (i: number) => (currentPage - 1) * itemsPerPage + i + 1;

  return (
    <>
      {
        products.map((v, i) => {

          const count = index(i);

          return (
            <tr key={v.id} data-row-index={count} className={`${containStyle} ${v.id === 0 ? containStyle.selected : ""}`}>

              <td className={countStyle}> <span className="text-sm block font-semibold"> {count < 10 ? 0 + "" + count : count} </span>  </td>

              <td className={`${itemStyle} min-w-25`} >
                <img src={v.imgUrl ? v.imgUrl : "/assets/notfound.jpg"} alt="Product" className="w-16 h-16 object-cover rounded" />
              </td>

              <td className={`${itemStyle} min-w-50`}>
                <span>{v.name}</span>
              </td>
              <td className={`${itemStyle} min-w-15`}>
                <span>{v.stock}</span>
              </td>
              <td className={`${itemStyle} min-w-20`}>
                Descuento
              </td>
              <td className={`${itemStyle} min-w-20`}>
                Precio
              </td>
              <td className={`${itemStyle} min-w-30`}>
                Categoría
              </td>
              <td className={`${itemStyle} min-w-30`}>
                Estado
              </td>
              <td className={`${itemStyle} min-w-30`}>
                Sku
              </td>
              <td className={`${itemStyle} min-w-37.5`}>
                Creado
              </td>
              <td className={`${itemStyle} min-w-37.5`}>
                Actualizado
              </td>
              
              <td className={`${itemStyle} ${actionStyle.base}`}
                onClick={(e) => {
                  e.stopPropagation();
                  //  onSelect(e, v, 0, "preview")
                }}  >
                <div className="h-full">
                  <button className={actionStyle.btn}>
                    <MdOutlineRemoveRedEye size={20}
                      className={clsx("text-gray-500/50 group-hover/item01:text-slate-800  text-red", {
                        "group-hover/content:block hidden": v.id !== 0
                      })} />
                    <RiEyeCloseFill size={20}
                      className={clsx("text-gray-500/50 group-hover/content:hidden", {
                        "hidden": v.id === 0,
                      })} />
                  </button>
                </div>
              </td>
            </tr>
          )
        })
      }
    </>
  )
}


const containStyle = {
  base: "hover:bg-slate-100 group/content relative cursor-pointer",
  selected: "bg-slate-100"
};
const countStyle = "sticky left-0 px-2 text-center border-b border-slate-200 bg-slate-100";
const itemStyle = "p-4 border-b border-slate-200";
const actionStyle = {
  base: "w-12.5 h-13 bg-slate-100 hover:bg-slate-200 group/item01",
  btn: "h-full w-full flex justify-center items-center text-slate-500 hover:text-gray-800"
}