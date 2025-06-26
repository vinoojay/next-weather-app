"use client";

import { Card } from "antd";
import Image from "next/image";
import { WeatherApiResponse } from "../weatherTypes";

export default function DailyForecast({
  forecast,
}: Pick<WeatherApiResponse, "forecast">) {
  const forecastDay = forecast.forecastday;

  return (
    <Card
      title={`${forecastDay.length} Day Forecast`}
      variant="outlined"
      className="daily-weather w-full h-[720px] overflow-y-auto"
    >
      <div className="">
        {forecastDay.map((forecast) => (
          <div
            key={forecast.date_epoch}
            className="p-4 grid grid-cols-3 gap-4 border-b border-gray-300 items-center"
          >
            <div>
              <Image
                src={`https:${forecast.day.condition.icon}`}
                alt="img"
                width={50}
                height={50}
              />
              <p>{forecast.day.condition.text}</p>
            </div>
            <p>
              {new Date(forecast.date).toLocaleString("en-US", { weekday: "long",})}
              ,{" "}
              {new Date(forecast.date).toLocaleString("en-US", { month: "short", day: "2-digit",})}
            </p>

            <div>{forecast.day.avgtemp_c}°C</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
