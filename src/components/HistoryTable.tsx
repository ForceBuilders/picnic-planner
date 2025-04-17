import { HistoricalWeatherDay } from "../types/day";

interface HistoryTableProps {
  history: HistoricalWeatherDay[] | undefined;
}

function HistoryTable(props: HistoryTableProps) {
  if (props.history) {
    const maxHeight = "400px";
    return (
      <div
        style={{
          overflowY: "auto",
          overflowX: "auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
          maxHeight,
        }}
      >
        <div style={{ minWidth: "400px" }}>
          {/* Header row */}
          <div
            style={{
              display: "flex",
              fontWeight: "bold",
              backgroundColor: "#f2f2f2",
            }}
          >
            <div
              style={{
                flex: 1,
                padding: "0.75rem",
                borderBottom: "1px solid #ccc",
              }}
            >
              Year
            </div>
            <div
              style={{
                flex: 1,
                padding: "0.75rem",
                borderBottom: "1px solid #ccc",
              }}
            >
              High
            </div>
            <div
              style={{
                flex: 1,
                padding: "0.75rem",
                borderBottom: "1px solid #ccc",
              }}
            >
              Low
            </div>
            <div
              style={{
                flex: 1,
                padding: "0.75rem",
                borderBottom: "1px solid #ccc",
              }}
            >
              Precip
            </div>
          </div>

          {/* Data rows */}
          {props.history.map((historyDay, rowIndex) => (
            <div
              key={historyDay.dayDate.toString()}
              style={{
                display: "flex",
                backgroundColor: rowIndex % 2 === 0 ? "#fff" : "#f9f9f9",
                borderBottom: "1px solid #eee",
              }}
            >
              <div style={{ flex: 1, padding: "0.75rem" }}>
                {historyDay.dayDate.getFullYear()}
              </div>
              <div style={{ flex: 1, padding: "0.75rem" }}>
                {historyDay.tempHigh}°
              </div>
              <div style={{ flex: 1, padding: "0.75rem" }}>
                {historyDay.tempLow}°
              </div>
              <div style={{ flex: 1, padding: "0.75rem" }}>
                {historyDay.precipitationSum} in
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <div />;
}

export default HistoryTable;
