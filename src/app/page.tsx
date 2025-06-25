"use client";

import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";

import SearchBar from "./components/SearchBar";
import DailyForecast from "./components/DailyForecast";
import { useLocationStore } from "./store";
import { useEffect, useState } from "react";
import { GetForecastByCoords } from "./api/api";
import { Spin } from "antd";

export default function Home() {
  const { currentLocation, setLocation } = useLocationStore((state) => state);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsFetching(false);
    }, 3000);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getWeatherByLocation, getWeatherByIp);

    // If user allows location access, the app updates the weather data according to the user's current location
    async function getWeatherByLocation(position: {coords: { latitude: number; longitude: number }}) {
      const lat = position?.coords?.latitude;
      const lon = position?.coords?.longitude;

      const locationParam = lat && lon ? `${lat},${lon}` : "auto:ip";

      // current location weather forecast
      const data = await GetForecastByCoords(locationParam);

      setLocation({
        lat: data.location.lat,
        lon: data.location.lon,
      });
    }

    // If user does not allows location access, API will return data based on users IP 
    async function getWeatherByIp(){

      const locationParam = "auto:ip";
      const data = await GetForecastByCoords(locationParam);

      setLocation({
        lat: data.location.lat,
        lon: data.location.lon,
      });
    }

  }, []);

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="main h-screen bg-blue-50 flex justify-center">
      <div className="flex flex-col max-w-6xl bg-white rounded-2xl m-8 p-4 gap-4 w-full">
        <SearchBar />
        <div className="flex gap-4 h-full">
          <div className="flex flex-col gap-4 w-2/3 h-full">
            {currentLocation && <CurrentWeather currentLocation={currentLocation} />}
            {currentLocation && <HourlyForecast currentLocation={currentLocation} />}
          </div>
          <div className="w-1/3 h-full">
            {currentLocation && <DailyForecast currentLocation={currentLocation} />}
          </div>
        </div>
      </div>
    </div>
  );
}
