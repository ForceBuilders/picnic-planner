import { useQuery } from "@tanstack/react-query";
import Week from "../components/Week";
import { getCurrentWeather } from "../lib/weatherApi";
import { formatWeather } from "../lib/weatherFormat";

function PicnicView() {
  const fetchData = async () => {
    const response = await getCurrentWeather();
    return response;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["picnic"],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (data) {
    const formattedWeather = formatWeather(data);

    return (
      <>
        <h1>Picnic Planner</h1>
        <Week days={formattedWeather.slice(0, 7)} />
        <Week days={formattedWeather.slice(7, 14)} />
      </>
    );
  }

  return <div>No data found</div>;
}

export default PicnicView;
