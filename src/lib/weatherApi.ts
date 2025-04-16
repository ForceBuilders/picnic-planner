import { fetchWeatherApi } from "openmeteo";

export interface WeatherDay {
  dayDate: Date;
  highTemp: number;
  rainChance: number;
}

export async function getWeather(): Promise<WeatherDay[]> {
  const params = {
    latitude: 52.52,
    longitude: 13.41,
    // "daily": ["temperature_2m_max", "temperature_2m_min", "apparent_temperature_max", "apparent_temperature_min", "precipitation_sum", "precipitation_hours", "precipitation_probability_max"],
    daily: ["temperature_2m_max", "precipitation_probability_max"],
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
      precipitationProbabilityMax: daily.variables(1)?.valuesArray(),
    },
  };

  console.log(weatherData.daily.time);

  const days: WeatherDay[] = [];
  for (let i = 0; i < weatherData.daily.time.length; i++) {
    days.push({
      dayDate: new Date(weatherData.daily.time[i]),
      highTemp: Math.round(weatherData.daily.temperature2mMax[i]),
      rainChance: Math.round(weatherData.daily.precipitationProbabilityMax[i]),
    });
  }
  return days;
}
