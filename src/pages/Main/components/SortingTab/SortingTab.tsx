import { SpecificValuesButton } from "../../../../components/SpecificValuesButton/SpecificValuesButton"
import { sortingDirections, type SortingDirection } from "../../../../types/types"
import { useTrafficData } from "../../../../Context/TrafficDataContext/TrafficDataContext"
import { InputField } from "../../../../components/InputField/InputField"
import { Button } from "../../../../components/Button/Button"
import { ButtonWithDialog } from "./components/ButtonWithDialog/ButtonWithDialog"

export function SortingTab() {
    const {dateDirection,
        updateDateDirection,
        trafficDirection,
        updateTrafficDirection,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        fetchData
    } = useTrafficData()

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-200 items-center justify-evenly w-full">
            
            <div className="flex flex-wrap gap-4 items-center justify-center">
                <SpecificValuesButton<SortingDirection>
                    defaultVal={dateDirection}
                    values={sortingDirections}
                    onClick={(val) => {
                        updateDateDirection(val)
                    }}
                    format={(val: SortingDirection) => `date ${val}`}
                />
                <SpecificValuesButton<SortingDirection>
                    defaultVal={trafficDirection}
                    values={sortingDirections}
                    onClick={(val) => {
                        updateTrafficDirection(val)
                    }}
                    format={(val: SortingDirection) => `Visits ${val}`}
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <InputField
                    name="startDate"
                    labelProps={{
                        children: "Start date"
                    }}
                    inputProps={{
                        type: "date",
                        placeholder: "YYYY-MM-DD",
                        onChange: (e) => setStartDate(e.target.value),
                        value: startDate
                    }}
                />
                <InputField
                    name="endDate"
                    labelProps={{
                        children: "End date"
                    }}
                    inputProps={{
                        type: "date",
                        placeholder: "YYYY-MM-DD",
                        onChange: (e) => setEndDate(e.target.value),
                        value: endDate
                    }}
                />
            </div>
            <div className="flex flex-col justify-center sm:flex-row gap-4 w-full lg:w-auto">
                <ButtonWithDialog/>
                <Button
                    isPrimary={true}
                    onClick={fetchData}
                >
                    Refresh data
                </Button>
            </div>

            
        </div>
    )
}