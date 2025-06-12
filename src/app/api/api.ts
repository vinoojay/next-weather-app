export function GetCurrentWeather(location: string){

    const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/current.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${location}`).then((res) => res.json())

    return res;
}