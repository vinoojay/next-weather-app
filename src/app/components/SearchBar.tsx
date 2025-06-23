'use client'

import { Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { SearchLocation } from "../api/api";
import { useLocationStore, City, defaultLocation } from "../store";

export default function SearchBar(){
    const[options, setOptions] = useState<City[]>([])
    const[location, setLocation] = useState("")
    const setGlobalLocation = useLocationStore((state) => state.setLocation)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setGlobalLocation(defaultLocation)
        setLoading(false)
    }, [setGlobalLocation])

    const onChange = (value: string) => {
        setLocation(value)
        const selectedCity = options.find((opt) => String(opt.id) == value)
        if (selectedCity) setGlobalLocation(selectedCity)
            console.log("selected-city", selectedCity)
    };

    const onSearch = (value: string) => {
        console.log('onsearch search:', value);
        setLocation(value)
    };


    useEffect(() => {
        fetchCityData()
    }, [location])

    async function fetchCityData(){
        if(location){
            SearchLocation(location).then((data) =>{
                setOptions(data)
                setLoading(false);
            })
        }
    }
    
    if (loading) return <div className="flex justify-center items-center h-64"><Spin size="large" /></div>;

    const filter = options.map((city) => ({
        label: `${city.name}, ${city.region}, ${city.country}`,
        value: `${city.id}`
    }))

    return(
        <div className="search py-4 pt-4 w-full">
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