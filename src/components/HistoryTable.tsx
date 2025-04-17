import { HistoricalWeatherDay } from "../types/day";

interface HistoryTableProps {
  history: HistoricalWeatherDay[] | undefined;
}

function HistoryTable(props: HistoryTableProps) {
  if (props.history) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {/* Header row */}
        <div style={{ display: "flex", fontWeight: "bold" }}>
          <div style={{ flex: 1, padding: "0.5rem" }}>Year</div>
          <div style={{ flex: 1, padding: "0.5rem" }}>High</div>
          <div style={{ flex: 1, padding: "0.5rem" }}>Low</div>
          <div style={{ flex: 1, padding: "0.5rem" }}>Precip</div>
        </div>

        {/* Data rows */}
        {props.history.map((historyDay, rowIndex) => (
          <div
            key={historyDay.dayDate.toString()}
            style={{
              display: "flex",
              backgroundColor: rowIndex % 2 === 0 ? "#f9f9f9" : "#eaeaea",
            }}
          >
            <div style={{ flex: 1, padding: "0.5rem" }}>
              {historyDay.dayDate.getFullYear()}
            </div>
            <div style={{ flex: 1, padding: "0.5rem" }}>
              {historyDay.tempHigh}
            </div>
            <div style={{ flex: 1, padding: "0.5rem" }}>
              {historyDay.tempLow}
            </div>
            <div style={{ flex: 1, padding: "0.5rem" }}>
              {historyDay.precipitationSum}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return <div />;
}

export default HistoryTable;
