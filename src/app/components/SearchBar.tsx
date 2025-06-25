"use client";

import { Select } from "antd";
import { useState } from "react";
import { SearchLocation } from "../api/api";
import { useLocationStore } from "../store";
import { City } from "../weatherTypes";

export default function SearchBar() {
  const [options, setOptions] = useState<City[]>([]);
  const setLocation  = useLocationStore((state) => state.setLocation);

  const onChange = (value: string) => {
    const selectedCity = options.find((opt) => String(opt.id) == value);
    if (selectedCity) setLocation(selectedCity);
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
