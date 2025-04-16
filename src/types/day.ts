export enum DayCondition {
  Ideal,
  Fair,
  Poor,
}

export interface Day {
  dayDate: Date;
  highTemp: number;
  rainChance: number;
  niceness: DayCondition;
}
