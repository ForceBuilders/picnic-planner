import { expect, test } from "vitest";
import { DayCondition } from "../../types/day";
import { determineWeatherCondition } from "../weatherFormat";

test.each([
  [69, 9, DayCondition.Ideal],
  [67, 9, DayCondition.Fair],
])("determineWeatherCondition(%i, %i) -> %i", (temp, rain, expected) => {
  expect(determineWeatherCondition(temp, rain)).toBe(expected);
});
