import { createContext, useEffect, useState, useContext } from "react";
import { type SortingDirection } from "../../types/types";
import { type ReactNode } from "react";
import { useSecureRequest } from "../../hooks/useSecureFirebaseRequest";
import { url } from "../../helpers/helpers";


type TrafficDataContextType = {
    trafficData: TrafficDataType[] | null,
    dateDirection: SortingDirection,
    updateDateDirection: (val: SortingDirection) => void,
    trafficDirection: SortingDirection,
    updateTrafficDirection: (val: SortingDirection) => void,
    startDate: string,
    setStartDate: (val: string) => void,
    endDate: string,
    setEndDate: (val: string) => void,
    rowIdToDelete: number | null,
    rowIdToUpdate: number | null,
    setRowIdToDelete: (val: number | null) => void
    setRowIdToUpdate: (val: number | null) => void
    deleteRow: () => void,
    fetchData: () => void
    updateRow: (params : UpdateRowParam) => void
    createRow: (params : CreateRowParams) => void,
    loading: boolean
}

type CreateRowParams = {
    callbackOnSuccess :() => void
} & Omit<UpdateRowParam, "id">

type UpdateRowParam = {
    id: number,
    visits: string,
    date: string
}

export type TrafficDataType = {
    id: number,
    visits: string,
    date: string,
}


const TrafficDataContext = createContext<TrafficDataContextType | null>(null)

export function TrafficDataContextProvider({children} : {children: ReactNode}) {
    const {request, loading} = useSecureRequest();
    const [trafficData, setTrafficData] = useState<null | TrafficDataType[]>(null)
    const [dateDirection, setDateDirection] = useState<SortingDirection>("asc")
    const [trafficDirection, setTrafficDirection] = useState<SortingDirection>("default")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [rowIdToDelete, setRowIdToDelete] = useState<number| null>(null)
    const [rowIdToUpdate, setRowIdToUpdate] = useState<number| null>(null)

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        const params = new URLSearchParams();
        params.set("dateDirection", dateDirection);
        params.set("trafficDirection", trafficDirection);
        params.set("startDate", startDate);
        params.set("endDate", endDate);
        const queryString = params.toString();
        const fullUrl = `api/stats/trafficStats?${queryString}`;
        console.log(queryString)
        request({ url: `${url}${fullUrl}` })
        .then((val) => {
            setTrafficData(val as TrafficDataType[])
        })
        .catch(console.error);
    }

    async function deleteRow() {
        if(!rowIdToDelete) {
            return
        }

        try {
            await request({
                url: `${url}api/stats/trafficStats?id=${rowIdToDelete}`,
                method: "DELETE"
            })
            setRowIdToDelete(null)
            await fetchData()
        } catch (error) {
            console.log(error)
        }
    }
    async function updateRow({id, visits, date} : UpdateRowParam) {
        const visitsNumber = parseInt(visits)
        try {
            await request({ 
                url: `${url}api/stats/trafficStats?`, 
                method: "PUT", body: {id, visits: visitsNumber, date}
            })
            setRowIdToUpdate(null)
            await fetchData()
        } catch (error) {
            console.log(error)
        }
    }
    async function createRow({visits, date, callbackOnSuccess} : CreateRowParams) {
        const visitsNumber = parseInt(visits)
        try {
            await request({
                url: `${url}api/stats/trafficStats?`,
                method: "POST", body: {visits: visitsNumber, date}
            })
            callbackOnSuccess()
            await fetchData()
        } catch (error) {
            console.log(error)
        }
    }

    function updateTrafficDirection(dir : SortingDirection) {
        if(dir === "default") {
            setTrafficDirection(dir)
            setDateDirection("asc")
            return;
        }
        setTrafficDirection(dir)
        setDateDirection("default")
    }
    function updateDateDirection(dir : SortingDirection) {
        console.log('here')
        if(dir === "default") {
            setDateDirection(dir)
            setTrafficDirection("asc")
            return;
        }
        setDateDirection(dir)
        setTrafficDirection("default")
    }


    return (
        <TrafficDataContext.Provider
            value={{
                dateDirection,
                updateDateDirection,
                trafficDirection,
                updateTrafficDirection,
                startDate,
                setStartDate,
                endDate,
                setEndDate,
                trafficData,
                rowIdToDelete,
                setRowIdToDelete,
                deleteRow,
                fetchData,
                updateRow,
                createRow,
                rowIdToUpdate,
                setRowIdToUpdate,
                loading
            }}
        >
            {children}
        </TrafficDataContext.Provider>
    )
}

export const useTrafficData = (): TrafficDataContextType => {
    const context = useContext(TrafficDataContext);
    if (!context) {
      throw new Error("useTrafficData must be used within an TrafficDataContextProvider");
    }
    return context;
};