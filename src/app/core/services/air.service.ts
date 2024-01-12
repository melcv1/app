import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError, of, throwError, OperatorFunction } from 'rxjs';
import { AirQualityResponse } from '../models/air.model';
@Injectable({
  providedIn: 'root'
})
export class AirService {

  private apiUrl: string = 'http://localhost:3000/weather/air';

  constructor(private http: HttpClient) {}

  getAirForPlace(place: string): Observable<AirQualityResponse> {

    const url = `${this.apiUrl}?city=${place}`;
    console.log(url)
    return this.http.get<AirQualityResponse>(url);
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
