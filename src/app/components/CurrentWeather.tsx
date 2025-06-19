"use client";

import { Card, Tag } from "antd";
import { useEffect, useState } from "react";
import { GetForecast } from "../api/api";
import Image from "next/image";
import { useLocationStore } from "../store";

type WeatherData = {
  location: {
      name: string;
      localtime: string;
  };
  current: {
      temp_c: number;
      condition: {
          text: string;
          icon: string;
      };
      humidity: number;
      wind_kph: number;
      air_quality: {
          "us-epa-index": number;
      };
  };
}

export default function CurrentWeather() {

  const currentLocation = useLocationStore((state) => state.currentLocation)
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(currentLocation) fetchWeatherData();
  }, [currentLocation]);

  async function fetchWeatherData() {
    try {
      // setLoading(true)
      GetForecast(currentLocation as string).then((data) => {
        setCurrentWeather(data);
        setLoading(false);
      });
    } catch (error) {
      console.log("Error occured", error);
    }
  }
  if (loading) return <p>Loading data...</p>;

  let aqi;
  const airQualityIndex = currentWeather?.current?.air_quality["us-epa-index"];

  switch (airQualityIndex) {
    case 1:
      aqi = <Tag color="green">Good</Tag>;
      break;
    case 2:
      aqi = <Tag color="gold">Moderate</Tag>;
      break;
    case 3:
      aqi = <Tag color="yellow">Unhealthy for sensitive group</Tag>;
      break;
    case 4:
      aqi = <Tag color="orange">Unhealthy</Tag>;
      break;
    case 5:
      aqi = <Tag color="volcano">Very Unhealthy</Tag>;
      break;
    case 6:
      aqi = <Tag color="red">Hazardous</Tag>;
      break;
  }

  return (
    <Card
     
      variant="outlined"
      className="w-1/2"
      style={{ margin: 30 }}
    >
      {currentWeather && (
        <div className="grid grid-cols-2">
          <div>
            <div>
              <p className="text-2xl">{currentWeather.location?.name}</p>
              <p>{new Date(currentWeather.location?.localtime).toLocaleString('en-US', { weekday: "long" })}, {new Date(currentWeather.location?.localtime).toLocaleString('en-US', { month: 'short', day: '2-digit' })} | {new Date(currentWeather.location?.localtime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className="flex mt-8">
              <Image
                src={`https:${currentWeather.current.condition.icon}`}
                alt="img"
                width={70}
                height={70}
              />
              <div className="content-center ml-2">
                <p className="text-3xl">{currentWeather.current?.temp_c}<sup className="text-lg">°C</sup></p>
              </div>
            </div>
            <div className="mt-4 text-lg">
              <p>{currentWeather.current.condition?.text}</p>
            </div>
          </div>

          <div className="text-base/8">
            <div className="flex px-2">
              <span className="px-2 content-center">
                <Image
                  src="/icons/humidity-1.png"
                  alt="img"
                  width={20}
                  height={20}
                />
              </span>
              <span>{currentWeather.current?.humidity}% </span></div>
            <div className="flex px-2">
              <span className="px-2 content-center">
                <Image
                  src="/icons/windy.png"
                  alt="img"
                  width={20}
                  height={20}
                />
              </span>  {currentWeather.current?.wind_kph} km/h</div>
            <div className="flex px-2">
              <span className="px-2 content-center">
                <Image
                  src="/icons/air-quality-1.png"
                  alt="img"
                  width={20}
                  height={20}
                />
              </span>
               {aqi}</div> 
          </div>
        </div>
      )}
    </Card>
  );
}
