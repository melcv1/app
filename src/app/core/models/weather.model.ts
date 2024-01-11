export interface WeatherResponse {
  lat: number;
  lon: number;
  dt: string;
  dtRaw: number;
  timezoneOffset: number;
  astronomical: Astronomical;
  weather: WeatherDetails;
  name: string;
  local_names: LocalNames;
  country: string;
  state: string;
}


export interface Astronomical {
  sunrise: string;
  sunriseRaw: number;
  sunset: string;
  sunsetRaw: number;
}

export interface WeatherDetails {
  temp: TemperatureDetails;
  feelsLike: TemperatureDetails;
  pressure: number;
  humidity: number;
  clouds: number;
  visibility: number;
  wind: WindDetails;
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
  speed: number;
}

export interface WeatherIcon {
  url: string;
  raw: string;
}

export interface LocalNames {
  [key: string]: string;
}
