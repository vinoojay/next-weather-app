'use client'

import { Card } from "antd";
import { useEffect, useState } from "react";
import { GetForecast } from "../api/api";
import Image from "next/image";
import { useLocationStore } from "../store";

export default function HourlyForecast(){
    // const location = "colombo";
    const currentLocation = useLocationStore((state) => state.currentLocation)
    const[hourlyForecast, setHourlyForecast] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        if(currentLocation) fetchForecastData()
    }, [currentLocation])

    async function fetchForecastData(){
        try {
            GetForecast(currentLocation as string).then((data) => {
                data = data.forecast.forecastday[0].hour;
                setHourlyForecast(data) 
                setLoading(false)
            })          
        } catch (error) {
            console.log("Error occurred", error);
            setLoading(false);
        }
    }

    if(loading) return <p>Loading data...</p>;

    // console.log("forecast h", hourlyForecast);

    return(
        <Card title="Hourly Forecast" variant="outlined" className="w-1/2" style={{ margin: 30 }}>
            <div className="flex overflow-x-auto">
                {hourlyForecast.map(h => (
                        <div key={h.time} className="p-4 text-xs"><p>{new Date(h.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                        <div>
                            <Image
                                src={`https:${h.condition.icon}`}
                                alt="img"
                                width={30}
                                height={30}
                            />
                        </div>
                        <div>{h.temp_c}°C</div>
                    </div>
                ))}
            </div>
                {/* {hourlyForecast.map(h => (
                    <li key={h.time}>{new Date(h.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} = {h.temp_c}°C</li>
                ))} */}
        </Card>
    )
}