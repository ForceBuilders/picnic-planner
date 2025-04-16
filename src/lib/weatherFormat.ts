import { DayInfo, DayCondition, WeatherDay } from "../types/day";

export function determineWeatherCondition(
  tempHigh: number,
  precipitationChance: number
) {
  if (tempHigh > 90) {
    return DayCondition.Poor;
  }
  if (tempHigh > 68 && precipitationChance < 10) {
    return DayCondition.Ideal;
  }
  if (tempHigh > 60 && precipitationChance < 30) {
    return DayCondition.Fair;
  }
  return DayCondition.Poor;
}

export function formatWeather(weather: WeatherDay[]) {
  const days: DayInfo[] = weather.map((day) => ({
    ...day,
    niceness: determineWeatherCondition(day.tempHigh, day.precipitationChance),
  }));

  return days;
}
