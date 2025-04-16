import "./App.css";
// import Week from "../components/Week";
// import { Day, DayCondition } from "../types/day";
import PicnicView from "../components/PicnicView";

function App() {
  // const weekData: Day[] = [
  //   {
  //     dayDate: new Date("2025-04-16"),
  //     highTemp: 30.1,
  //     rainChance: 50,
  //     niceness: DayCondition.Poor,
  //   },
  //   {
  //     dayDate: new Date("2025-04-17"),
  //     highTemp: 30.1,
  //     rainChance: 50,
  //     niceness: DayCondition.Ideal,
  //   },
  //   {
  //     dayDate: new Date("2025-04-18"),
  //     highTemp: 30.1,
  //     rainChance: 50,
  //     niceness: DayCondition.Fair,
  //   },
  //   {
  //     dayDate: new Date("2025-04-19"),
  //     highTemp: 30.1,
  //     rainChance: 50,
  //     niceness: DayCondition.Fair,
  //   },
  //   {
  //     dayDate: new Date("2025-04-20"),
  //     highTemp: 30.1,
  //     rainChance: 50,
  //     niceness: DayCondition.Fair,
  //   },
  //   {
  //     dayDate: new Date("2025-04-21"),
  //     highTemp: 30.1,
  //     rainChance: 50,
  //     niceness: DayCondition.Poor,
  //   },
  //   {
  //     dayDate: new Date("2025-04-22"),
  //     highTemp: 30.1,
  //     rainChance: 50,
  //     niceness: DayCondition.Ideal,
  //   },
  // ];

  // return (
  //   <>
  //     <h1>Picnic Planner</h1>
  //     <Week days={weekData} />
  //     <Week days={weekData} />
  //   </>
  // );
  return <PicnicView />;
}

export default App;
