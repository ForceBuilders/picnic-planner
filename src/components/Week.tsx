import { Day } from "../types/day";
import dayjs, { Dayjs } from "dayjs";

const nicenessIndicator = [
  "bg-green-300 text-black",
  "bg-yellow-200 text-black",
  "bg-red-300 text-black",
];

function FormattedDay(day: Day) {
  const dayDate: Dayjs = dayjs(day.dayDate) as Dayjs;
  return (
    <div
      key={day.dayDate.toString()}
      className={`flex flex-col items-center p-2 rounded-xl border ${
        nicenessIndicator[day.niceness]
      }`}
    >
      <span className="font-bold">{dayDate.format("dddd")}</span>
      <span className="font-bold">{dayDate.format("MMM D")}</span>
      <span>High {day.highTemp}°</span>
      <span>Rain {day.rainChance}%</span>
    </div>
  );
}

function Week({ days }: { days: Day[] }) {
  return (
    <div className="grid grid-cols-7 gap-2 p-4 bg-gray-100 rounded-xl shadow">
      {days.map((day) => FormattedDay(day))}
    </div>
  );
}

export default Week;
