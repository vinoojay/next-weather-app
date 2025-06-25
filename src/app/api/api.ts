import { LocationData, WeatherApiResponse } from "../weatherTypes";

export function GetForecastByCoords(param: string): Promise<WeatherApiResponse> {
  const res = fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/forecast.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${param}&days=10&aqi=yes`
  ).then((res) => res.json());

  return res;
}

export function SearchLocation(location: string): Promise<LocationData[]> {
  const res = fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/search.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${location}`
  ).then((res) => res.json());

  return res;
}
