import TableHeader from "../TableHeader/TableHeader"
import { type Collumn } from "../../types"
type THeadProps<T> = {
    collumns: Collumn<T>[]
}

export function THead<T>({collumns} : THeadProps<T>) {
    return (
        <thead className="bg-gray-100">
            <tr>
                {
                    collumns.map((collumn) => {
                        return <TableHeader key={String(collumn?.type ? collumn?.type : collumn.label)} {...collumn}/>
                    })
                }
            </tr>
        </thead>
    )
}