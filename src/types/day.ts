export enum DayCondition {
  Ideal,
  Fair,
  Poor,
}

export interface DayInfo {
  dayDate: Date;
  tempHigh: number;
  tempLow: number;
  precipitationChance: number;
  precipitationSum: number;
  windSpeedMax: number;
  windSpeedGusts: number;
  windDirection: number;
  humidityMean: number;
  niceness: DayCondition;
}

export interface WeatherDay {
  dayDate: Date;
  tempHigh: number;
  tempLow: number;
  precipitationChance: number;
  precipitationSum: number;
  windSpeedMax: number;
  windSpeedGusts: number;
  windDirection: number;
  humidityMean: number;
}

export interface HistoricalWeatherDay {
  dayDate: Date;
  tempHigh: number;
  tempLow: number;
  precipitationSum: number;
}
