export interface City {
    name?:string,
    region?: string,
    country?: string,
    id?: number,
    lat: number,
    lon: number
}

export interface CurrentLocationProps {
  currentLocation: City;
}

export interface HourlyData {
    hour: string;
    degree: number;
}

export interface CurrentWeatherData {
  location: {
    name: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    feelslike_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    air_quality: {
      "us-epa-index": number;
    };
    uv: number;
  };
  forecast: {
    forecastday: {
      astro: {
        sunrise: string;
        sunset: string;
      };
    }[];
  };
};


export interface DailyForecastData {
  date: string;
  date_epoch: number;
  day: {
    avgtemp_c: number;
    condition: {
      icon: string;
      text: string;
    };
    maxtemp_c: number;
    mintemp_c: number;
  };
};