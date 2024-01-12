export interface ForecastResponse {
  lat: number;
  lon: number;
  dt: string;
  dtRaw: number;
  timezoneOffset: number;
  astronomical: AstronomicalDetails;
  weather: WeatherForecastDetails;
}

export interface AstronomicalDetails {
  sunrise: string;
  sunriseRaw: number;
  sunset: string;
  sunsetRaw: number;
}

export interface WeatherForecastDetails {
  temp: TemperatureDetails;
  feelsLike: TemperatureDetails;
  pressure: number;
  humidity: number;
  clouds: number;
  visibility: number;
  wind: WindDetails;
  pop: number;
  rain: number;
  snow: number;
  conditionId: number;
  main: string;
  description: string;
  icon: WeatherIcon;
}

export interface TemperatureDetails {
  cur: number;
}

export interface WindDetails {
  deg: number;
  gust: number;
  speed: number;
}

export interface WeatherIcon {
  url: string;
  raw: string;
}

export type ForecastApiResponse = ForecastResponse[];
