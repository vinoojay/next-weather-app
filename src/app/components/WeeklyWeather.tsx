'use client'

import { Card } from "antd";
import { useEffect, useState } from "react";
import { GetForecast } from "../api/api";

export default function WeeklyWeather(){
    const location = "colombo";
    const[weeklyForecast, setWeeklyForecast] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWeeklyData()
    }, [])

    async function fetchWeeklyData(){
        try {
            GetForecast(location).then((data) => {
                data = data.forecast.forecastday;
                setWeeklyForecast(data);
                setLoading(false);
            })
        } catch (error) {
            console.log("Error occurred", error)
        }
    }

    if(loading) return <p>Loading data...</p>;

    console.log("week data", weeklyForecast)

    return(
        <Card title="Weekly Weather" variant="outlined" className="w-1/2" style={{ margin: 30 }}>
            <div>
                {weeklyForecast.map(w => (
                    <li key={w.date_epoch}><img src={w.day.condition.icon}/> {new Date(w.date).toLocaleString('en-US', { weekday: "long" })}, {new Date(w.date).toLocaleString('en-US', { month: 'short', day: '2-digit' })} - {w.day.avgtemp_c}°C</li>
                ))}
            </div>
        </Card>
    )
}