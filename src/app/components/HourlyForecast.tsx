'use client'

import { Card, Spin } from "antd";
import { useEffect, useState } from "react";
import { GetForecast } from "../api/api";
import { useLocationStore, City } from "../store";
import AreaChartComponent from "./AreaChart";
import { HourlyData } from "../weatherTypes";

export default function HourlyForecast(){

    const currentLocation = useLocationStore((state) => state.currentLocation) as City
    const[hourlyForecast, setHourlyForecast] = useState<HourlyData[]>([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        if(currentLocation) fetchForecastData()
    }, [currentLocation])

    async function fetchForecastData(){
        try {
            GetForecast(currentLocation.id).then((data) => {
                const hourlyData = data.forecast.forecastday[0].hour;
                const filteredHourlyData= hourlyData.map
                    ((h) => {return {hour: new Date(h.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), degree: h.temp_c}} )
                setHourlyForecast(filteredHourlyData) 
                setLoading(false)
            })          
        } catch (error) {
            console.log("Error occurred", error);
            setLoading(false);
        }
    }

    if (loading) return <div className="flex justify-center items-center h-64"><Spin size="large" /></div>;

    return(

        <Card title="Hourly Forecast" variant="outlined" className="hourly-forecast w-full">
            <div> 
                <AreaChartComponent data={hourlyForecast}/>
            </div> 
        </Card>
    )
}