type TableHeaderProps = {
    label: string,
}
function TableHeader ({label} : TableHeaderProps) {
    return (
        <th className="border-b border-gray-300 px-4 py-2 text-center font-semibold text-gray-700">
            {label}
        </th>
    )
}

export default TableHeader