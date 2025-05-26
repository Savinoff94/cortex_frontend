import { useTrafficData } from "../../Context/TrafficDataContext/TrafficDataContext"
import { SortingTab } from "../Main/components/SortingTab/SortingTab"
import { RoleBasedDashboard } from "../../HOC/RoleBasedDashboard/RoleBasedDashboard"
import { DeleteRowDialog } from "../Main/components/DeleteRow/DeleteRow"
import { UpdateRowDialog } from "../Main/components/UpdateRow/UpdateRow"
import { FullScreenSpinner } from "../../components/Spinner/Spinner"

export function Dashboard() {
    const {rowIdToDelete, rowIdToUpdate, loading} = useTrafficData()
    return (
        <>
            <SortingTab/>
            <div>
                <RoleBasedDashboard/>
            </div>
            {rowIdToDelete && <DeleteRowDialog/>}
            {rowIdToUpdate && <UpdateRowDialog/>}
            {loading && <FullScreenSpinner/>}
        </>
    )
}