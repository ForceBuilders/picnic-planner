import { DayInfo, DayCondition, WeatherDay } from "../types/day";

const idealTempMax = 82;
const idealTempMin = 68;
const acceptableTempMax = 88;
const acceptableTempMin = 60;
const idealMaxPrecipitationChance = 10;
const acceptableMaxPrecipitationChance = 30;

function determineWeatherCondition(
  tempHigh: number,
  precipitationChance: number
) {
  // If we fall into the ideal conditions, then the day is Ideal
  if (
    tempHigh >= idealTempMin &&
    tempHigh <= idealTempMax &&
    precipitationChance <= idealMaxPrecipitationChance
  ) {
    return DayCondition.Ideal;
  }
  // If we can manage the acceptable conditions, then the day is Fair
  if (
    tempHigh >= acceptableTempMin &&
    tempHigh <= acceptableTempMax &&
    precipitationChance <= acceptableMaxPrecipitationChance
  ) {
    return DayCondition.Fair;
  }
  // Otherwise the day is Poor
  return DayCondition.Poor;
}

export function formatWeather(weather: WeatherDay[]) {
  const days: DayInfo[] = weather.map((day) => ({
    ...day,
    niceness: determineWeatherCondition(day.tempHigh, day.precipitationChance),
  }));

  return days;
}

// Expose private functions for testing
export const exportedForTesting = {
  determineWeatherCondition,
};
