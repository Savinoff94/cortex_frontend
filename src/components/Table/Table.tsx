import { type TableProps } from "./types"
import TableData from "./components/TableData/TableData"
import { THead } from "./components/THead/THead"
function TableUI<T extends {id : number}>(props : TableProps<T>) {
    const {collumns, data, actionCollumns = []} = props

    return (
        <table className="min-w-1/3 border-collapse border border-gray-200 text-sm ml-auto mr-auto my-3">
            <THead<T> collumns={collumns}/>
            <TableData<T> data={data} collumns={collumns} actionCollumns={actionCollumns}/>
        </table>
    )
}

export default TableUI