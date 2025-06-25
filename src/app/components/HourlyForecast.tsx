"use client";

import { Card } from "antd";
import AreaChartComponent from "./AreaChart";
import { WeatherApiResponse } from "../weatherTypes";

export default function HourlyForecast({
  forecast,
}: Pick<WeatherApiResponse, "forecast">) {
  const hourlyForeCastToday = forecast.forecastday[0].hour;
  const filteredHourlyData = hourlyForeCastToday.map((h) => {
    return {
      hour: new Date(h.time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", }),
      degree: h.temp_c,
    };
  });

  return (
    <Card
      title="Hourly Forecast"
      variant="outlined"
      className="hourly-forecast w-full"
    >
      <div>
        <AreaChartComponent data={filteredHourlyData} />
      </div>
    </Card>
  );
}
