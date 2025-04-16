import { useState, useEffect } from "react";
import { DayInfo, HistoricalWeatherDay } from "../types/day";
import { getHistoricalWeather } from "../lib/weatherApi";

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

  const [data, setData] = useState<HistoricalWeatherDay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHistoricalWeather(props.dayInfo.dayDate);
        setData(response);
      } catch (e: unknown) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(data);

  return (
    <div className="relative">
      {props.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full relative">
            <div className="grid grid-cols-2 gap-2 p-4 bg-gray-100 rounded-xl shadow">
              <div
                className={`flex col-span-2 items-center p-2 rounded-xl border`}
              >
                <span className="font-bold">
                  {props.dayName}, {props.dayValue}
                </span>
              </div>
              <div
                className={`flex flex-col items-center p-2 rounded-xl border`}
              >
                <span>High {day.tempHigh}°</span>
                <span>Low {day.tempLow}°</span>
              </div>
              <div
                className={`flex flex-col items-center p-2 rounded-xl border`}
              >
                <span>Rain {day.precipitationChance}%</span>
                <span>{day.precipitationSum} Inches</span>
              </div>
              <div
                className={`flex flex-col items-center p-2 rounded-xl border`}
              >
                <span>Wind {day.windSpeedMax} MPH</span>
                <span>From {degreesToCardinal(day.windDirection)}</span>
              </div>
              <div
                className={`flex flex-col items-center p-2 rounded-xl border`}
              >
                <span>Humidity {day.humidityMean}%</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 p-4 bg-gray-100 rounded-xl shadow">
              <div className={`flex flex-col items-center border`}>
                <span className="font-bold">Year</span>
              </div>
              <div className={`flex flex-col items-center border`}>
                <span className="font-bold">High</span>
              </div>
              <div className={`flex flex-col items-center border`}>
                <span className="font-bold">Low</span>
              </div>
              <div className={`flex flex-col items-center border`}>
                <span className="font-bold">Precip</span>
              </div>
              {/* Details below */}
              <div className={`flex flex-col items-center border`}>
                {data[0].dayDate.getFullYear()}
              </div>
              <div className={`flex flex-col items-center border`}>
                {data[0].tempHigh}
              </div>
              <div className={`flex flex-col items-center border`}>
                {data[0].tempLow}
              </div>
              <div className={`flex flex-col items-center border`}>
                {data[0].precipitationSum}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DayDetail;
