import { expect, test } from "vitest";
import { DayCondition } from "../../types/day";
import { exportedForTesting } from "../weatherFormat";
const { determineWeatherCondition } = exportedForTesting;

test.each([
  [83, 0, DayCondition.Fair],
  [82, 0, DayCondition.Ideal],
  [69, 0, DayCondition.Ideal],
  [68, 0, DayCondition.Ideal],
  [67, 0, DayCondition.Fair],
  [83, 10, DayCondition.Fair],
  [82, 10, DayCondition.Ideal],
  [69, 10, DayCondition.Ideal],
  [68, 10, DayCondition.Ideal],
  [67, 10, DayCondition.Fair],
  [83, 11, DayCondition.Fair],
  [82, 11, DayCondition.Fair],
  [69, 11, DayCondition.Fair],
  [68, 11, DayCondition.Fair],
  [67, 11, DayCondition.Fair],
])("determineWeatherCondition(%i, %i) -> %i", (temp, rain, expected) => {
  expect(determineWeatherCondition(temp, rain)).toBe(expected);
});
