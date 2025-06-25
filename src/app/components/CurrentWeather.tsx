"use client";

import { Card, Tag } from "antd";
import Image from "next/image";
import { WeatherApiResponse } from "../weatherTypes";

export default function CurrentWeatherComponent(
  { weatherData }: { weatherData: WeatherApiResponse }
) {
  const airQualityIndex = weatherData?.current.air_quality["us-epa-index"];
  const aqi = setAqiTag(airQualityIndex);

  return (
    <Card variant="outlined" className="current-weather w-full">
      {weatherData && (
        <div className="grid grid-cols-2">
          <div>
            <div>
              <p className="text-2xl">{weatherData.location?.name}</p>
              <p>
                {new Date(weatherData.location?.localtime).toLocaleString("en-US",{ weekday: "long" })}
                ,{" "}
                {new Date(weatherData.location?.localtime).toLocaleString("en-US",{ month: "short", day: "2-digit" })}
                {" "}
                |{" "}
                {new Date(weatherData.location?.localtime).toLocaleTimeString("en-US",{ hour: "2-digit", minute: "2-digit",})}
              </p>
            </div>
            <div className="flex mt-8">
              <Image
                src={`https:${weatherData.current.condition.icon}`}
                alt="img"
                width={70}
                height={70}
              />
              <div className="content-center ml-2">
                <p className="text-3xl">
                  {weatherData.current?.temp_c}
                  <sup className="text-lg">°C</sup>
                </p>
              </div>
            </div>
            <p className="text-gray-600">
              feels like {weatherData.current.feelslike_c}°C
            </p>
            <div className="mt-4 text-lg">
              <p>{weatherData.current.condition?.text}</p>
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
              <span>{weatherData.current?.humidity}% </span>
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
              {weatherData.current?.wind_kph} km/h
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
              {weatherData.current.uv}
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
                <p>{weatherData.forecast?.forecastday[0].astro.sunrise}</p>
              </div>

              <div className="flex flex-col items-center flex-1">
                <span className="mb-1">Sunset Today</span>
                <Image
                  src="/icons/sunset.png"
                  alt="Sunset"
                  width={40}
                  height={40}
                />
                <p>{weatherData.forecast?.forecastday[0].astro.sunset}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

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
