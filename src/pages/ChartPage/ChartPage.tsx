import { useSecureRequest } from "../../hooks/useSecureFirebaseRequest"
import { useEffect, useState } from "react"
import { type TrafficDataType } from "../../Context/TrafficDataContext/TrafficDataContext";
import { FullScreenSpinner } from "../../components/Spinner/Spinner";
import { Button } from "../../components/Button/Button";
import { groupByMonth, groupByWeek } from "../../helpers/helpers";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

type ChartGroupType = "day" | "week" | "month";
type ChartData = {
    x: string,
    y: number
}

export function ChartPage() {
    const {request, loading }= useSecureRequest()
    const [trafficData, setTrafficData] = useState<TrafficDataType[]>([])
    const [groupedTrafficData, setGroupedTrafficData] = useState<ChartData[]>([])
    const [groupingType, setGroupingType] = useState<ChartGroupType>("day")

    useEffect(() => {
        request({ url: `${import.meta.env.VITE_FIREBASE_PROD}api/stats/trafficStats` })
        .then((val) => {
            console.log(val)
            setTrafficData(val as TrafficDataType[])
        })
        .catch(console.error);
    }, [])

    useEffect(() => {

        if(groupingType === "day") {
            const formattedTrafficData = trafficData.map((item) => {
                const date = new Date(item.date)
                const formatted = date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                })
                return {
                    y: parseInt(item.visits),
                    x: formatted
                }
            })
            setGroupedTrafficData(formattedTrafficData)
        }
        if(groupingType === "week") {
            setGroupedTrafficData(groupByWeek(trafficData))
        }
        if(groupingType === "month") {
            setGroupedTrafficData(groupByMonth(trafficData))
        }

    }, [groupingType, trafficData])

    
    return (
        <>
            <div className="flex justify-center gap-4 p-2 rounded-lg">
                <Button
                    isPrimary={groupingType === "day"}
                    onClick={() => setGroupingType("day")}
                >
                    by Day
                </Button>
                <Button
                    isPrimary={groupingType === "week"}
                    onClick={() => setGroupingType("week")}
                >
                    by Week
                </Button>
                <Button
                    isPrimary={groupingType === "month"}
                    onClick={() => setGroupingType("month")}
                >
                    by Month
                </Button>
            </div>
            <div>
                <Line
                data={{
                    labels: groupedTrafficData.map((item) => item.x),
                    datasets: [
                      {
                        label: 'Visits',
                        data: groupedTrafficData.map((item) => item.y),
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.3,
                        fill: false,
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: true,
                      },
                      title: {
                        display: true,
                        text: 'Traffic Stats',
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Visits',
                        },
                      },
                    },
                  }}
                />
            </div>
            {loading && <FullScreenSpinner/>}
        </>
        
    )
}