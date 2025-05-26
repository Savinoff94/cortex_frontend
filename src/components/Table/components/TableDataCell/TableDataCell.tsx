import { type ActionCollumn } from "../../types";
type TableDataCellProps<T> = {
    type: keyof T,
    value: T[keyof T]
}

export function TableDataCell<T>({type, value}: TableDataCellProps<T>) {

    if (type === "visits") {
        return (
            <td className="border-b border-gray-200 px-4 py-2 text-gray-800">
                {String(value)}
            </td>
        )
    }

    if (type === "date") {
        const date = new Date(String(value));
        return (
            <td className="border-b border-gray-200 px-4 py-2 text-gray-800">
                {date.toLocaleDateString("en-US")}
            </td>
        )
    }
    
    return (
        <td className="border-b border-gray-200 px-4 py-2 text-red-300">
            Unknown data
        </td>
    )
}

type TableDataActionCell = {
    id: number,
} & ActionCollumn
 
export function TableDataActionCell({type, onClick, id, label}: TableDataActionCell) {
    return (
        <td 
            className="border-b border-gray-200 px-4 py-2"
            key={`${id}${String(type)}`}
        >
            <button
                onClick={() => onClick(id, type)}
                className={`hover:text-sky-800 p-1 font-medium focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-1 rounded transition 
                    ${type === "delete" 
                        ? "bg-red-600 hover:bg-red-500 focus:ring-red-300 text-gray-800" 
                        : "bg-green-600 hover:bg-green-700 focus:ring-green-500 text-gray-800"}`}
            >
                {label}
            </button>
        </td>
    )
}