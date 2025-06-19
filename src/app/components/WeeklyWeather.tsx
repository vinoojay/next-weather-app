'use client'

import { Card } from "antd";
import { useEffect, useState } from "react";
import { GetForecast } from "../api/api";
import { useLocationStore, City } from "../store";

export default function WeeklyWeather(){

    const currentLocation = useLocationStore((state) => state.currentLocation) as City
    const[weeklyForecast, setWeeklyForecast] = useState([]);
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

    if(loading) return <p>Loading data...</p>;

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