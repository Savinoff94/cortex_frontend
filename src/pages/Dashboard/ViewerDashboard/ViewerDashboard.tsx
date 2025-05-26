import TableUI from "../../../components/Table/Table";
import { useTrafficData } from "../../../Context/TrafficDataContext/TrafficDataContext";
export function ViewerDashboard() {
    console.log('viewer')
    const {trafficData} = useTrafficData();
    if(!trafficData) {
        return null;
    }
    return (
        <TableUI
            data={trafficData}
            collumns={[
                {type: "date", label:"Date"},
                {type: "visits", label:"Visits"}
            ]}
        />
    )
}