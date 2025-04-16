import { DayInfo } from "../types/day";
import Day from "./Day";

function Week({ days }: { days: DayInfo[] }) {
  return (
    <div className="grid grid-cols-7 gap-2 p-4 bg-gray-100 rounded-xl shadow">
      {days.map((day) => Day(day))}
    </div>
  );
}

export default Week;
