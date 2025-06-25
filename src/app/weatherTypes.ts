export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

/**
 * Interface for the 'air_quality' object within various weather data.
 */
export interface AirQuality {
  co: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  "us-epa-index": number;
  "gb-defra-index": number;
}

/**
 * Interface for location data.
 */
export interface LocationData {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id?: string;
  localtime_epoch: number;
  localtime: string;
  id?: number;
}

/**
 * Interface for the current weather data.
 */
export interface CurrentWeather {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: 0 | 1;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
  air_quality: AirQuality;
}

/**
 * Interface for the 'day' object within the forecast, summarizing daily weather.
 */
export interface DayForecast {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: 0 | 1;
  daily_chance_of_rain: number;
  daily_will_it_snow: 0 | 1;
  daily_chance_of_snow: number;
  condition: WeatherCondition;
  uv: number;
  air_quality: AirQuality;
}

/**
 * Interface for the 'astro' object within the forecast, detailing astronomical data.
 */
export interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
  is_moon_up: 0 | 1;
  is_sun_up: 0 | 1;
}

/**
 * Interface for an individual 'hour' object within the daily forecast.
 */
export interface HourForecast {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: 0 | 1;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  snow_cm: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: 0 | 1;
  chance_of_rain: number;
  will_it_snow: 0 | 1;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
  air_quality: AirQuality;
}

/**
 * Interface for a single day's forecast data.
 * This structure typically represents one day in a multi-day forecast array.
 */
export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: DayForecast;
  astro: Astro;
  hour: HourForecast[]; // An array of HourForecast objects
}

/**
 * Interface for the top-level 'forecast' object, containing an array of daily forecasts.
 */
export interface Forecast {
  forecastday: ForecastDay[];
}

/**
 * Comprehensive interface for the entire weather API response,
 * combining location, current conditions, and forecast data.
 */
export interface WeatherApiResponse {
  location: LocationData;
  current: CurrentWeather;
  forecast: Forecast;
}
