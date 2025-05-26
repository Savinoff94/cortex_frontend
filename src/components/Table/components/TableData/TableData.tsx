import { type TableProps } from "../../types"
import { TableDataCell, TableDataActionCell } from "../TableDataCell/TableDataCell"
function TableData<T extends {id : number}>(props: TableProps<T>) {
    const {data, collumns, actionCollumns = []} = props
    return (
        <tbody>
            {
                data.map((row, index) => {
                    return (
                        <tr 
                            key={row.id}
                            className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                        >
                            {
                                collumns.map((collumn) => {
                                    if(collumn.skip) return null;
                                    if(collumn.type === undefined) return null
                                    if(!(collumn.type in row)) return null
                                    
                                    return <TableDataCell<T> key={`${row.id}${String(collumn.type)}`} type={collumn.type} value={row[collumn.type]}/>
                                })
                            }
                            {
                                actionCollumns.map((collumn) => {
                                    return (
                                        <TableDataActionCell
                                        key={`${row.id}${collumn.type}`}
                                        id={row.id}
                                        type={collumn.type}
                                        onClick={collumn.onClick}
                                        label={collumn.label}
                                        />
                                    )
                                })
                            }
                        </tr>
                    )
                })
            }
        </tbody>
    )
}

export default TableData