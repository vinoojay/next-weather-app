'use client'

import { Card, Spin } from "antd";
import { useEffect, useState } from "react";
import { GetForecast } from "../api/api";
import { useLocationStore, City } from "../store";
import Image from "next/image";
import { WeeklyForecast } from "../weatherTypes";

export default function WeeklyWeather(){

    const currentLocation = useLocationStore((state) => state.currentLocation) as City
    const[weeklyForecast, setWeeklyForecast] = useState<WeeklyForecast[]>([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        if(currentLocation) fetchWeeklyData()
    }, [currentLocation])

    async function fetchWeeklyData(){
        try {
            GetForecast(currentLocation.id).then((data) => {
                data = data.forecast.forecastday;
                setWeeklyForecast(data);
                setLoading(false);
            })
        } catch (error) {
            console.log("Error occurred", error)
        }
    }

    if (loading) return <div className="flex justify-center items-center h-64"><Spin size="large" /></div>;

    return(
        <Card title="10 Day Forecast" variant="outlined" className="weekle-weather w-full h-[695px] overflow-y-auto">
            <div className="">

                {weeklyForecast.map(week => (
                        <div key={week.date_epoch} className="p-4 grid grid-cols-3 gap-4 border-b border-gray-300 items-center">
                            <div>
                                <Image
                                    src={`https:${week.day.condition.icon}`}
                                    alt="img"
                                    width={50}
                                    height={50}
                                />
                                <p>{week.day.condition.text}</p>
                            </div>
                            <p>{new Date(week.date).toLocaleString('en-US', { weekday: "long" })}, {new Date(week.date).toLocaleString('en-US', { month: 'short', day: '2-digit' })}</p>
                        
                        <div>{week.day.avgtemp_c}°C</div>
                    </div>
                ))}
            </div>
        </Card>
    )
}