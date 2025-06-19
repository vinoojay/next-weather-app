// max 2 weeks
export function GetForecast(locationId: number){

    const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/forecast.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=id:${locationId}&days=10&aqi=yes`).then((res) => res.json())
  

    return res;
}

export function SearchLocation(location: string){

    const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/search.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${location}`).then((res) => res.json())
  

    return res;
}