import { City } from "../weatherTypes";

export function GetForecastByCoords(param: string) {
  const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/forecast.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${param}&days=10&aqi=yes`).then((res) => res.json());

  return res;
}

export function SearchLocation(location: string): Promise<City[]> {
  const res = fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/search.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${location}`
  ).then((res) => res.json());

  return res;
}
