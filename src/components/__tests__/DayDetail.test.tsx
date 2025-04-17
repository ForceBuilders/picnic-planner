// import { screen } from "@testing-library/react";
// import DayDetail from "../DayDetail";
// import { DayInfo, DayCondition } from "../../types/day";
// import { renderWithClient } from "./utils";
// import { describe, it, expect } from "vitest";

// describe("DayDetail", () => {
//   it("should render properly", () => {
//     const dayInfo: DayInfo = {
//       dayDate: new Date("2025-04-21T00:00:00-04:00"),
//       tempHigh: 72,
//       precipitationChance: 0,
//       niceness: DayCondition.Ideal,
//       tempLow: 50,
//       precipitationSum: 0,
//       windSpeedMax: 5,
//       windSpeedGusts: 10,
//       windDirection: 45,
//       humidityMean: 45,
//     };
//     const props = {
//       dayName: "Monday",
//       dayValue: "Apr 21",
//       dayInfo: dayInfo,
//       isOpen: true,
//       onClose: () => {
//         console.log("");
//       },
//     };
//     renderWithClient(<DayDetail {...props} />);
//     expect(screen.getByText("Monday")).toBeDefined();
//   });
// });

import { describe, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DayDetail from "../DayDetail";
import * as weatherApi from "../../lib/weatherApi";
// import { getHistoricalWeather } from "../../lib/weatherApi";
import { DayInfo } from "../../types/day";

const mockDayInfo: DayInfo = {
  dayDate: new Date("2023-01-01"),
  tempHigh: 75,
  tempLow: 55,
  precipitationChance: 30,
  precipitationSum: 0.2,
  windSpeedMax: 10,
  windDirection: 180,
  humidityMean: 60,
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

  //   vi.mock("../lib/weatherApi");
  vi.mock("../lib/weatherApi", () => ({
    getHistoricalWeather: vi.fn(() => mockWeatherData),
  }));

  //   beforeEach(() => {
  //     vi.clearAllMocks();
  //   });

  it("renders historical weather data", async () => {
    // vi.mock("../lib/weatherApi");
    // const obj = vi.mocked(getHistoricalWeather);
    // console.log("Hi!");
    // console.log(obj);
    // console.log("Bye");
    // obj.mockResolvedValue(mockWeatherData);
    // // vi.mocked(weatherApi.getHistoricalWeather).mockResolvedValue(
    // //   mockWeatherData
    // // );

    const mock = vi.spyOn(weatherApi, "getHistoricalWeather");
    mock.mockImplementation(() => Promise.resolve(mockWeatherData));
    console.log(await weatherApi.getHistoricalWeather());

    render(
      <QueryClientProvider client={queryClient}>
        <DayDetail
          dayName="Monday"
          dayValue="January 1"
          dayInfo={mockDayInfo}
          isOpen={true}
          onClose={() => {}}
        />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Year")).toBeDefined();
    });
  });

  //   it("renders error state when fetch fails", async () => {
  //     (weatherApi.getHistoricalWeather as any).mockRejectedValue(
  //       new Error("Network Error")
  //     );

  //     render(
  //       <QueryClientProvider client={queryClient}>
  //         <DayDetail
  //           dayName="Monday"
  //           dayValue="January 1"
  //           dayInfo={mockDayInfo}
  //           isOpen={true}
  //           onClose={() => {}}
  //         />
  //       </QueryClientProvider>
  //     );

  //     await waitFor(() => {
  //       expect(screen.getByText("Error: Network Error")).toBeInTheDocument();
  //     });
  //   });
});
