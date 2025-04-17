import { screen } from "@testing-library/react";
import Day from "../Day";
import { DayInfo, DayCondition } from "../../types/day";
import { renderWithClient } from "./utils";
import { describe, it, expect } from "vitest";

describe("Day", () => {
  it("should render properly", () => {
    const dayInfo: DayInfo = {
      dayDate: new Date("2025-04-15T00:00:00-04:00"),
      tempHigh: 72,
      precipitationChance: 0,
      niceness: DayCondition.Ideal,
      tempLow: 50,
      precipitationSum: 0,
      windSpeedMax: 5,
      windSpeedGusts: 10,
      windDirection: 45,
      humidityMean: 45,
    };
    renderWithClient(<Day {...dayInfo} />);
    expect(screen.getByText("Tuesday")).toBeDefined();
  });
});
