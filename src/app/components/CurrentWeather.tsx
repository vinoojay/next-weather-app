"use client";

import { Card, Tag } from "antd";
import { useEffect, useState } from "react";
import { GetForecastByCoords } from "../api/api";
import Image from "next/image";
import { CurrentWeatherData, CurrentLocationProps } from "../weatherTypes";

// Air Quality Index
function setAqiTag(index: number | undefined) {
  switch (index) {
    case 1:
      return <Tag color="green">Good</Tag>;
    case 2:
      return <Tag color="gold">Moderate</Tag>;
    case 3:
      return <Tag color="yellow">Unhealthy for sensitive group</Tag>;
    case 4:
      return <Tag color="orange">Unhealthy</Tag>;
    case 5:
      return <Tag color="volcano">Very Unhealthy</Tag>;
    case 6:
      return <Tag color="red">Hazardous</Tag>;
    default:
      return <Tag color="default">Unknown</Tag>;
  }
}

export default function CurrentWeather({currentLocation} : CurrentLocationProps) {

  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData>();

  useEffect(() => {
    if (currentLocation) fetchWeatherData();
  }, [currentLocation]);


  async function fetchWeatherData() {

    const lat = currentLocation.lat;
    const lon = currentLocation.lon;
    const locationParam = `${lat},${lon}`

    const data = await GetForecastByCoords(locationParam);
    setCurrentWeather(data);
  }

  const airQualityIndex = currentWeather?.current?.air_quality["us-epa-index"];
  const aqi = setAqiTag(airQualityIndex);

  return (
    <Card variant="outlined" className="current-weather w-full">
      {currentWeather && (
        <div className="grid grid-cols-2">
          <div>
            <div>
              <p className="text-2xl">{currentWeather.location?.name}</p>
              <p>
                {new Date(currentWeather.location?.localtime).toLocaleString("en-US",{ weekday: "long" })}
                ,{" "}
                {new Date(currentWeather.location?.localtime).toLocaleString("en-US",{ month: "short", day: "2-digit" })}
                {" "} |{" "}
                {new Date(currentWeather.location?.localtime).toLocaleTimeString("en-US", {hour: "2-digit",minute: "2-digit",})}
              </p>
            </div>
            <div className="flex mt-8">
              <Image
                src={`https:${currentWeather.current.condition.icon}`}
                alt="img"
                width={70}
                height={70}
              />
              <div className="content-center ml-2">
                <p className="text-3xl">
                  {currentWeather.current?.temp_c}
                  <sup className="text-lg">°C</sup>
                </p>
              </div>
            </div>
            <p className="text-gray-600">
              feels like {currentWeather.current.feelslike_c}°C
            </p>
            <div className="mt-4 text-lg">
              <p>{currentWeather.current.condition?.text}</p>
            </div>
          </div>

          <div className="text-base/8">
            <div className="humidity flex px-2">
              <span className="px-2 content-center">
                <Image
                  src="/icons/humidity.png"
                  alt="img"
                  width={20}
                  height={20}
                />
              </span>
              <span>{currentWeather.current?.humidity}% </span>
            </div>
            <div className="wind-speed flex px-2">
              <span className="px-2 content-center">
                <Image
                  src="/icons/windy.png"
                  alt="img"
                  width={20}
                  height={20}
                />
              </span>{" "}
              {currentWeather.current?.wind_kph} km/h
            </div>
            <div className="air-quality flex p-2">
              <span className="px-2 content-center">
                <Image
                  src="/icons/air-quality.png"
                  alt="img"
                  width={20}
                  height={20}
                />
              </span>
              {aqi}
            </div>
            <div className="uv-index flex px-2">
              <span className="px-2 content-center">
                <Image
                  src="/icons/uv-index.png"
                  alt="img"
                  width={20}
                  height={20}
                />
              </span>
              {currentWeather.current.uv}
            </div>
            <div className="flex text-sm pt-8 px-2 gap-4">
              <div className="flex flex-col items-center flex-1">
                <span className="mb-1">Sunrise Today</span>
                <Image
                  src="/icons/sunrise.png"
                  alt="Sunrise"
                  width={40}
                  height={40}
                />
                <p>{currentWeather.forecast?.forecastday[0].astro.sunrise}</p>
              </div>

              <div className="flex flex-col items-center flex-1">
                <span className="mb-1">Sunset Today</span>
                <Image
                  src="/icons/sunset.png"
                  alt="Sunset"
                  width={40}
                  height={40}
                />
                <p>{currentWeather.forecast?.forecastday[0].astro.sunset}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
