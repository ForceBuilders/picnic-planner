import { useState } from "react";
import { DayInfo } from "../types/day";
import dayjs, { Dayjs } from "dayjs";
import DayDetail from "./DayDetail";

const nicenessIndicator = [
  "bg-green-300 text-black",
  "bg-yellow-200 text-black",
  "bg-red-300 text-black",
];

function Day(day: DayInfo) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  // Known Issue: https://github.com/iamkun/dayjs/issues/1903
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const dayDate: Dayjs = dayjs(day.dayDate) as Dayjs;
  const dayName = dayDate.format("dddd");
  const dayValue = dayDate.format("MMM D");
  return (
    <div
      key={day.dayDate.toString()}
      className={`flex flex-col items-center p-2 rounded-xl border ${
        nicenessIndicator[day.niceness]
      }`}
      onClick={() => {
        toggleModal();
      }}
    >
      <span className="font-bold">{dayName}</span>
      <span className="font-bold">{dayValue}</span>
      <span>High {day.tempHigh}°</span>
      <span>Rain {day.precipitationChance}%</span>
      <DayDetail
        dayName={dayName}
        dayValue={dayValue}
        dayInfo={day}
        isOpen={isOpen}
        onClose={toggleModal}
      ></DayDetail>
    </div>
  );
}

export default Day;
