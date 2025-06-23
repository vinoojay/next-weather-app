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


export interface WeeklyForecast {
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