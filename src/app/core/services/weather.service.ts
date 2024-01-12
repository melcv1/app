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

    const url = `${this.apiUrl}/current/?city=${place}`;  // Removed '/current' since it's already in apiUrl.
    console.log(url)
    return this.http.get<WeatherResponse>(url);
  }
  getForecastDate(place: string): Observable<ForecastApiResponse> {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // Formatea la fecha a 'aaaa-mm-dd'

    const url = `${this.apiUrl}/forecast/date/?city=${place}&date=${formattedDate}`;
    console.log(url);
    return this.http.get<ForecastApiResponse>(url); // Ajusta el tipo de retorno a ForecastApiResponse
  }
  getNextForecast(place: string): Observable<ForecastApiResponse> {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // Formatea la fecha a 'aaaa-mm-dd'

    const url = `${this.apiUrl}/forecast/nextDays/?city=${place}&date=${formattedDate}`;
    console.log(url);
    return this.http.get<ForecastApiResponse>(url); // Ajusta el tipo de retorno a ForecastApiResponse
  }

  getForecastDateDay(place: string, day: string): Observable<ForecastApiResponse> {

    const url = `${this.apiUrl}/forecast/date/day/?city=${place}&date=${day}`;
    console.log(url);
    return this.http.get<ForecastApiResponse>(url); // Ajusta el tipo de retorno a ForecastApiResponse
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);

      // Instead of returning a safe result, let's throw an error to be handled by the subscriber
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
