import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DayDetail from "../DayDetail";
import * as weatherApi from "../../lib/weatherApi";
import { DayInfo, DayCondition } from "../../types/day";

const mockDayInfo: DayInfo = {
  dayDate: new Date("2023-01-01"),
  tempHigh: 75,
  tempLow: 55,
  precipitationChance: 30,
  precipitationSum: 0.2,
  windSpeedMax: 10,
  windDirection: 180,
  humidityMean: 60,
  windSpeedGusts: 0,
  niceness: DayCondition.Ideal,
};

const mockWeatherData = [
  {
    dayDate: new Date("2022-12-31"),
    tempHigh: 70,
    tempLow: 60,
    precipitationSum: 0,
  },
  {
    dayDate: new Date("2021-12-31"),
    tempHigh: 68,
    tempLow: 62,
    precipitationSum: 2,
  },
];

describe("DayDetail", () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders historical weather data", async () => {
    const mock = vi.spyOn(weatherApi, "getHistoricalWeather");
    mock.mockImplementation(() => Promise.resolve(mockWeatherData));

    render(
      <QueryClientProvider client={queryClient}>
        <DayDetail
          dayName="Monday"
          dayValue="January 1"
          dayInfo={mockDayInfo}
          isOpen={true}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClose={() => {}}
        />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Year")).toBeDefined();
    });
  });
});
