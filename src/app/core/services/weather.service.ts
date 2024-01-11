import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError, of, throwError, OperatorFunction } from 'rxjs';
import { WeatherResponse } from '../models/weather.model';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {


  private apiUrl: string = 'http://localhost:3000/weather/current';

  constructor(private http: HttpClient) {}

  getWeatherForPlace(place: string): Observable<WeatherResponse> {

    const url = `${this.apiUrl}?city=${place}`;  // Removed '/current' since it's already in apiUrl.
    console.log(url)
    return this.http.get<WeatherResponse>(url);
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
