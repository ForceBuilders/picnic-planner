import { useQuery } from "@tanstack/react-query";
import { DayInfo } from "../types/day";
import { getHistoricalWeather } from "../lib/weatherApi";
import HistoryTable from "./HistoryTable";

interface ModalProps {
  dayName: string;
  dayValue: string;
  dayInfo: DayInfo;
  isOpen: boolean;
  onClose: () => void;
}

function degreesToCardinal(degrees: number) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

function DayDetail(props: ModalProps) {
  const day = props.dayInfo;

  const fetchData = async (dayDate: Date) => {
    const response = await getHistoricalWeather(dayDate);
    return response;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["history", props.dayInfo.dayDate],
    queryFn: () => fetchData(props.dayInfo.dayDate),
    enabled: !!props.isOpen,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (props.isOpen) {
    return (
      <div className="relative">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full relative">
            <div className="grid grid-cols-2 gap-2 p-4 bg-gray-100 rounded-xl shadow">
              <div
                className={
                  "flex flex-col col-span-2 items-center p-2 rounded-xl border font-bold"
                }
              >
                {props.dayName}, {props.dayValue}
              </div>
              <div
                className={"flex flex-col items-center p-2 rounded-xl border"}
              >
                <span>High {day.tempHigh}°</span>
                <span>Low {day.tempLow}°</span>
              </div>
              <div
                className={"flex flex-col items-center p-2 rounded-xl border"}
              >
                <span>Rain {day.precipitationChance}%</span>
                <span>{day.precipitationSum} Inches</span>
              </div>
              <div
                className={"flex flex-col items-center p-2 rounded-xl border"}
              >
                <span>Wind {day.windSpeedMax} MPH</span>
                <span>From {degreesToCardinal(day.windDirection)}</span>
              </div>
              <div
                className={"flex flex-col items-center p-2 rounded-xl border"}
              >
                <span>Humidity {day.humidityMean}%</span>
              </div>
            </div>
            <HistoryTable history={data}></HistoryTable>
          </div>
        </div>
      </div>
    );
  }

  return <div />;
}

export default DayDetail;
