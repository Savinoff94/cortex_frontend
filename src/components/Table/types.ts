import { type ActionCollumnVariant } from "../../types/types"
export type Collumn <T> = {
    label: string,
    type?: keyof T,
    skip?: boolean
}

export type ActionCollumn = {
    label: string,
    type: ActionCollumnVariant,
    onClick: (val: number, type: ActionCollumnVariant) => void
}
 

export type TableProps <T>= {
    data: T [],
    collumns: Collumn <T> []
    actionCollumns?: ActionCollumn[]
}