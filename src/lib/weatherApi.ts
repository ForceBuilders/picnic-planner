import { fetchWeatherApi } from "openmeteo";
import { WeatherDay } from "../types/day";

export async function getCurrentWeather(): Promise<WeatherDay[]> {
  const params = {
    latitude: 40.622231,
    longitude: -80.05928,
    // daily: ["temperature_2m_max", "precipitation_probability_max"],
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
    timezone: "America/New_York",
    forecast_days: 14,
    wind_speed_unit: "mph",
    temperature_unit: "fahrenheit",
    precipitation_unit: "inch",
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
