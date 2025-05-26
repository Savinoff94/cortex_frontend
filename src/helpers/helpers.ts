import { type TrafficDataType } from "../Context/TrafficDataContext/TrafficDataContext";

export function formatToInputDate(isoDateString: string): string {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export function groupByWeek(data: TrafficDataType[]) {
    const groups: Record<string, number> = {};

    for (const item of data) {
        const dateObj = new Date(item.date);
        const week = getISOWeek(dateObj);
        const visits = parseInt(item.visits, 10);

        groups[week] = (groups[week] || 0) + (isNaN(visits) ? 0 : visits);
    }

    return Object.entries(groups).map(([week, total]) => ({
        x: week,
        y: total,
    }));
}
  
export function groupByMonth(data: TrafficDataType[]) {
    const groups: Record<string, number> = {};

    for (const item of data) {
        const dateObj = new Date(item.date);
        const key = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}`; // e.g. "2024-06"
        const visits = parseInt(item.visits, 10);

        groups[key] = (groups[key] || 0) + (isNaN(visits) ? 0 : visits);
    }

    return Object.entries(groups).map(([month, total]) => ({
        x: month,
        y: total,
    }));
}

function getISOWeek(date: Date): string {
    const tmp = new Date(date.getTime());
    tmp.setHours(0, 0, 0, 0);
    tmp.setDate(tmp.getDate() + 3 - ((tmp.getDay() + 6) % 7));
    const week1 = new Date(tmp.getFullYear(), 0, 4);
    const weekNumber = 1 + Math.round(((tmp.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
  
    return `${tmp.getFullYear()}-W${String(weekNumber).padStart(2, "0")}`; // e.g. 2024-W24
}