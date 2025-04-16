import { useState, useEffect } from "react";
import Week from "../components/Week";
import { Day } from "../types/day";
import { getWeather } from "../lib/weatherApi";
import { formatWeather } from "../lib/weatherFormat";

function PicnicView() {
  const [data, setData] = useState<Day[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWeather();
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const result: DataType[] = await response.json();
        setData(formatWeather(response));
      } catch (e: unknown) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(data);
  return (
    <>
      <h1>Picnic Planner</h1>
      <Week days={data.slice(0, 7)} />
      <Week days={data.slice(7, 14)} />
    </>
  );
}

export default PicnicView;
