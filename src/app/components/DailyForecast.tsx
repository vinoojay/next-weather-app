'use client'

import { Card } from "antd";
import { useEffect, useState } from "react";
import { GetForecastByCoords } from "../api/api";
import Image from "next/image";
import { CurrentLocationProps, DailyForecastData } from "../weatherTypes";

export default function DailyForecast({currentLocation} : CurrentLocationProps){

    const[dailyForecast, setDailyForecast] = useState<DailyForecastData[]>([]);

    useEffect(() => {
        if(currentLocation) fetchDailyForecastData()
    }, [currentLocation])

    async function fetchDailyForecastData(){
         
        const lat = currentLocation.lat;
        const lon = currentLocation.lon;
        const locationParam = `${lat},${lon}`

        const data = await GetForecastByCoords(locationParam);
        const dailyForecast = data.forecast.forecastday;

        setDailyForecast(dailyForecast);
    }

    return(
        <Card title="10 Day Forecast" variant="outlined" className="daily-weather w-full h-[720px] overflow-y-auto">
            <div className="">

                {dailyForecast.map(forecast => (
                        <div key={forecast.date_epoch} className="p-4 grid grid-cols-3 gap-4 border-b border-gray-300 items-center">
                            <div>
                                <Image
                                    src={`https:${forecast.day.condition.icon}`}
                                    alt="img"
                                    width={50}
                                    height={50}
                                />
                                <p>{forecast.day.condition.text}</p>
                            </div>
                            <p>{new Date(forecast.date).toLocaleString('en-US', { weekday: "long" })}, {new Date(forecast.date).toLocaleString('en-US', { month: 'short', day: '2-digit' })}</p>
                        
                        <div>{forecast.day.avgtemp_c}°C</div>
                    </div>
                ))}
            </div>
        </Card>
    )
}