'use client'

import { Select } from "antd";
import { useEffect, useState } from "react";
import { SearchLocation } from "../api/api";
import { useLocationStore } from "../store";
// import type { Location } from '../store'


type City = {
    name: string;
    id: number;
    region: string;
    country: string;
    lat: number;
    lon: number;
}

export default function SearchBar(){
    const[options, setOptions] = useState<{ label: string; value: string }[]>([])
    const[location, setLocation] = useState("")
    const setGlobalLocation = useLocationStore((state) => state.setLocation)

    useEffect(() => {
        setGlobalLocation("dubai")
    }, [setGlobalLocation])

    const onChange = (value: string) => {
        setLocation(value)
        const selectedCity = options.find((opt) => opt.id == value)
        if (selectedCity) setGlobalLocation(selectedCity.name)
            console.log("selected-city", selectedCity)
    };

    const onSearch = (value: string) => {
        console.log('onsearch search:', value);
        setLocation(value)
    };


    useEffect(() => {
        fetchCityData()
    }, [location])


    // location - 'kandy'
    async function fetchCityData(){
        if(location){
            SearchLocation(location).then((data) =>{
                setOptions(data)
                console.log("SearchLocation api", data)
            })
        }
    }

    const filter = options.map((city) => ({
        label: `${city.name}, ${city.region}, ${city.country}`,
        value: `${city.id}`
    }))

    return(
        <div className="m-8 w-full">
            <Select
                showSearch
                placeholder="Search Location"
                optionFilterProp="label"
                onChange={onChange}
                onSearch={onSearch}
                options={filter}
                style={{ width: 300 }}
            />
        </div>
    )
}