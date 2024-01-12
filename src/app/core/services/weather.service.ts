import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError, of, throwError, OperatorFunction } from 'rxjs';
import { WeatherResponse } from '../models/weather.model';
import { ForecastApiResponse } from '../models/forecast.model';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {


  private apiUrl: string = 'http://localhost:3000/weather';

  constructor(private http: HttpClient) {}

  getWeatherForPlace(place: string): Observable<WeatherResponse> {

    const url = `${this.apiUrl}/current/?city=${place}`;
    console.log(url)
    return this.http.get<WeatherResponse>(url);
  }
  getForecastDate(place: string): Observable<ForecastApiResponse> {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    const url = `${this.apiUrl}/forecast/date/?city=${place}&date=${formattedDate}`;
    console.log(url);
    return this.http.get<ForecastApiResponse>(url);
  }
  getNextForecast(place: string): Observable<ForecastApiResponse> {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    const url = `${this.apiUrl}/forecast/nextDays/?city=${place}&date=${formattedDate}`;
    console.log(url);
    return this.http.get<ForecastApiResponse>(url);
  }

  getForecastDateDay(place: string, day: string): Observable<ForecastApiResponse> {

    const url = `${this.apiUrl}/forecast/date/day/?city=${place}&date=${day}`;
    console.log(url);
    return this.http.get<ForecastApiResponse>(url);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(`${operation} failed: ${error.message}`);


      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
