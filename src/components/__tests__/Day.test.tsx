import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect } from "vitest";
import Day from "../Day";
import { DayInfo, DayCondition } from "../../types/day";

describe("Day", () => {
  const queryClient = new QueryClient();

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
    render(
      <QueryClientProvider client={queryClient}>
        <Day {...dayInfo} />
      </QueryClientProvider>
    );
    expect(screen.getByText("Tuesday")).toBeDefined();
  });
});
