import Dialog from "../../../../components/Dialog/Dialog";
import { useTrafficData } from "../../../../Context/TrafficDataContext/TrafficDataContext";
import { Button } from "../../../../components/Button/Button";
import { useState, useEffect } from "react";
import { InputField } from "../../../../components/InputField/InputField";
import { formatToInputDate } from "../../../../helpers/helpers";

export function UpdateRowDialog() {
    const {rowIdToUpdate, setRowIdToUpdate, updateRow, trafficData} = useTrafficData();
    const [visits, setVisits] = useState<string | null>(null);
    const [date, setDate] = useState<string | null>(null)

    useEffect(() => {
        const rowData = trafficData?.find((data) => data.id === rowIdToUpdate);
        if(!rowData) {
            return
        }
        setVisits(rowData.visits)
        setDate(formatToInputDate(rowData.date))
    },[trafficData, rowIdToUpdate])
    return(
        <Dialog
            isOpen={Boolean(rowIdToUpdate)}
            closeDialogCallback={() => setRowIdToUpdate(null)}
        >
            <h1 className="text-xl font-semibold mb-4 text-center">Update row</h1>
            <div className="flex flex-col gap-4 mb-6">
                <InputField
                    name="rowDate"
                    labelProps={{
                        children: "Date"
                    }}
                    inputProps={{
                        type: "date",
                        placeholder: "YYYY-MM-DD",
                        onChange: (e) => setDate(e.target.value),
                        value: date ? date : ''
                    }}
                />
                <InputField
                    labelProps={{children: "Visits"}}
                    inputProps={{
                        value: visits ? visits : '',
                        onChange: e => setVisits(e.target.value),
                        type: "number"
                    }}
                    name="visits"
                />
            </div>
            <div className="flex justify-center gap-5">
                <Button
                    isPrimary={true}
                    onClick={() => {
                        if (rowIdToUpdate === null || visits === null || date === null) return;
                        updateRow({ id: rowIdToUpdate, visits, date });
                    }}
                >
                    Submit
                </Button>
            </div>
        </Dialog>
    )
}