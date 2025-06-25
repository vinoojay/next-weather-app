'use client'

import { Card } from "antd";
import { useEffect, useState } from "react";
import { GetForecastByCoords } from "../api/api";
import AreaChartComponent from "./AreaChart";
import { CurrentLocationProps, HourlyData } from "../weatherTypes";

export default function HourlyForecast({currentLocation} : CurrentLocationProps){

    const[hourlyForecast, setHourlyForecast] = useState<HourlyData[]>([]);

    useEffect(() => {
        if(currentLocation) fetchForecastData()
    }, [currentLocation])

    async function fetchForecastData(){
        const lat = currentLocation.lat;
        const lon = currentLocation.lon;
        const locationParam = `${lat},${lon}`
        
        const data = await GetForecastByCoords(locationParam);
        const hourlyData = data.forecast.forecastday[0].hour;
        const filteredHourlyData= hourlyData.map(
            (h) => {return {hour: new Date(h.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), degree: h.temp_c}} )
        setHourlyForecast(filteredHourlyData);
    }

    return(

        <Card title="Hourly Forecast" variant="outlined" className="hourly-forecast w-full">
            <div> 
                <AreaChartComponent data={hourlyForecast}/>
            </div> 
        </Card>
    )
}