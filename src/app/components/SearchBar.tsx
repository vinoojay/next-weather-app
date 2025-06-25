"use client";

import { Select } from "antd";
import { useState } from "react";
import { GetForecastByCoords, SearchLocation } from "../api/api";
import { useLocationStore } from "../store";
import { LocationData } from "../weatherTypes";

export default function SearchBar() {
  const [options, setOptions] = useState<LocationData[]>([]);
  const { setLocation } = useLocationStore((state) => state);

  const onChange = async (value: string) => {
    const selectedCity = options.find((opt) => String(opt.id) == value);
    if (selectedCity) {
      const lat = selectedCity?.lat;
      const lon = selectedCity?.lon;

      const locationParam = `${lat},${lon}`;
      const data = await GetForecastByCoords(locationParam);

      setLocation(data);
    }
  };

  const onSearch = (value: string) => {
    fetchCityData(value);
  };

  async function fetchCityData(searchTerm: string) {
    if (searchTerm) {
      const locations = await SearchLocation(searchTerm);
      setOptions(locations);
    }
  }

  const filter = options.map((city) => ({
    label: `${city.name}, ${city.region}, ${city.country}`,
    value: `${city.id}`,
  }));

  return (
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
  );
}
