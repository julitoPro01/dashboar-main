
interface Props {
  HeaderRows: React.ReactNode,
  children: React.ReactNode
}

export const DynamicTable = ({ HeaderRows, children }: Props) => {
  return (

    <div className=" flex flex-col w-full h-full overflow-auto scrollbar-thin scrollbar-thumb-bg-select ">

      <table className="w-full h-full relative text-left table-auto min-w-max">
        <thead className=" sticky top-0 z-10"  >
          {HeaderRows}
        </thead>
        <tbody className=" overflow-auto">
          {children}
        </tbody>
      </table>

    </div>
  )
}

const HEIGHT = { sm: "25%", md: "50%", lg: "75%", full: "100%" } as const;
interface PropsR {
  HeaderRows: React.ReactNode,
  children: React.ReactNode,
  totalSize: number;
  roundedTop?: boolean;
  h?: keyof typeof HEIGHT;
}
export const DynamicReactTable = ({ HeaderRows, children, totalSize, roundedTop = true, h = "full" }: PropsR) => {

  return (
    <div className={`bg-surface border border-border ${roundedTop ? "rounded-t-xl" : ""} shadow-card overflow-hidden flex flex-col flex-1 max-h-[${HEIGHT[h]}]`}>

      <div className=" flex flex-col w-full h-full scrollbar-thin scrollbar-thumb-transparent  overflow-auto hover:scrollbar-thumb-active ">

        <table className={"relative left table-auto w-full h-full min-w-full"}
          style={{ width: totalSize, tableLayout: "fixed" }}
        >
          <thead className=" sticky top-0 z-10"  >
            {HeaderRows}

          </thead>
          <tbody className=" overflow-auto">
            {children}
            <tr>
              <td
                // Un número grande para cubrir todas las columnas
                colSpan={100}
                className="h-full p-0 m-0"
              >
                <div className="w-full h-full"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}