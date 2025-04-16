import { Day, DayCondition } from "../types/day";
import { WeatherDay } from "./weatherApi";

function determineWeatherCondition(highTemp: number, rainChance: number) {
  if (highTemp > 68 && rainChance < 10) {
    return DayCondition.Ideal;
  }
  if (highTemp > 60 && rainChance < 30) {
    return DayCondition.Fair;
  }
  return DayCondition.Poor;
}

export function formatWeather(weather: WeatherDay[]) {
  const days: Day[] = weather.map((day) => ({
    ...day,
    niceness: determineWeatherCondition(day.highTemp, day.rainChance),
  }));

  return days;
}
