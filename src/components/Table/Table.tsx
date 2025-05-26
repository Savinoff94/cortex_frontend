import { type TableProps } from "./types"
import TableData from "./components/TableData/TableData"
import { THead } from "./components/THead/THead"
function TableUI<T extends {id : number}>(props : TableProps<T>) {
    const {collumns, data, actionCollumns = []} = props

    return (
        <table className="min-w-full border-collapse border border-gray-200 text-sm">
            <THead<T> collumns={collumns}/>
            <TableData<T> data={data} collumns={collumns} actionCollumns={actionCollumns}/>
        </table>
    )
}

export default TableUI