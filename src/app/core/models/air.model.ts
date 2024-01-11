export interface AirQualityResponse {
  lat: number;
  lon: number;
  dt: string;
  dtRaw: number;
  aqi: number;
  aqiName: string;
  components: AirQualityComponents;
}

export interface AirQualityComponents {
  co: number;   // Monóxido de carbono (CO) en µg/m^3
  no: number;   // Óxido nítrico (NO) en µg/m^3
  no2: number;  // Dióxido de nitrógeno (NO2) en µg/m^3
  o3: number;   // Ozono (O3) en µg/m^3
  so2: number;  // Dióxido de azufre (SO2) en µg/m^3
  pm2_5: number; // Partículas PM2.5 en µg/m^3
  pm10: number;  // Partículas PM10 en µg/m^3
  nh3: number;  // Amoníaco (NH3) en µg/m^3
}
