import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import SearchBar from "./components/SearchBar";
import WeeklyWeather from "./components/WeeklyWeather";

export default function Home() {
  return (
    <div className="main h-screen bg-sky-50 flex justify-center">
      <div className="flex flex-col max-w-6xl bg-white rounded-2xl m-8 p-4 gap-4 w-full">
        <SearchBar />
        <div className="flex gap-4 h-full">
          <div className="flex flex-col gap-4 w-2/3 h-full">
            <CurrentWeather />
            <HourlyForecast />
          </div>
          <div className="w-1/3 h-full">
            <WeeklyWeather />
          </div>
        </div>
      </div>
    </div> 
  );
}