import { fetchWeatherApi } from "openmeteo";
import { WeatherDay, HistoricalWeatherDay } from "../types/day";

const commonParams = {
  latitude: 40.622231,
  longitude: -80.05928,
  timezone: "America/New_York",
  wind_speed_unit: "mph",
  temperature_unit: "fahrenheit",
  precipitation_unit: "inch",
};

export async function getCurrentWeather(): Promise<WeatherDay[]> {
  const params = {
    ...commonParams,
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "apparent_temperature_max",
      "apparent_temperature_min",
      "precipitation_sum",
      "precipitation_hours",
      "precipitation_probability_max",
      "snowfall_sum",
      "wind_speed_10m_max",
      "wind_gusts_10m_max",
      "wind_direction_10m_dominant",
      "relative_humidity_2m_mean",
      "relative_humidity_2m_min",
      "relative_humidity_2m_max",
    ],
    forecast_days: 14,
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  const daily = response.daily()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    daily: {
      time: [
        ...Array(
          (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval()
        ),
      ].map(
        (_, i) => new Date((Number(daily.time()) + i * daily.interval()) * 1000)
      ),
      temperature2mMax: daily.variables(0)?.valuesArray(),
      temperature2mMin: daily.variables(1)?.valuesArray(),
      apparentTemperatureMax: daily.variables(2)?.valuesArray(),
      apparentTemperatureMin: daily.variables(3)?.valuesArray(),
      precipitationSum: daily.variables(4)?.valuesArray(),
      precipitationHours: daily.variables(5)?.valuesArray(),
      precipitationProbabilityMax: daily.variables(6)?.valuesArray(),
      snowfallSum: daily.variables(7)?.valuesArray(),
      windSpeed10mMax: daily.variables(8)?.valuesArray(),
      windGusts10mMax: daily.variables(9)?.valuesArray(),
      windDirection10mDominant: daily.variables(10)?.valuesArray(),
      relativeHumidity2mMean: daily.variables(11)?.valuesArray(),
      relativeHumidity2mMin: daily.variables(12)?.valuesArray(),
      relativeHumidity2mMax: daily.variables(13)?.valuesArray(),
    },
  };

  const days: WeatherDay[] = [];
  for (let i = 0; i < weatherData.daily.time.length; i++) {
    days.push({
      dayDate: new Date(weatherData.daily.time[i]),
      tempHigh: Math.round(weatherData.daily.temperature2mMax[i]),
      tempLow: Math.round(weatherData.daily.temperature2mMin[i]),
      precipitationChance: Math.round(
        weatherData.daily.precipitationProbabilityMax[i]
      ),
      precipitationSum: Math.round(weatherData.daily.precipitationSum[i]),
      windSpeedMax: Math.round(weatherData.daily.windSpeed10mMax[i]),
      windSpeedGusts: Math.round(weatherData.daily.windGusts10mMax[i]),
      windDirection: Math.round(weatherData.daily.windDirection10mDominant[i]),
      humidityMean: Math.round(weatherData.daily.relativeHumidity2mMean[i]),
    });
  }
  return days;
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function getPastWeather(day: Date): Promise<HistoricalWeatherDay> {
  const dayString = formatDate(day);
  const params = {
    ...commonParams,
    start_date: dayString,
    end_date: dayString,
    daily: ["precipitation_sum", "temperature_2m_max", "temperature_2m_min"],
  };
  const url = "https://archive-api.open-meteo.com/v1/archive";
  const responses = await fetchWeatherApi(url, params);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const daily = response.daily()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    daily: {
      time: [
        ...Array(
          (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval()
        ),
      ].map(
        (_, i) =>
          new Date(
            (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
              1000
          )
      ),
      precipitationSum: daily.variables(0)?.valuesArray(),
      temperature2mMax: daily.variables(1)?.valuesArray(),
      temperature2mMin: daily.variables(2)?.valuesArray(),
    },
  };

  // const days: HistoricalWeatherDay[] = [];
  // for (let i = 0; i < weatherData.daily.time.length; i++) {
  //   days.push({
  //     dayDate: new Date(weatherData.daily.time[i]),
  //     tempHigh: Math.round(weatherData.daily.temperature2mMax[i]),
  //     tempLow: Math.round(weatherData.daily.temperature2mMin[i]),
  //     precipitationSum: Math.round(weatherData.daily.precipitationSum[i]),
  //   });
  // }
  // return days;
  return {
    dayDate: new Date(weatherData.daily.time[0]),
    tempHigh: Math.round(weatherData.daily.temperature2mMax[0]),
    tempLow: Math.round(weatherData.daily.temperature2mMin[0]),
    precipitationSum: Math.round(weatherData.daily.precipitationSum[0]),
  };
}

export async function getHistoricalWeather(
  day: Date
): Promise<HistoricalWeatherDay[]> {
  const dateCounter = new Date(day);
  // subtract a year
  dateCounter.setFullYear(dateCounter.getFullYear() - 1);
  return [await getPastWeather(dateCounter)];
}
