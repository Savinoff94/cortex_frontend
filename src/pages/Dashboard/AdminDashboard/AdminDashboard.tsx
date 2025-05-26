import TableUI from "../../../components/Table/Table";
import { useTrafficData } from "../../../Context/TrafficDataContext/TrafficDataContext";
export function AdminDashboard() {
    const {trafficData, setRowIdToDelete, setRowIdToUpdate} = useTrafficData();
    if(!trafficData) {
        return null;
    }
    return (
        <>
            <TableUI
                data={trafficData}
                collumns={[
                    {type: "date", label:"Date"},
                    {type: "visits", label:"Visits"},
                    {label:"Delete", skip: true},
                    {label:"Update", skip: true}
                ]}
                actionCollumns={[
                    {type: "delete", label:"Delete", onClick: (val) => {(setRowIdToDelete(val))}},
                    {type: "update", label:"Update", onClick: (val) => {(setRowIdToUpdate(val))}},
                ]}
            />
        </>
    )
}