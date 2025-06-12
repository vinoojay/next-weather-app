import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import WeeklyWeather from "./components/WeeklyWeather";

export default function Home() {
  return (
    <>
      <CurrentWeather/>
      <HourlyForecast/>
      <WeeklyWeather/>
    </>
  );
}
