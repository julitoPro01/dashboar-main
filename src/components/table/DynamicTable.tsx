
interface Props {
  HeaderList: React.ReactNode,
  children: React.ReactNode
}

export const DynamicTable = ({ HeaderList, children }: Props) => {
  return (

    <div className=" flex flex-col w-full h-full overflow-auto scrollbar-thin scrollbar-thumb-bg-select ">

      <table className="w-full h-full relative text-left table-auto min-w-max">
        <thead className=" sticky top-0 z-10"  >
          {HeaderList}
        </thead>
        <tbody className=" overflow-auto">
          {children}
        </tbody>
      </table>

    </div>
  )
}

interface PropsR {
  HeaderList: React.ReactNode,
  children: React.ReactNode,
  totalSize: number;
}
export const DynamicReactTable = ({ HeaderList, children, totalSize }: PropsR) => {

  return (
    <div className=" flex flex-col w-full h-full scrollbar-thin scrollbar-thumb-transparent  overflow-auto hover:scrollbar-thumb-bg-select ">

      {/* <table className="w-full h-full relative text- min-w-max"> */}
      <table className={"relative left table-auto w-full h-full min-w-full"}
        style={{ width: totalSize, tableLayout: "fixed" }}
      >
        <thead className=" sticky top-0 z-10"  >
          {HeaderList}
         
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
  )
}