"use client";

import { Card } from "antd";
import { useEffect, useState } from "react";
import { GetForecast } from "../api/api";

export default function CurrentWeather() {
  const location = "colombo";
  const [currentWeather, setCurrentWeather] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  async function fetchWeatherData() {
    try {
        GetForecast(location).then((data) => {
        setCurrentWeather(data);
        setLoading(false);
        console.log("current weather", data);
      });
    } catch (error) {
      console.log("Error occured", error);
    }
  }
  if (loading) return <p>Loading data...</p>;

  return (
    <Card
      title="Good Morning, Colombo"
      variant="outlined"
      className="w-1/2"
      style={{ margin: 30 }}
    >
      {/* <Input placeholder="Weather in..." /> */}
      {currentWeather && (
        <>
          <p>location: {currentWeather.location.name}</p>
          <p>Date time: {currentWeather.location.localtime}</p>
          <p>Current humidity: {currentWeather.current.humidity}</p>
          <p>Current temp: {currentWeather.current.temp_c}</p>
          <p>Current wind speed: {currentWeather.current.wind_kph}</p>
          <p>Current UV index: {currentWeather.current.uv}</p>
          <p>Current wind direction: {currentWeather.current.wind_dir}</p>
          <p>Condition: {currentWeather.current.condition.text}</p>
          <p>Air quality: {currentWeather.current.air_quality["us-epa-index"]}</p>
        </>
      )}
    </Card>
  );
}
