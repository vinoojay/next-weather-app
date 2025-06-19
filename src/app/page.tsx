import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import SearchBar from "./components/SearchBar";
import WeeklyWeather from "./components/WeeklyWeather";

export default function Home() {
  return (
    <>
    <SearchBar/>
    <CurrentWeather />
    <HourlyForecast />
    <WeeklyWeather />
    </>
  );
}
