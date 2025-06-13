'use client'

import { Card } from "antd";
import { useEffect, useState } from "react";
import { GetForecast } from "../api/api";

export default function HourlyForecast(){
    const location = "colombo";
    const[hourlyForecast, setHourlyForecast] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        fetchForecastData()
    }, [])

    async function fetchForecastData(){
        try {
            GetForecast(location).then((data) => {
                data = data.forecast.forecastday[0].hour;
                // data.map(t => {
                //     let dt = new Date(t.time)
                //     let weekday = dt.toLocaleString("en-US", { weekday: "long" });
                //     console.log(weekday)
                // })
                setHourlyForecast(data) 
                setLoading(false)
                console.log("forecast", data);
                console.log("forecast h", hourlyForecast);
            })          
        } catch (error) {
            console.log("Error occurred", error)
        }
    }

    if(loading) return <p>Loading data...</p>;

    // console.log("forecast h", hourlyForecast);

    return(
            <Card title="Hourly Forecast" variant="outlined" className="w-1/2" style={{ margin: 30 }}>
                {hourlyForecast.map(h => (
                    <li key={h.time}>{new Date(h.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} = {h.temp_c}°C</li>
                ))}
            </Card>
        )
}